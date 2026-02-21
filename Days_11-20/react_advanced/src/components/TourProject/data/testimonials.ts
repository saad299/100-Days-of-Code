interface Testimonial {
  id: number;
  name: string;
  image: string;
  text: string;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        name: "John Doe",
        image: "https://randomuser.me/api/portraits/thumb/men/75.jpg",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, optio.",
    },
    {
        id: 2,
        name: "Jane Smith",
        image: "https://randomuser.me/api/portraits/thumb/women/65.jpg",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, optio.",
    },
    {
        id: 3,
        name: "Michael Johnson",
        image: "https://randomuser.me/api/portraits/thumb/men/74.jpg",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, optio.",
    },
    {
        id: 4,
        name: "Emily Davis",
        image: "https://randomuser.me/api/portraits/thumb/women/45.jpg",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, optio.",
    },
    {
        id: 5,
        name: "David Wilson",
        image: "https://randomuser.me/api/portraits/thumb/men/55.jpg",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, optio.",
    }
]

export default testimonials;