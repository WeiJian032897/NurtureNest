export type ServiceCategory = "maternal" | "newborn" | "cuisine-wellness" | "comfort-family";
export interface StandardService {
  id: string;
  category: ServiceCategory;
  canonicalLabel: string;
  description?: string;
}
export interface CarePackage {
  id: string;
  centreId: string;
  name: string;
  comparisonLabel?: string;
  featuredInComparison?: boolean;
  subtitle: string;
  description: string;
  includedStandardServiceIds: string[];
  premiumEnhancementIds?: string[];
  inheritsFromPackageId?: string;
  highlights?: string[];
  available?: boolean;
}
export interface PackageService {
  packageId: string;
  serviceId: string;
  status: "included" | "not_included" | "conditional";
  details?: string;
}
export interface PackageContent {
  packages: CarePackage[];
  services: PackageService[];
  comparisonDescription?: string;
}
