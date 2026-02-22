import { useState, useEffect } from "react";
import useImages from "../hooks/useImages";

export default function Hero() {
  const { data, isLoading, error } = useImages();
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (data) setImages(data); // set fetched images
  }, [data]);

  if (isLoading) {
    return <div className="mt-20 text-center text-xl">Loading...</div>;
  }

  if (error) {
    return <div className="mt-20 text-center text-red-500">Failed to load images.</div>;
  }

  const handleNext = () => {
    setImages((prev) => [...prev.slice(1), prev[0]]);
  };

  const handlePrev = () => {
    setImages((prev) => [prev[prev.length - 1], ...prev.slice(0, -1)]);
  };

  return (
    <div className="relative w-full h-[800px] bg-gray-200 shadow-2xl -mt-2 mx-auto overflow-hidden">
      <div id="carousel" className="relative h-full">
        {images.map((src, i) => (
          <div
            key={i}
            className="item absolute top-1/2 -translate-y-1/2 w-50 h-75 rounded-2xl bg-cover bg-center shadow-xl transition-all duration-500"
            style={{ backgroundImage: `url(${src})` }}
          ></div>
        ))}
      </div>

      <div className="absolute bottom-5 w-full text-center">
        <button
          onClick={handlePrev}
          className="w-10 h-8 border rounded mr-2 hover:bg-gray-300"
        >
          ←
        </button>
        <button
          onClick={handleNext}
          className="w-10 h-8 border rounded hover:bg-gray-300"
        >
          →
        </button>
      </div>
    </div>
  );
}