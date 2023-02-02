import { create } from "zustand";

type data = {
  search: string;
  setSerch(val: string): void;
};
const SearchQueryStore = create<data>((set) => ({
  search: "",
  setSerch(val) {
    set({ search: val });
  },
}));

export default SearchQueryStore;
