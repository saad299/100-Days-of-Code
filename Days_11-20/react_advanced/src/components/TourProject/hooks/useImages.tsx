import { useQuery } from "@tanstack/react-query";
// import axios from "axios"

const UNSPLASH_ACCESS_KEY = "";

const fetchUnsplashImages = async (query = "city", count = 6, seed = "") => {
  const seedParam = seed ? `&seed=${seed}` : "";
  const res = await fetch(
    `https://api.unsplash.com/photos/random?count=${count}&query=${query}&client_id=${UNSPLASH_ACCESS_KEY}${seedParam}`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch Unsplash images");
  }

  const data = await res.json();
  return data.map((img) => img.urls.regular);
};

const useImages = (query = "city", count = 6, seed = "") => {
  return useQuery({
    queryKey: ["unsplash-images", query, count, seed],
    queryFn: () => fetchUnsplashImages(query, count, seed),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};

export default useImages;