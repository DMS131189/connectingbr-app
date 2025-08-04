export interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
  type: 'user' | 'provider';
  businessName?: string;
  businessDescription?: string;
  photos?: string;
  category?: {
    id: number;
    name: string;
  };
}
