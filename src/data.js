import img1 from './assets/1.jpeg';
import img2 from './assets/2.jpg';
import img3 from './assets/3.jpg';
import img4 from './assets/4.jpg';
import img5 from './assets/5.jpg';
import img6 from './assets/6.jpg';

export const flavors = [
  { 
    id: 1, name: 'Gulabi Ishq', img: img1, profile: 'Light / Sweet', color: '#D1497F',
    price: 349,
    desc: 'A soft and floral profile with a balanced sweetness.',
    ingredients: 'Rose extract, vodka base, citrus notes',
    scales: { sweet: 4, bitter: 1, spicy: 1 },
    occasions: 'Sundowner, Brunch', pairings: 'Light Salads, Macarons'
  },
  { 
    id: 2, name: 'Kaapi Kick', img: img2, profile: 'Coffee / Strong', color: '#704838',
    price: 349,
    desc: 'A coffee-infused cocktail suited for late evenings.',
    ingredients: 'Coffee extract, dark spirit base, mild sweetness',
    scales: { sweet: 2, bitter: 4, spicy: 1 },
    occasions: 'Late Night, After Dinner', pairings: 'Dark Chocolate, Tiramisu'
  },
  { 
    id: 3, name: 'Jamun Jhatka', img: img3, profile: 'Tangy / Experimental', color: '#683B71',
    price: 349,
    desc: 'A tangy and fruit-forward beverage with a distinctive taste.',
    ingredients: 'Jamun extract, spice elements, citrus',
    scales: { sweet: 3, bitter: 2, spicy: 3 },
    occasions: 'House Party, Casual Hangout', pairings: 'Spicy Peanuts, Chaat'
  },
  { 
    id: 4, name: 'Smokey Shole', img: img4, profile: 'Strong', color: '#B78D32',
    price: 349,
    desc: 'A deep and intense flavour with a lingering finish.',
    ingredients: 'Smokey whisky notes, bitters, spice',
    scales: { sweet: 1, bitter: 4, spicy: 3 },
    occasions: 'Late Night, Intimate Gatherings', pairings: 'Smoked Meats, Aged Cheese'
  },
  { 
    id: 5, name: 'Goa Garam', img: img5, profile: 'Tropical', color: '#347A4A',
    price: 349,
    desc: 'A tropical blend with a subtle kick.',
    ingredients: 'Coconut, rum base, citrus',
    scales: { sweet: 3, bitter: 1, spicy: 2 },
    occasions: 'Pool Party, Beach Day', pairings: 'Seafood, Grilled Pineapple'
  },
  { 
    id: 6, name: 'Chilli Cha Cha', img: img6, profile: 'Spicy / Bold', color: '#D4552A',
    price: 349,
    desc: 'A bold and spicy blend designed for stronger palates.',
    ingredients: 'Chilli infusion, lime, tequila base',
    scales: { sweet: 2, bitter: 1, spicy: 5 },
    occasions: 'Pre-game, High Energy Parties', pairings: 'Nachos, Truffle Fries'
  }
];
