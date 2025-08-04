import { ServiceProfile } from '../models/service-profile.model';

export const MOCK_SERVICES: ServiceProfile[] = [
  // Health Services
  {
    id: '1',
    name: 'Dr. Ana Souza',
    specialty: 'Pediatrician',
    rating: 4.5,
    reviews: 52,
    description: 'Lorem ipsum dolor sit amet consee talero descarigakeli. Eulecagciolod: Lilitro conprict aime lakeen et iurpm true suelte vigenre, rainersone.',
    location: 'Ventoranom Dutin',
    hour: '3:00 PM - 3:70 PM',
    contact: '+55 11 99999-9999',
    photos: ['assets/images/helth.png', 'assets/images/beauty.png'],
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.457!2d-46.656574!3d-23.588068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8b1b1b1b1%3A0x1b1b1b1b1b1b1b1b!2sS%C3%A3o%20Paulo!5e0!3m2!1spt-BR!2sbr!4v1680000000000!5m2!1spt-BR!2sbr',
    services: [
      { name: 'Service A', category: 'Category 1' },
      { name: 'Service B', category: 'Category 2' }
    ]
  },
  {
    id: '2',
    name: 'Dr. Luis',
    specialty: 'Cardiologist',
    rating: 4.8,
    reviews: 40,
    description: 'Experienced cardiologist with 15 years in practice.',
    location: 'Av. Paulista, 1000',
    hour: '9:00 AM - 5:00 PM',
    contact: '+55 11 98888-8888',
    photos: ['assets/images/helth.png'],
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.457!2d-46.656574!3d-23.588068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8b1b1b1b1%3A0x1b1b1b1b1b1b1b1b!2sS%C3%A3o%20Paulo!5e0!3m2!1spt-BR!2sbr!4v1680000000000!5m2!1spt-BR!2sbr',
    services: [
      { name: 'Service X', category: 'Category 3' }
    ]
  },
  // Beauty Services
  {
    id: '5',
    name: 'Salon Maria',
    specialty: 'Hair Stylist',
    rating: 4.8,
    reviews: 50,
    description: 'Professional hair cutting and styling services with 10 years experience.',
    location: 'Rua Oscar Freire, 300',
    hour: '9:00 AM - 7:00 PM',
    contact: '+55 11 95555-5555',
    photos: ['assets/images/beauty.png'],
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.457!2d-46.656574!3d-23.588068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8b1b1b1b1%3A0x1b1b1b1b1b1b1b1b!2sS%C3%A3o%20Paulo!5e0!3m2!1spt-BR!2sbr!4v1680000000000!5m2!1spt-BR!2sbr',
    services: [
      { name: 'Hair Cut', category: 'Hair Styling' },
      { name: 'Hair Coloring', category: 'Hair Styling' }
    ]
  },
  // Other Services
  {
    id: '9',
    name: 'Clean Home',
    specialty: 'Cleaning Service',
    rating: 4.7,
    reviews: 40,
    description: 'Complete residential and commercial cleaning services.',
    location: 'Various locations',
    hour: '7:00 AM - 6:00 PM',
    contact: '+55 11 91111-1111',
    photos: ['assets/images/services.png'],
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.457!2d-46.656574!3d-23.588068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8b1b1b1b1%3A0x1b1b1b1b1b1b1b1b!2sS%C3%A3o%20Paulo!5e0!3m2!1spt-BR!2sbr!4v1680000000000!5m2!1spt-BR!2sbr',
    services: [
      { name: 'House Cleaning', category: 'Cleaning' },
      { name: 'Office Cleaning', category: 'Cleaning' }
    ]
  }
];
