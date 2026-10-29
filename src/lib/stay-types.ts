export interface StayImage {
  src: string;
  alt: string;
}

export interface StayCentre {
  id: string;
  slug: string;
  displayName: string;
  hero: { heading: string; description: string; image: StayImage };
  standardStayDays: number;
  availableStayDurations: number[];
}

export interface StayRoom {
  available?: boolean;
  id: string;
  centreId: string;
  name: string;
  subtitle: string;
  description: string;
  images: [StayImage, ...StayImage[]];
  amenities: string[];
  highlights: string[];
}

export interface StayPageData {
  centre: StayCentre;
  rooms: StayRoom[];
  packageContent?: import("./package-types").PackageContent;
  pricing?: import("./stay-pricing").StayPricing;
}
