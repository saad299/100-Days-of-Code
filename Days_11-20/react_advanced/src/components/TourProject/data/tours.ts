interface Tour {
  id: number;
  title: string;
  name: string;
  info: string;
  destination: string;
  rating: number;
  price: string;
  maxGroupSize: number;
}

const tours: Tour[] = [
  {
    id: 1,
    title: "Best of Paris in 7 Days Tour",
    name: "Discover the beauty of Paris",
    info: "Visit Eiffel Tower, Louvre...",
    destination: "Paris, France",
    rating: 4.7,
    price: "1,990",
    maxGroupSize: 15,
  },
  {
    id: 2,
    title: "Best of Ireland in 14 Days Tour",
    name: "Explore Ireland",
    info: "Explore the Emerald Isle with visits to Dublin, Galway, and the Ring of Kerry.",
    destination: "Ireland",
    rating: 4.8,
    price: "3,800",
    maxGroupSize: 12,
  },
  {
    id: 3,
    title: "Best of Salzburg & Vienna in 8 Days Tour",
    name: "Experience the beautiful neighbor of Austria",
    info: "Experience the beauty of Austria with visits to Salzburg and Vienna.",
    destination: "Salzburg & Vienna, Austria",
    rating: 4.9,
    price: "2,600",
    maxGroupSize: 10,
  },
  {
    id: 4,
    title: "Best of Rome in 7 Days Tour",
    name: "Discover the aesthetics of Rome",
    info: "Discover the Eternal City with visits to the Colosseum, Vatican, and more.",
    destination: "Rome, Italy",
    rating: 4.6,
    price: "1,880",
    maxGroupSize: 12,
  },
  {
    id: 5,
    title: "Best of Poland in 10 Days Tour",
    name: "Explore the rich history and culture of Poland",
    info: "Explore the rich history and culture of Poland with visits to Warsaw, Krakow, and more.",
    destination: "Poland",  
    rating: 4.7,
    price: "2,500",
    maxGroupSize: 10,
  },
  {
    id: 6,
    title: "Best of Lisbon in 7 Days Tour",
    name: "Lisbon, Portugal",
    info: "Experience the vibrant culture and stunning architecture of Lisbon, Portugal.",
    destination: "Lisbon, Portugal",
    rating: 4.8,
    price: "2,400",
    maxGroupSize: 8,
  },
  {
    id: 7,
    title: "Best of Amsterdam in 7 Days Tour",
    name: "Discover the charm of Amsterdam",
    info: "Discover the charm of Amsterdam with visits to the Anne Frank House, Van Gogh Museum, and more.",
    destination: "Amsterdam, Netherlands",
    rating: 4.6,
    price: "2,200",
    maxGroupSize: 8,
  },
  {
    id: 8,
    title: "Best of Barcelona in 7 Days Tour",
    name: "Explore the vibrant culture and stunning architecture of Barcelona, Spain.",
    info: "Experience the vibrant culture and stunning architecture of Barcelona, Spain.",
    destination: "Barcelona, Spain",
    rating: 4.7,
    price: "2,300",
    maxGroupSize: 8,
  },
  {
    id: 9,
    name: "7 Days Bali Tour",
    title: "Explore Bali",
    info: "Discover the beauty of Bali with visits to Ubud, Seminyak, and more. Beaches, temples, rice terraces...",
    destination: "Bali, Indonesia",
    rating: 4.9,
    price: "2,500",
    maxGroupSize: 10,
  },
  {
    id: 10,
    name: "7 Days New York Tour",
    title: "Explore the city life of New York",
    info: "Get lost in the vibrant culture and stunning architecture of New York, USA.",
    destination: "New York, USA",
    rating: 4.8,
    price: "2,400",
    maxGroupSize: 8,
  }
];

export default tours;
