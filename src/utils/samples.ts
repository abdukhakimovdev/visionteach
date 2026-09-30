export interface SampleItem {
  id: string;
  name: {
    uz: string;
    ru: string;
    en: string;
  };
  category: {
    uz: string;
    ru: string;
    en: string;
  };
  imageUrl: string;
  mimeType: string;
}

export const SAMPLE_IMAGES: SampleItem[] = [
  {
    id: 'sample-plant',
    name: {
      uz: 'Monstera Deliciosa (Tropik o‘simlik)',
      ru: 'Монстера Деликатесная (Растение)',
      en: 'Monstera Deliciosa (Swiss Cheese Plant)',
    },
    category: {
      uz: 'Botanika va o‘simliklar',
      ru: 'Ботаника и растения',
      en: 'Botany & Houseplants',
    },
    imageUrl: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80',
    mimeType: 'image/jpeg',
  },
  {
    id: 'sample-camera',
    name: {
      uz: 'Vintage Leica M3 mexanik kamera',
      ru: 'Винтажная механическая камера Leica M3',
      en: 'Vintage Leica M3 Rangefinder Camera',
    },
    category: {
      uz: 'Optika va fotografiya',
      ru: 'Оптика и фототехника',
      en: 'Optics & Photography',
    },
    imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    mimeType: 'image/jpeg',
  },
  {
    id: 'sample-coffee',
    name: {
      uz: 'Chemex Artisan qahva damlagich',
      ru: 'Кофейник Chemex для альтернативного заваривания',
      en: 'Chemex Artisan Pour-Over Glass Brewer',
    },
    category: {
      uz: 'Oshxona va qahva madaniyati',
      ru: 'Посуда и кофейная культура',
      en: 'Coffee Gear & Kitchenware',
    },
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    mimeType: 'image/jpeg',
  },
  {
    id: 'sample-chip',
    name: {
      uz: 'Zamonaviy silikon mikroprotsessor (SoC)',
      ru: 'Кремниевый микропроцессор высокой плотности',
      en: 'High-Density Silicon Microprocessor (SoC)',
    },
    category: {
      uz: 'Elektronika va yarimo‘tkazgichlar',
      ru: 'Электроника и полупроводники',
      en: 'Electronics & Semiconductors',
    },
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    mimeType: 'image/jpeg',
  },
];
