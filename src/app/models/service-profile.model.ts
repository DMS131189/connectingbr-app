export interface ServiceProfile {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  description: string;
  location: string;
  hour: string;
  contact: string;
  photos: string[];
  mapUrl: string;
  services: Array<{
    name: string;
    category: string;
  }>;
}
