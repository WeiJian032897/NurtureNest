import type { StayPricing } from "./stay-pricing";

export const jadeBloomPricing: StayPricing = {
  currency: "MYR",
  demoOnly: true,
  roomPrices: [
    { roomId: "standard-room", durationDays: 42, priceMYR: 7500 },
    { roomId: "deluxe-room", durationDays: 42, priceMYR: 11000 },
  ],
  packagePrices: [
    { packageId: "jb-essential", durationDays: 42, priceMYR: 13500 },
    { packageId: "jb-premium", durationDays: 42, priceMYR: 18500 },
  ],
  options: [
    { id: "jb-standard-essential-42", centreId: "jade-and-bloom", roomId: "standard-room", packageId: "jb-essential", durationDays: 42, currency: "MYR", finalTotalPriceMYR: 21000, status: "available" },
    { id: "jb-standard-premium-42", centreId: "jade-and-bloom", roomId: "standard-room", packageId: "jb-premium", durationDays: 42, currency: "MYR", finalTotalPriceMYR: 26000, status: "available" },
    { id: "jb-deluxe-essential-42", centreId: "jade-and-bloom", roomId: "deluxe-room", packageId: "jb-essential", durationDays: 42, currency: "MYR", finalTotalPriceMYR: 24500, status: "available" },
    { id: "jb-deluxe-premium-42", centreId: "jade-and-bloom", roomId: "deluxe-room", packageId: "jb-premium", durationDays: 42, currency: "MYR", finalTotalPriceMYR: 29500, status: "available" },
  ],
};
