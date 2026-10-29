export interface StayOption {
  id: string;
  centreId: string;
  roomId: string;
  packageId: string;
  durationDays: number;
  currency: "MYR";
  finalTotalPriceMYR?: number;
  status: "available" | "unavailable" | "request_quote";
}

export interface StayPricing {
  currency: "MYR";
  demoOnly: boolean;
  roomPrices: { roomId: string; durationDays: number; priceMYR: number }[];
  packagePrices: { packageId: string; durationDays: number; priceMYR: number }[];
  options: StayOption[];
}

export type SelectedStayPayload = Pick<StayOption, "centreId" | "roomId" | "packageId" | "durationDays" | "currency"> & {
  stayOptionId: string;
  finalTotalPriceMYR: number;
};

export function isPublishedPrice(value: number | undefined): value is number {
  return value !== undefined && Number.isSafeInteger(value) && value >= 0;
}

export function findStayOption(pricing: StayPricing | undefined, centreId: string, roomId: string, packageId: string, durationDays: number) {
  const matches = pricing?.options.filter((option) => option.centreId === centreId && option.roomId === roomId && option.packageId === packageId && option.durationDays === durationDays) ?? [];
  // Ambiguous data cannot be treated as a published offer.
  return matches.length === 1 ? matches[0] : undefined;
}

export function createSelectedStayPayload(option: StayOption | undefined): SelectedStayPayload | undefined {
  if (!option || option.status !== "available" || option.currency !== "MYR" || !isPublishedPrice(option.finalTotalPriceMYR)) return undefined;
  return { centreId: option.centreId, roomId: option.roomId, packageId: option.packageId, durationDays: option.durationDays, currency: option.currency, stayOptionId: option.id, finalTotalPriceMYR: option.finalTotalPriceMYR };
}

// Future cart adapter entry point. This demo deliberately has no persistence or network effects.
export function previewStayForCart(payload: SelectedStayPayload): { status: "demo_only"; selection: SelectedStayPayload } {
  return { status: "demo_only", selection: { ...payload } };
}
