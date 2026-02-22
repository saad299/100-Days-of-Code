// useTourStore.js
import { create } from "zustand";
import tours from "../data/tours";

const useTourStore = create((set, get) => ({
  search: "",
  filterSearch: "all",

  setSearch: (value) => set({ search: value }),
  setFilter: (value) => set({ filterSearch: value }),

  getFilteredTours: (countries = []) => {
    const { search, filterSearch } = get();

    if (!search) return tours;

    return tours.filter((tour) => {
      const destination = tour.destination.toLowerCase();
      const searchLower = search.toLowerCase();

      if (filterSearch === "country") {
        return destination.includes(searchLower);
      }

      if (filterSearch === "city") {
        return destination.includes(searchLower);
      }

      return destination.includes(searchLower);
    });
  },

  isValid: (countries = []) => {
    const { search } = get();
    if (!search) return true;
    return countries.some((c) =>
      c.name?.common?.toLowerCase()?.includes(search.toLowerCase()) ||
      c.name?.official?.toLowerCase()?.includes(search.toLowerCase()),
    );
  },
}));

export default useTourStore;
