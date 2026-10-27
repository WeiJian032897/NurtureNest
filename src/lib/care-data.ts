export type CareSectionContent = {
  id: string;
  eyebrow: string;
  title: string;
  image: string;
  alt: string;
  points: { title: string; text: string }[];
};

export const careSections: CareSectionContent[] = [
  {
    id: "maternal-care",
    eyebrow: "Maternal Care",
    title: "Rest comes first. Our support is shaped around helping you recover at your own pace.",
    image: "motherResting.png",
    alt: "A mother resting peacefully in a softly lit room",
    points: [
      { title: "Gentle daily support", text: "Attentive check-ins and a routine that protects your rest." },
      { title: "Breastfeeding guidance", text: "Patient, practical guidance on feeding, positioning and routines." },
      { title: "Emotional reassurance", text: "Someone to turn to with questions, without feeling rushed." },
      { title: "Medical referral when needed", text: "Health concerns are referred to qualified healthcare professionals." },
    ],
  },
  {
    id: "newborn-care",
    eyebrow: "Newborn Care",
    title: "Your baby is gently cared for in our dedicated newborn care zone, so you can rest well and visit whenever you wish.",
    image: "nurseCaring.png",
    alt: "A member of the newborn care team gently caring for a baby",
    points: [
      { title: "Dedicated newborn care zone", text: "A purpose-designed space where our shift team looks after your baby around the clock." },
      { title: "Visit anytime", text: "Mothers are welcome in the nursery at any time during the day. Simply let our team know so we can prepare the space." },
      { title: "Feeding, your way", text: "Breastfeed, or choose from our range of quality formulas to prepare yourself. At night, our team can feed your baby on your behalf or gently remind you when the baby needs a feed." },
      { title: "Family welcome", text: "Fathers and approved family members may visit, up to two additional guests with the mother. To protect hygiene and your baby’s development, only three families are admitted at a time. You may also view through the glass window or by video." },
      { title: "Baby records", text: "Feeding, weight and sleep are recorded weekly, and you’re welcome to review them on request." },
      { title: "Prefer baby by your side?", text: "Rooming-in is available. We’ll provide a cot and the facilities you need." },
    ],
  },
  {
    id: "nourishing-cuisine",
    eyebrow: "Nourishing Cuisine",
    title: "Meals that bring warmth and routine to every day of your stay.",
    image: "confinementMeal.png",
    alt: "A thoughtfully prepared selection of nourishing confinement meals",
    points: [
      { title: "Four meals daily", text: "Breakfast, lunch, afternoon tea and dinner." },
      { title: "Five-star trained chefs", text: "Experienced chefs with hospitality backgrounds, focused on flavour, variety and nutritional balance." },
      { title: "Traditional nourishment", text: "Selected traditional preparations, arranged according to individual needs and dietary suitability." },
      { title: "Halal-certified kitchen", text: "Halal-certified meals, with options for vegetarian preferences and common food allergies. Please share your needs with us before your stay." },
    ],
  },
  {
    id: "personalised-wellness",
    eyebrow: "Personalised Wellness",
    title: "No two recoveries are alike. We shape your stay around you.",
    image: "motherRelaxing.png",
    alt: "A mother enjoying a quiet moment of relaxation",
    points: [
      { title: "Tailored to each family", text: "Your preferences and routines are considered from day one." },
      { title: "Lakeside calm", text: "A landscaped lakeside park for gentle walks and fresh air." },
      { title: "Wellness facilities", text: "Gym, swimming pool and sauna, subject to individual suitability and medical advice." },
      { title: "Family & mother activities", text: "Resident club gatherings and social sessions, joined at your own pace." },
    ],
  },
  {
    id: "our-care-team",
    eyebrow: "Our Care Team",
    title: "Behind every calm day is a dedicated team, caring for Setapak families since 1988.",
    image: "nursesSmiling.png",
    alt: "Smiling members of the Jade & Bloom care team",
    points: [
      { title: "Postnatal caregivers", text: "18 trained caregivers with an average of 9 years of confinement care experience. All hold recognised postnatal care training certificates." },
      { title: "Newborn care team", text: "Shift-based staff in the newborn care zone, day and night. Our nursery team includes registered nurses and trained infant caregivers, with a care ratio of one caregiver to every three babies." },
      { title: "Lactation support", text: "Breastfeeding guidance from experienced staff." },
      { title: "Culinary team", text: "Chefs with five-star hospitality experience." },
    ],
  },
  {
    id: "safety-hygiene",
    eyebrow: "Safety & Hygiene",
    title: "Peace of mind is part of the care.",
    image: "washingHands.png",
    alt: "Careful handwashing as part of daily hygiene practices",
    points: [
      { title: "Controlled access", text: "Professional security personnel, access points and visitor verification." },
      { title: "Restricted areas", text: "Residential floors and the newborn care zone are for authorised individuals only." },
      { title: "Limited nursery capacity", text: "Only three families at a time in the nursery, to protect hygiene and your baby’s development." },
      { title: "Always within reach", text: "A dedicated handset in every room to contact our team at any time." },
      { title: "Emergency readiness", text: "Emergency medical services are contacted when required." },
      { title: "Hygiene standards", text: "The nursery is disinfected several times daily and deep-cleaned weekly. Visitors sanitise their hands and wear shoe covers before entering, and a simple health check is carried out at the entrance. Anyone unwell is kindly asked to visit by video instead." },
    ],
  },
];
