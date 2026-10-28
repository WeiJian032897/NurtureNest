"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, Pause, Play, Star, X } from "lucide-react";
import { useEffect, useId, useMemo, useRef, useState, useSyncExternalStore, type PointerEvent } from "react";
import "./img-sphere.css";

export interface ImageData {
  id: string;
  src: string;
  alt: string;
  title: string;
  description: string;
  name: string;
  centre: string;
  rating: number;
}

interface SphereImageGridProps {
  images: ImageData[];
  autoRotate?: boolean;
  /** Degrees per second, independent of screen refresh rate. */
  autoRotateSpeed?: number;
  className?: string;
}

const motionQuery = "(prefers-reduced-motion: reduce)";
function subscribeToMotion(onChange: () => void) {
  const media = window.matchMedia(motionQuery);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}
const motionSnapshot = () => window.matchMedia(motionQuery).matches;
const serverMotionSnapshot = () => true;

type Point = { x: number; y: number; z: number };
type Rotation = { x: number; y: number };
const initialRotation: Rotation = { x: 0.12, y: 0.3 };

// Fibonacci distribution and 3D projection adapted from the supplied sphere.
// Deterministic positions keep server rendering and hydration in agreement.
function spherePoints(count: number): Point[] {
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  return Array.from({ length: count }, (_, index) => {
    const y = 1 - ((index + 0.5) / count) * 2;
    const ringRadius = Math.sqrt(1 - y * y);
    return { x: Math.cos(index * goldenAngle) * ringRadius, y, z: Math.sin(index * goldenAngle) * ringRadius };
  });
}

function project(point: Point, rotation: Rotation) {
  const x = point.x * Math.cos(rotation.y) + point.z * Math.sin(rotation.y);
  const z1 = -point.x * Math.sin(rotation.y) + point.z * Math.cos(rotation.y);
  const y = point.y * Math.cos(rotation.x) - z1 * Math.sin(rotation.x);
  const z = point.y * Math.sin(rotation.x) + z1 * Math.cos(rotation.x);
  const perspective = 3.5 / (3.5 - z);
  // Match the browser's CSS precision during hydration as well as animation.
  const round = (value: number) => Number(value.toFixed(4));
  return {
    left: `${round(50 + x * 33 * perspective)}%`,
    top: `${round(50 + y * 33 * perspective)}%`,
    transform: `translate(-50%, -50%) scale(${round(0.7 + ((z + 1) / 2) * 0.4)})`,
    opacity: z < -0.15 ? 0.16 : round(Math.min(1, 0.55 + (z + 0.15) * 0.7)),
    zIndex: Math.round((z + 1) * 100),
    front: z >= -0.15,
  };
}

export default function SphereImageGrid({ images, autoRotate = true, autoRotateSpeed = 4, className = "" }: SphereImageGridProps) {
  const points = useMemo(() => spherePoints(images.length), [images.length]);
  const reducedMotion = useSyncExternalStore(subscribeToMotion, motionSnapshot, serverMotionSnapshot);
  const [paused, setPaused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const sphereRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const rotationRef = useRef({ ...initialRotation });
  const hoverRef = useRef(false);
  const focusRef = useRef(false);
  const visibleRef = useRef(false);
  const openerRef = useRef<HTMLElement | null>(null);
  const browseRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const backdropDownRef = useRef(false);
  const suppressClickRef = useRef(false);
  const dragRef = useRef<{ id: number; x: number; y: number; startX: number; startY: number; moved: boolean } | null>(null);
  const redrawRef = useRef<() => void>(() => {});
  const id = useId();
  const modalOpen = selectedIndex !== null;
  const selectedImage = selectedIndex === null ? null : images[selectedIndex];

  useEffect(() => {
    const draw = () => {
      points.forEach((point, index) => {
        const button = buttonsRef.current[index];
        if (!button) return;
        const { front, ...position } = project(point, rotationRef.current);
        Object.assign(button.style, position);
        button.style.pointerEvents = front ? "auto" : "none";
        button.tabIndex = front ? 0 : -1;
        button.setAttribute("aria-hidden", String(!front));
      });
    };
    redrawRef.current = draw;
    draw();
    const observer = new IntersectionObserver(([entry]) => { visibleRef.current = entry.isIntersecting; });
    if (sphereRef.current) observer.observe(sphereRef.current);
    return () => { observer.disconnect(); redrawRef.current = () => {}; };
  }, [points]);

  useEffect(() => {
    if (!autoRotate || paused || reducedMotion || modalOpen) return;
    let frame = 0;
    let previous = 0;
    const tick = (time: number) => {
      const elapsed = previous ? Math.min((time - previous) / 1000, 0.05) : 0;
      previous = time;
      if (visibleRef.current && !document.hidden && !hoverRef.current && !focusRef.current && !dragRef.current) {
        rotationRef.current.y = (rotationRef.current.y + (autoRotateSpeed * Math.PI / 180) * elapsed) % (Math.PI * 2);
        redrawRef.current();
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [autoRotate, autoRotateSpeed, paused, reducedMotion, modalOpen]);

  useEffect(() => {
    if (!modalOpen) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const fallbackOpener = browseRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      // Native modal dialogs contain focus; explicitly restore the entry point.
      const opener = openerRef.current?.isConnected ? openerRef.current : fallbackOpener;
      opener?.focus({ preventScroll: true });
    };
  }, [modalOpen]);

  function openStory(index: number, opener: HTMLElement) {
    openerRef.current = opener;
    setSelectedIndex(index);
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (!event.isPrimary || event.button !== 0) return;
    suppressClickRef.current = false;
    dragRef.current = { id: event.pointerId, x: event.clientX, y: event.clientY, startX: event.clientX, startY: event.clientY, moved: false };
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;
    if (!drag.moved && Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY) < 7) return;
    drag.moved = true;
    suppressClickRef.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    const width = event.currentTarget.getBoundingClientRect().width || 600;
    rotationRef.current.y += ((event.clientX - drag.x) / width) * 4;
    rotationRef.current.x -= ((event.clientY - drag.y) / width) * 4;
    drag.x = event.clientX;
    drag.y = event.clientY;
    redrawRef.current();
  }

  function endDrag(event: PointerEvent<HTMLDivElement>) {
    dragRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }

  function renderSpotlightModal() {
    if (!selectedImage) return null;
    return (
      <dialog
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${id}-title`}
        aria-describedby={`${id}-quote`}
        className="nn-sphere-dialog"
        onCancel={(event) => { event.preventDefault(); setSelectedIndex(null); }}
        onKeyDown={(event) => {
          if (event.key !== "Tab") return;
          const controls = event.currentTarget.querySelectorAll<HTMLButtonElement>("button:not([disabled])");
          const first = controls[0];
          const last = controls[controls.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }}
        onPointerDown={(event) => { backdropDownRef.current = event.target === event.currentTarget; }}
        onClick={(event) => { if (backdropDownRef.current && event.target === event.currentTarget) setSelectedIndex(null); }}
      >
        <div className="nn-sphere-card">
          <div className="nn-sphere-storyPhoto">
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              fill
              sizes="(max-width: 480px) calc(100vw - 80px), (max-width: 672px) calc(100vw - 120px), 400px"
              className="object-contain"
            />
          </div>
          <button ref={closeRef} type="button" className="nn-sphere-close" aria-label="Close" onClick={() => setSelectedIndex(null)}>
            <X size={20} aria-hidden="true" />
          </button>
          <div className="nn-sphere-cardBody">
            <div aria-live="polite" aria-atomic="true">
              <p className="nn-sphere-eyebrow">A FAMILY STORY</p>
              <div className="nn-sphere-rating" role="img" aria-label={`${selectedImage.rating} out of 5 stars`}>
                {Array.from({ length: 5 }, (_, index) => <Star key={index} size={16} fill={index < selectedImage.rating ? "currentColor" : "none"} aria-hidden="true" />)}
              </div>
              <h3 id={`${id}-title`} className="nn-sphere-title">{selectedImage.title}</h3>
              <blockquote id={`${id}-quote`} className="nn-sphere-quote">{selectedImage.description}</blockquote>
              <div className="nn-sphere-person">
                <div>
                  <p className="nn-sphere-name">{selectedImage.name}</p>
                  <p className="nn-sphere-centre">Stayed at {selectedImage.centre}</p>
                </div>
              </div>
            </div>
            <div className="nn-sphere-dialogFooter">
              <span className="nn-sphere-counter">{String((selectedIndex ?? 0) + 1).padStart(2, "0")} / {images.length} stories</span>
              <div className="nn-sphere-arrows">
                <button type="button" aria-label="Previous story" onClick={() => setSelectedIndex((index) => ((index ?? 0) - 1 + images.length) % images.length)}><ArrowLeft size={18} aria-hidden="true" /></button>
                <button type="button" aria-label="Next story" onClick={() => setSelectedIndex((index) => ((index ?? 0) + 1) % images.length)}><ArrowRight size={18} aria-hidden="true" /></button>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    );
  }

  if (!images.length) return null;

  return (
    <div className={`nn-sphere-root ${className}`}>
      <p id={`${id}-hint`} className="nn-sphere-hint">Every face, a different beginning. Select a portrait to read their story.</p>
      <div
        ref={sphereRef}
        className="nn-sphere-sphere"
        role="group"
        aria-label="Family testimonial photo sphere"
        aria-describedby={`${id}-hint`}
        onPointerEnter={(event) => { if (event.pointerType === "mouse" || event.pointerType === "pen") hoverRef.current = true; }}
        onPointerLeave={() => { hoverRef.current = false; if (!dragRef.current?.moved) dragRef.current = null; }}
        onFocusCapture={() => { focusRef.current = true; }}
        onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) focusRef.current = false; }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onLostPointerCapture={() => { dragRef.current = null; }}
      >
        {images.map((image, index) => {
          const { front, ...position } = project(points[index], initialRotation);
          return (
            <button
              key={image.id}
              ref={(element) => { buttonsRef.current[index] = element; }}
              type="button"
              className="nn-sphere-portrait"
              style={{ ...position, pointerEvents: front ? "auto" : "none" }}
              tabIndex={front ? 0 : -1}
              aria-hidden={!front}
              aria-label={`Read ${image.name}’s story at ${image.centre}`}
              aria-haspopup="dialog"
              onClick={(event) => {
                if (suppressClickRef.current && event.detail !== 0) { suppressClickRef.current = false; return; }
                openStory(index, event.currentTarget);
              }}
            >
              <span className="nn-sphere-portraitFrame">
                <Image src={image.src} alt={image.alt} fill sizes="(max-width: 640px) 15vw, 96px" draggable={false} className="nn-sphere-photo" />
              </span>
            </button>
          );
        })}
      </div>
      <div className="nn-sphere-controls">
        <button ref={browseRef} type="button" className="nn-sphere-browse" aria-haspopup="dialog" onClick={(event) => openStory(0, event.currentTarget)}>
          Browse all {images.length} stories <ArrowRight size={16} aria-hidden="true" />
        </button>
        {autoRotate && !reducedMotion && (
          <button type="button" className="nn-sphere-pause" aria-label={paused ? "Resume rotation" : "Pause rotation"} onClick={() => setPaused(!paused)}>
            {paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
            {paused ? "Resume rotation" : "Pause rotation"}
          </button>
        )}
      </div>
      {renderSpotlightModal()}
    </div>
  );
}
