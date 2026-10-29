import type { StayPageData } from "@/lib/stay-types";
import { jadeBloomPackages } from "@/lib/jade-bloom-packages";
import { jadeBloomPricing } from "@/lib/jade-bloom-pricing";

const demoStays: StayPageData[] = [{
  pricing: jadeBloomPricing,
  packageContent: jadeBloomPackages,
  centre: {
    id: "jade-and-bloom",
    slug: "jade-and-bloom",
    displayName: "Jade & Bloom",
    standardStayDays: 42,
    availableStayDurations: [42],
    hero: {
      heading: "A Restful Stay, Thoughtfully Cared For.",
      description: "A peaceful space for recovery, with attentive care for you and your newborn. Discover our thoughtfully designed rooms and {standardStayDays}-day postnatal care packages, tailored to your family's needs.",
      image: { src: "/images/jb_room_pack_care/hero.jpg", alt: "A private room at Jade & Bloom, thoughtfully furnished for a restful stay" },
    },
  },
  rooms: [
    {
      id: "standard-room", centreId: "jade-and-bloom", name: "Standard Room",
      subtitle: "Comfort in Every Detail",
      description: "A welcoming private space thoughtfully arranged for restful days, everyday comfort and the little moments of caring for your newborn.",
      images: [{ src: "/images/jb_room_pack_care/standard_room.png", alt: "Standard Room at Jade & Bloom with a comfortable bed and private living space" }],
      highlights: ["Large double bed", "Nursing / feeding chair", "Private bathroom", "Dedicated care-team handset"],
      amenities: ["Large double bed with bedside lighting", "Nursing / feeding chair", "Private bathroom", "Wardrobe and storage for baby essentials", "Bedside care space", "Dedicated care-team handset"],
    },
    {
      id: "deluxe-room", centreId: "jade-and-bloom", name: "Deluxe Room",
      subtitle: "More Space for Moments Together",
      description: "Enjoy everything offered in our Standard Room, complemented by additional space for relaxation, family companionship and a more flexible daily routine.",
      images: [{ src: "/images/jb_room_pack_care/deluxe_room.png", alt: "Deluxe Room at Jade & Bloom with additional space for rest and family companionship" }],
      highlights: ["Double & single beds", "Separate relaxation lounge", "Expanded storage", "Seating for three companions"],
      amenities: ["Large double bed and large single bed", "Separate relaxation lounge", "Expanded storage and shelving", "Seating for up to three companions", "Enhanced natural light or layout where applicable", "Shared Standard Room amenities"],
    },
  ],
}];

// Local demo boundary: replace this lookup with a Firestore read when ready.
export function getStayPageData(slug: string): StayPageData | undefined {
  return demoStays.find(({ centre }) => centre.slug === slug);
}
