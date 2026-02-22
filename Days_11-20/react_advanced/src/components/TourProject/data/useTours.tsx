// useTours.js
import { useQuery } from "@tanstack/react-query";

function useTours() {
  return useQuery({
    queryKey: ["tours"],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 700)); // simulate API delay
      const res = await fetch("/data/tours.ts");
      return res.json();
    },
  });
}

export default useTours