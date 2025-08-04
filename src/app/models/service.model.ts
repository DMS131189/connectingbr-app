export interface Service {
  id: string;
  professionalId: any;
  name: string;
  category: {
    id: number;
    name: string;
    description?: string;
    icon?: string;
    isActive: boolean;
    order: number;
  };
  categoryId: number;
  description: string;
  price: string;
  rating: number;
  provider: string;
}
