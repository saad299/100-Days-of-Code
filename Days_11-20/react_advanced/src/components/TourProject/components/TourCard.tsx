import { useState, useEffect } from "react";
import useImages from "../hooks/useImages";

interface Tour {
  id: number;
  title: string;
  name: string;
  info: string;
  destination: string;
  city: string;
  country: string;
  rating: number;
  price: string;
  maxGroupSize: number;
}

interface TourCardProps {
  tour: Tour;
}

const TourCard = ({ tour }: TourCardProps) => {
  const { data: images = [], isLoading } = useImages(tour.city, 1, `tour-${tour.id}`);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (images.length > 0) {
      setImageUrl(images[0]);
    }
  }, [images]);

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden h-full flex flex-col">
      {/* Image Section */}
      <div className="relative h-48 bg-gray-200 overflow-hidden shrink-0">
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <span>Loading...</span>
          </div>
        ) : imageUrl ? (
          <img
            src={imageUrl}
            alt={tour.city}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>
        )}
        {/* Rating Badge */}
        <span className="absolute top-3 right-3 bg-chart-5 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
          ⭐ {tour.rating}
        </span>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col grow">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{tour.title}</h3>
        <p className="text-gray-600 font-medium text-sm mb-1">📍 {tour.destination}</p>
        <p className="text-gray-700 text-sm mb-4 line-clamp-2 grow">{tour.info}</p>

        {/* Footer */}
        <div className="flex justify-between items-center pt-4 border-t mt-auto">
          <div>
            <p className="text-2xl font-bold text-chart-5">${tour.price}</p>
          </div>
          <div className="text-right text-xs text-gray-500">
            <p>Max {tour.maxGroupSize}</p>
            <p>people</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
