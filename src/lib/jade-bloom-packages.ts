import type { PackageContent } from "./package-types";

const enhancements = ["maternal.scheduled-consultation", "maternal.additional-lactation", "maternal.recovery-follow-up", "newborn.rooming-in", "newborn.additional-guidance", "wellness.personalised-sessions", "cuisine.additional-consultation", "family.private-preparation"];

export const jadeBloomPackages: PackageContent = {
  comparisonDescription: "Both packages provide a complete {standardStayDays}-day postnatal stay. Premium Care offers additional personalised services for families seeking enhanced support.",
  packages: [
    {
      id: "jb-essential", centreId: "jade-and-bloom", name: "Essential Care", comparisonLabel: "Essential",
      subtitle: "A Caring Foundation for Recovery",
      description: "Everything you need for a supported {standardStayDays}-day postnatal stay, from attentive maternal care and newborn support to nourishing meals and everyday comfort.",
      includedStandardServiceIds: ["maternal.daily-support", "maternal.breastfeeding", "maternal.emotional-support", "maternal.medical-referral", "newborn.around-clock-care", "newborn.feeding", "newborn.weekly-records", "newborn.nursery-access", "cuisine.four-meals", "cuisine.dietary-accommodations", "comfort.private-room", "comfort.care-contact", "comfort.security", "family.activities"],
      highlights: ["Daily maternal support & breastfeeding guidance", "24-hour shift-based newborn care", "Four nourishing meals daily", "Private accommodation & in-room care contact"],
    },
    {
      id: "jb-premium", centreId: "jade-and-bloom", name: "Premium Care", comparisonLabel: "Premium",
      featuredInComparison: true,
      subtitle: "More Personalised Care, More Peace of Mind",
      description: "Enjoy every Essential Care benefit, complemented by enhanced professional guidance, personalised wellness and additional support for your family's journey.",
      inheritsFromPackageId: "jb-essential",
      includedStandardServiceIds: enhancements,
      premiumEnhancementIds: enhancements,
      highlights: ["Every Essential Care benefit", "Additional professional & lactation guidance", "Optional rooming-in with a cot", "Personalised wellness, subject to medical suitability"],
    },
  ],
  services: [
    ...enhancements.map((serviceId) => ({ packageId: "jb-essential", serviceId, status: "not_included" as const })),
    { packageId: "jb-essential", serviceId: "wellness.shared-facilities", status: "included", details: "Access to shared wellness facilities is included in both packages. Use of individual facilities is subject to medical suitability and availability." },
    { packageId: "jb-essential", serviceId: "newborn.around-clock-care", status: "included", details: "Care is provided by a team working in shifts, day and night." },
    { packageId: "jb-essential", serviceId: "newborn.nursery-access", status: "included", details: "Daytime visits are available; nursery capacity and hygiene requirements apply." },
    { packageId: "jb-essential", serviceId: "cuisine.dietary-accommodations", status: "included", details: "Share dietary preferences and allergies before your stay so arrangements can be discussed." },
    { packageId: "jb-premium", serviceId: "maternal.scheduled-consultation", status: "included", details: "Scheduled consultations with qualified healthcare professionals through appropriate partners; additional to necessary medical referrals." },
    { packageId: "jb-premium", serviceId: "newborn.rooming-in", status: "included", details: "Optional rooming-in on request, with a cot and the facilities you need." },
    { packageId: "jb-premium", serviceId: "wellness.personalised-sessions", status: "included", details: "Sessions are personalised according to individual recovery needs and medical suitability." },
  ],
};
