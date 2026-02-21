import { useQuery } from "@tanstack/react-query";
// import axios from "axios";

const UNSPLASH_ACCESS_KEY = "";

const fetchUnsplashImages = async (query = "city", count = 6) => {
  const res = await fetch(
    `https://api.unsplash.com/photos/random?count=${count}&query=${query}&client_id=${UNSPLASH_ACCESS_KEY}`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch Unsplash images");
  }

  const data = await res.json();
  return data.map((img) => img.urls.regular);
};

export const useImages = (query = "city", count = 6) => {
  return useQuery({
    queryKey: ["unsplash-images", query, count],
    queryFn: () => fetchUnsplashImages(query, count),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};

export default useImages;