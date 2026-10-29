"use client";

import { useId, useState } from "react";
import { Section } from "@/components/section";
import type { StayPageData } from "@/lib/stay-types";
import { createSelectedStayPayload, findStayOption, isPublishedPrice, previewStayForCart } from "@/lib/stay-pricing";

const money = (value: number | undefined) => isPublishedPrice(value) ? `RM ${value.toLocaleString("en-MY")}` : "Request quote";
const focus = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6f866b]";

export function StayConfigurator({ centre, rooms, packageContent, pricing }: StayPageData) {
  const groupId = useId();
  const availableRooms = rooms.filter((room) => room.centreId === centre.id && room.available !== false);
  const packages = (packageContent?.packages ?? []).filter((item) => item.centreId === centre.id && item.available !== false);
  const durations = centre.availableStayDurations.filter((days) => Number.isSafeInteger(days) && days > 0);
  const initialDays = durations.includes(centre.standardStayDays) ? centre.standardStayDays : durations[0] ?? 0;
  const blocked = (roomId: string, packageId: string, days: number) => pricing?.options.some((option) => option.centreId === centre.id && option.roomId === roomId && option.packageId === packageId && option.durationDays === days && option.status === "unavailable") ?? false;
  const firstRoom = availableRooms.find((room) => packages.some((item) => !blocked(room.id, item.id, initialDays)));
  const [selection, setSelection] = useState({ roomId: firstRoom?.id ?? "", packageId: packages.find((item) => firstRoom && !blocked(firstRoom.id, item.id, initialDays))?.id ?? "", days: initialDays });
  const [message, setMessage] = useState("");
  const room = availableRooms.find((item) => item.id === selection.roomId);
  const care = packages.find((item) => item.id === selection.packageId);
  const option = findStayOption(pricing, centre.id, selection.roomId, selection.packageId, selection.days);
  const valid = Boolean(room && care && durations.includes(selection.days) && !blocked(selection.roomId, selection.packageId, selection.days));
  const payload = valid ? createSelectedStayPayload(option) : undefined;
  const roomPrice = pricing?.roomPrices.find((item) => item.roomId === selection.roomId && item.durationDays === selection.days)?.priceMYR;
  const packagePrice = pricing?.packagePrices.find((item) => item.packageId === selection.packageId && item.durationDays === selection.days)?.priceMYR;
  const totalLabel = payload ? money(payload.finalTotalPriceMYR) : valid ? "Request quote" : "Unavailable";
  const adjustment = payload && isPublishedPrice(roomPrice) && isPublishedPrice(packagePrice) ? payload.finalTotalPriceMYR - roomPrice - packagePrice : 0;

  function chooseRoom(roomId: string, days = selection.days) {
    const nextPackage = packages.find((item) => item.id === selection.packageId && !blocked(roomId, item.id, days)) ?? packages.find((item) => !blocked(roomId, item.id, days));
    setSelection({ roomId, packageId: nextPackage?.id ?? "", days });
    setMessage("");
  }

  return <Section id="build-your-stay" tone="sage">
    <h2 className="font-serif text-4xl text-[#2f4431] sm:text-5xl">Build Your Stay</h2>
    <p className="mt-5 text-lg leading-8 text-[#6e6658]">Choose the room and care experience that feels right for you.</p>
    <div className="mt-10 grid items-start gap-10 lg:grid-cols-[1.2fr_1fr]">
      <div className="space-y-8">
        <fieldset><legend className="mb-4 text-sm font-semibold text-[#2f4431]">01 · Choose your room</legend>
          <div className="grid gap-3 sm:grid-cols-2">{availableRooms.map((item) => <Choice key={item.id} name={`${groupId}-room`} title={item.name} subtitle={item.subtitle} price={money(pricing?.roomPrices.find((rate) => rate.roomId === item.id && rate.durationDays === selection.days)?.priceMYR)} selected={item.id === selection.roomId} disabled={!durations.length || !packages.some((carePackage) => !blocked(item.id, carePackage.id, selection.days))} onChange={() => chooseRoom(item.id)} />)}</div>
          {!availableRooms.length && <p className="text-sm text-[#6e6658]">No rooms are currently available.</p>}
        </fieldset>
        <fieldset><legend className="mb-4 text-sm font-semibold text-[#2f4431]">02 · Choose your care package</legend>
          <div className="grid gap-3 sm:grid-cols-2">{packages.map((item) => <Choice key={item.id} name={`${groupId}-package`} title={item.name} subtitle={item.subtitle} price={money(pricing?.packagePrices.find((rate) => rate.packageId === item.id && rate.durationDays === selection.days)?.priceMYR)} selected={item.id === selection.packageId} disabled={!room || !durations.length || blocked(selection.roomId, item.id, selection.days)} onChange={() => { setSelection({ ...selection, packageId: item.id }); setMessage(""); }} />)}</div>
          {!packages.length && <p className="text-sm text-[#6e6658]">No care packages are currently available.</p>}
        </fieldset>
        {durations.length > 1 ? <label className="block text-sm font-semibold text-[#2f4431]">Stay duration
          <select value={selection.days} onChange={(event) => { const days = Number(event.target.value); const nextRoom = availableRooms.find((item) => item.id === selection.roomId && packages.some((p) => !blocked(item.id, p.id, days))) ?? availableRooms.find((item) => packages.some((p) => !blocked(item.id, p.id, days))); chooseRoom(nextRoom?.id ?? "", days); }} className={`mt-3 block min-h-12 rounded-lg border border-[#c9d4c1] bg-white px-4 ${focus}`}>
            {durations.map((days) => <option key={days} value={days}>{days} days</option>)}
          </select>
        </label> : <p className="text-sm text-[#60745c]">{durations.length ? `${selection.days}-day stay · All prices cover the full duration.` : "Stay duration is not available yet."}</p>}
      </div>
      <div className="self-start rounded-xl border border-[#d8cfbd] bg-[#fffdf8] p-6 shadow-sm sm:p-8 lg:sticky lg:top-44 lg:max-h-[calc(100dvh-12rem)] lg:overflow-y-auto xl:top-28 xl:max-h-[calc(100dvh-8rem)]">
        <div aria-live="polite" aria-atomic="true">
          <h3 className="font-serif text-3xl text-[#2f4431]">Stay Summary</h3>
          <dl className="mt-5 space-y-2 text-sm leading-6 text-[#6e6658]">
            <SummaryLine label="Centre" value={centre.displayName} />
            <SummaryLine label="Room" value={room?.name ?? "Select a room"} />
            <SummaryLine label="Care package" value={care?.name ?? "Select a package"} />
            <SummaryLine label="Duration" value={selection.days ? `${selection.days} days` : "Not available"} />
          </dl>
          <dl className="mt-5 space-y-2 border-t border-[#e8ddca] pt-4 text-sm text-[#6e6658]">
            <SummaryLine label="Accommodation" value={room ? money(roomPrice) : "—"} />
            <SummaryLine label="Care package price" value={care ? money(packagePrice) : "—"} />
            {adjustment !== 0 && <SummaryLine label="Configured stay adjustment" value={`${adjustment < 0 ? "−" : "+"}${money(Math.abs(adjustment))}`} />}
          </dl>
          <div className="mt-5 flex flex-wrap items-baseline justify-between gap-3 border-t border-[#e8ddca] pt-4 text-[#2f4431]">
            <span className="text-sm font-semibold">Final total · MYR</span><strong className="font-serif text-3xl tabular-nums">{totalLabel}</strong>
          </div>
        </div>
        <section aria-label="Add configured stay to cart" className="mt-5">
          <button type="button" disabled={!payload} onClick={() => { if (payload) { const result = previewStayForCart(payload); if (result.status === "demo_only") setMessage("Demo selection prepared. Cart integration is not connected; nothing has been added to a cart."); } }} className={`min-h-12 w-full rounded-full bg-[#2f4431] px-6 py-3 text-sm font-semibold text-white motion-safe:transition-colors motion-safe:duration-200 hover:bg-[#40583f] disabled:cursor-not-allowed disabled:opacity-45 ${focus}`}>Add to Cart — Demo Only</button>
          {selection.days > 0 && <p className="mt-3 text-xs leading-6 text-[#6e6658]">Prices shown cover the full {selection.days}-day stay. Final availability is subject to confirmation.</p>}
          <p role="status" className="mt-3 text-sm leading-6 text-[#40583f] empty:m-0">{message || (!payload ? "Please contact the centre to confirm availability and request a published price." : "")}</p>
        </section>
      </div>
    </div>
  </Section>;
}

function SummaryLine({ label, value }: { label: string; value: string }) {
  return <div className="flex justify-between gap-5"><dt>{label}</dt><dd className="text-right font-medium text-[#2f4431] tabular-nums">{value}</dd></div>;
}

function Choice({ name, title, subtitle, price, selected, disabled, onChange }: { name: string; title: string; subtitle: string; price: string; selected: boolean; disabled: boolean; onChange: () => void }) {
  return <label className={`relative flex min-h-40 cursor-pointer gap-3 rounded-lg border p-5 motion-safe:transition-colors motion-safe:duration-200 motion-safe:ease-out ${disabled ? "cursor-not-allowed border-[#d8cfbd] opacity-50" : selected ? "border-[#8fa88b] bg-[#eaf0e4]" : "border-[#d8cfbd] bg-[#fffdf8] hover:border-[#8fa88b]"} has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-4 has-[:focus-visible]:outline-[#40583f]`}>
    <input type="radio" name={name} checked={selected} disabled={disabled} onChange={onChange} className="mt-1 size-4 shrink-0 accent-[#2f4431] focus-visible:outline-none" />
    <span className="flex flex-col"><span className="font-serif text-xl text-[#2f4431]">{title}</span><span className="mt-2 text-xs leading-5 text-[#6e6658]">{subtitle}</span><span className="mt-auto pt-4 text-sm font-semibold text-[#40583f] tabular-nums">{disabled ? "Unavailable" : price}</span></span>
  </label>;
}
