// @vitest-environment jsdom
import { createElement } from "react";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import SphereImageGrid from "./img-sphere";
import { familyTestimonials } from "@/lib/family-testimonials";

vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => createElement("img", { src, alt }),
}));

let reduced = false;
let motionListeners: Set<() => void>;
let frames: Map<number, FrameRequestCallback>;
let nextFrame: number;

function advanceFrame(time: number) {
  act(() => {
    const pending = [...frames.values()];
    frames.clear();
    pending.forEach((callback) => callback(time));
  });
}

beforeEach(() => {
  reduced = false;
  motionListeners = new Set();
  frames = new Map();
  nextFrame = 0;
  vi.stubGlobal("matchMedia", () => ({
    get matches() { return reduced; },
    addEventListener: (_: string, listener: () => void) => motionListeners.add(listener),
    removeEventListener: (_: string, listener: () => void) => motionListeners.delete(listener),
  }));
  vi.stubGlobal("IntersectionObserver", class {
    constructor(private callback: (entries: { isIntersecting: boolean }[]) => void) {}
    observe() { this.callback([{ isIntersecting: true }]); }
    disconnect() {}
  });
  vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => { frames.set(++nextFrame, callback); return nextFrame; });
  vi.stubGlobal("cancelAnimationFrame", (id: number) => { frames.delete(id); });
  // jsdom does not implement the native dialog API; browser QA covers its focus trap.
  Object.defineProperty(HTMLDialogElement.prototype, "showModal", { configurable: true, value: function (this: HTMLDialogElement) { this.open = true; } });
  Object.defineProperty(HTMLDialogElement.prototype, "close", { configurable: true, value: function (this: HTMLDialogElement) { this.open = false; } });
});

afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals(); });

describe("family story sphere", () => {
  it("renders all 25 supplied photos with alt text and the selected family's full review", () => {
    const { container } = render(<SphereImageGrid images={familyTestimonials} />);
    expect(container.querySelectorAll("img")).toHaveLength(25);
    expect([...container.querySelectorAll("img")].every((image) => image.alt.length > 0)).toBe(true);
    const portrait = screen.getAllByRole("button", { name: /^Read / })[0];
    const name = portrait.getAttribute("aria-label")!;
    const review = familyTestimonials.find((item) => name.includes(item.name))!;
    fireEvent.click(portrait);
    expect(screen.getByRole("dialog").getAttribute("aria-modal")).toBe("true");
    expect(screen.getByRole("heading", { name: review.title })).toBeTruthy();
    expect(screen.getByText(review.description)).toBeTruthy();
    expect(screen.getByText(review.name)).toBeTruthy();
    expect(screen.getByText(`Stayed at ${review.centre}`)).toBeTruthy();
    expect(screen.getByRole("img", { name: `${review.rating} out of 5 stars` })).toBeTruthy();
    expect(document.activeElement).toBe(screen.getByRole("button", { name: "Close" }));
  });

  it("allows reading all stories, including rear portraits, without rotating the sphere", () => {
    render(<SphereImageGrid images={familyTestimonials} />);
    fireEvent.click(screen.getByRole("button", { name: "Browse all 25 stories" }));
    for (const review of familyTestimonials) {
      expect(screen.getByRole("heading", { name: review.title })).toBeTruthy();
      fireEvent.click(screen.getByRole("button", { name: "Next story" }));
    }
    expect(screen.getByRole("heading", { name: familyTestimonials[0].title })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Previous story" }));
    expect(screen.getByRole("heading", { name: familyTestimonials[24].title })).toBeTruthy();
  });

  it.each(["button", "escape", "backdrop"])("closes via %s and restores focus and scrolling", (method) => {
    document.body.style.overflow = "auto";
    render(<SphereImageGrid images={familyTestimonials} />);
    const opener = screen.getByRole("button", { name: "Browse all 25 stories" });
    opener.focus();
    fireEvent.click(opener);
    expect(document.body.style.overflow).toBe("hidden");
    const dialog = screen.getByRole("dialog");
    fireEvent.click(screen.getByRole("heading", { name: familyTestimonials[0].title }));
    expect(screen.getByRole("dialog")).toBeTruthy();
    if (method === "button") fireEvent.click(screen.getByRole("button", { name: "Close" }));
    if (method === "escape") fireEvent(dialog, new Event("cancel", { cancelable: true }));
    if (method === "backdrop") { fireEvent.pointerDown(dialog); fireEvent.click(dialog); }
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(document.activeElement).toBe(opener);
    expect(document.body.style.overflow).toBe("auto");
  });

  it("rotates slowly, pauses on focus and manual pause, and stops while a story is open", () => {
    render(<SphereImageGrid images={familyTestimonials} />);
    const portrait = screen.getAllByRole("button", { name: /^Read / })[0];
    const original = portrait.style.left;
    advanceFrame(100);
    advanceFrame(150);
    expect(portrait.style.left).not.toBe(original);
    fireEvent.focusIn(portrait);
    const focused = portrait.style.left;
    advanceFrame(200);
    expect(portrait.style.left).toBe(focused);
    fireEvent.focusOut(portrait);
    fireEvent.click(screen.getByRole("button", { name: "Pause rotation" }));
    expect(frames.size).toBe(0);
    fireEvent.click(screen.getByRole("button", { name: "Resume rotation" }));
    expect(frames.size).toBe(1);
    fireEvent.click(screen.getByRole("button", { name: "Browse all 25 stories" }));
    expect(frames.size).toBe(0);
  });

  it("respects reduced motion on load and when the preference changes live", () => {
    reduced = true;
    render(<SphereImageGrid images={familyTestimonials} />);
    expect(frames.size).toBe(0);
    expect(screen.queryByRole("button", { name: "Resume rotation" })).toBeNull();
    act(() => { reduced = false; motionListeners.forEach((listener) => listener()); });
    expect(frames.size).toBe(1);
    act(() => { reduced = true; motionListeners.forEach((listener) => listener()); });
    expect(frames.size).toBe(0);
    fireEvent.click(screen.getByRole("button", { name: "Browse all 25 stories" }));
    expect(screen.getByRole("dialog")).toBeTruthy();
  });

  it("keeps Tab and Shift+Tab inside the dialog", () => {
    render(<SphereImageGrid images={familyTestimonials} />);
    fireEvent.click(screen.getByRole("button", { name: "Browse all 25 stories" }));
    const close = screen.getByRole("button", { name: "Close" });
    const next = screen.getByRole("button", { name: "Next story" });
    fireEvent.keyDown(close, { key: "Tab", shiftKey: true });
    expect(document.activeElement).toBe(next);
    fireEvent.keyDown(next, { key: "Tab" });
    expect(document.activeElement).toBe(close);
  });

  it("pauses on mouse hover and resumes after the pointer leaves", () => {
    render(<SphereImageGrid images={familyTestimonials} />);
    const sphere = screen.getByRole("group", { name: "Family testimonial photo sphere" });
    const portrait = screen.getAllByRole("button", { name: /^Read / })[0];
    advanceFrame(100);
    const original = portrait.style.left;
    const enter = new Event("pointerover", { bubbles: true });
    Object.defineProperty(enter, "pointerType", { value: "mouse" });
    fireEvent(sphere, enter);
    advanceFrame(150);
    expect(portrait.style.left).toBe(original);
    fireEvent.pointerOut(sphere);
    advanceFrame(200);
    expect(portrait.style.left).not.toBe(original);
  });
});
