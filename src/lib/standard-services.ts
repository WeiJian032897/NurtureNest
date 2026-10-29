import type { StandardService, ServiceCategory } from "./package-types";

export const serviceCategories: { id: ServiceCategory; label: string }[] = [
  { id: "maternal", label: "Maternal Care" },
  { id: "newborn", label: "Newborn Care" },
  { id: "cuisine-wellness", label: "Cuisine & Wellness" },
  { id: "comfort-family", label: "Comfort & Family" },
];

export const standardServices: StandardService[] = [
  { id: "maternal.daily-support", category: "maternal", canonicalLabel: "Daily maternal support" },
  { id: "maternal.breastfeeding", category: "maternal", canonicalLabel: "Breastfeeding guidance" },
  { id: "maternal.emotional-support", category: "maternal", canonicalLabel: "Emotional reassurance" },
  { id: "maternal.medical-referral", category: "maternal", canonicalLabel: "Medical referral when needed" },
  { id: "maternal.scheduled-consultation", category: "maternal", canonicalLabel: "Scheduled professional consultations" },
  { id: "maternal.additional-lactation", category: "maternal", canonicalLabel: "Additional one-to-one lactation support" },
  { id: "maternal.recovery-follow-up", category: "maternal", canonicalLabel: "Personalised recovery follow-up" },
  { id: "newborn.around-clock-care", category: "newborn", canonicalLabel: "24-hour newborn care" },
  { id: "newborn.feeding", category: "newborn", canonicalLabel: "Feeding assistance" },
  { id: "newborn.weekly-records", category: "newborn", canonicalLabel: "Weekly baby records" },
  { id: "newborn.nursery-access", category: "newborn", canonicalLabel: "Nursery access" },
  { id: "newborn.rooming-in", category: "newborn", canonicalLabel: "Rooming-in arrangement" },
  { id: "newborn.additional-guidance", category: "newborn", canonicalLabel: "Additional newborn-care guidance" },
  { id: "cuisine.four-meals", category: "cuisine-wellness", canonicalLabel: "Four meals daily" },
  { id: "cuisine.dietary-accommodations", category: "cuisine-wellness", canonicalLabel: "Dietary accommodations" },
  { id: "wellness.shared-facilities", category: "cuisine-wellness", canonicalLabel: "Shared wellness facilities" },
  { id: "wellness.personalised-sessions", category: "cuisine-wellness", canonicalLabel: "Personalised wellness sessions" },
  { id: "cuisine.additional-consultation", category: "cuisine-wellness", canonicalLabel: "Additional nutrition consultation" },
  { id: "comfort.private-room", category: "comfort-family", canonicalLabel: "Private room accommodation" },
  { id: "comfort.care-contact", category: "comfort-family", canonicalLabel: "In-room care communication" },
  { id: "comfort.security", category: "comfort-family", canonicalLabel: "Security and controlled access" },
  { id: "family.activities", category: "comfort-family", canonicalLabel: "Family activities" },
  { id: "family.private-preparation", category: "comfort-family", canonicalLabel: "Private family care preparation session" },
];
