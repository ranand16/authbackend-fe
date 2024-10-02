import { create } from "zustand";

const useStore = create((set) => ({
    jwt: "",
    setJwt: (jwt) => set((state) => ({ jwt })),
    userData: {},
    setUserData: (userData) => set((state) => ({ userData })),
    products: [],
    setProducts: (products) => set((state) => ({ products })),
}));

export { useStore };
