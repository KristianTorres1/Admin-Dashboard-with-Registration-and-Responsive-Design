export interface Account {
  id: string;
  level: string;
  image: string;
  price: number;
  seller: string;
  heroes: string;
  trophies: string;
  description: string;
}
export const accounts: Account[] = [{
  id: '1',
  level: '14',
  image: "/1743052066016.jpg",
  price: 250,
  seller: 'ClashKing',
  heroes: 'BK 80, AQ 80, GW 55, RC 30',
  trophies: '5600',
  description: 'Maxed TH14 account with all heroes and troops maxed. Great for competitive play.'
}, {
  id: '2',
  level: '13',
  image: 'https://via.placeholder.com/400x300',
  price: 150,
  seller: 'GemMaster',
  heroes: 'BK 75, AQ 75, GW 50, RC 25',
  trophies: '5200',
  description: 'Almost maxed TH13 with strong heroes and good war record.'
}, {
  id: '3',
  level: '12',
  image: 'https://via.placeholder.com/400x300',
  price: 100,
  seller: 'WarChief',
  heroes: 'BK 65, AQ 65, GW 40',
  trophies: '4800',
  description: 'TH12 with max defenses and strong offensive capabilities.'
}];