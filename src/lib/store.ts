import { useState, useEffect } from 'react';
import powder from "@/assets/product-coffee-powder.jpg";
import spices from "@/assets/product-spices.jpg";
import gift from "@/assets/product-giftbox.jpg";
import acc from "@/assets/product-accessories.jpg";

export type Product = {
  id: string; 
  name: string; 
  price: string; 
  stock: number;
  desc: string; 
  images: string[];
  category: string;
  isActive: boolean;
  discount?: string;
  weight?: string;
  minOrderQty?: number;
  gst?: string;
  cgst?: string;
  nutritionalFacts?: string;
};

export const INITIAL_PRODUCTS: Product[] = [
  { id: "p1", name: "Signature Estate Powder", price: "549", stock: 120, desc: "Slow-roasted Arabica from misty Coorg estates. Bold, smooth, unforgettable.", images: [powder], category: 'Coffee', isActive: true },
  { id: "p2", name: "Heritage Spice Trio", price: "799", stock: 85, desc: "Cardamom, pepper & cinnamon — handpicked from Western Ghats farms.", images: [spices], category: 'Spices', isActive: true },
  { id: "p3", name: "Luxe Gift Reserve Box", price: "1499", stock: 40, desc: "Curated tasting selection in a black & gold keepsake box.", images: [gift], category: 'Gifts', isActive: true },
  { id: "p4", name: "Copper Brew Kit", price: "2299", stock: 15, desc: "Hand-polished copper press & cup set for the perfect home ritual.", images: [acc], category: 'Accessories', isActive: true },
];

const STORAGE_KEY = 'coorg_store_products';
const CATEGORIES_KEY = 'coorg_store_categories';
const INITIAL_CATEGORIES = ['Coffee', 'Spices', 'Accessories', 'Gifts', 'Other'];

export function useStoreProducts() {
  const [products, setProductsState] = useState<Product[]>([]);
  const [categories, setCategoriesState] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load from local storage on mount
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Migration logic for older data schema
        const migrated = parsed.map((p: any) => ({
          ...p,
          images: p.images || (p.img ? [p.img] : []),
          category: p.category || 'Uncategorized',
          isActive: p.isActive !== undefined ? p.isActive : true,
          stock: p.stock !== undefined ? p.stock : 50,
          // Remove old fields if they exist to clean up
          img: undefined,
          rating: undefined
        }));
        setProductsState(migrated);
      } catch (e) {
        setProductsState(INITIAL_PRODUCTS);
      }
    } else {
      setProductsState(INITIAL_PRODUCTS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
    }

    const storedCats = localStorage.getItem(CATEGORIES_KEY);
    if (storedCats) {
      try {
        setCategoriesState(JSON.parse(storedCats));
      } catch (e) {
        setCategoriesState(INITIAL_CATEGORIES);
      }
    } else {
      setCategoriesState(INITIAL_CATEGORIES);
      localStorage.setItem(CATEGORIES_KEY, JSON.stringify(INITIAL_CATEGORIES));
    }

    setIsLoaded(true);
  }, []);

  const setProducts = (newProducts: Product[]) => {
    setProductsState(newProducts);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProducts));
  };

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = { ...product, id: `p${Date.now()}` };
    const updated = [...products, newProduct];
    setProducts(updated);
  };

  const updateProduct = (updatedProduct: Product) => {
    const updated = products.map(p => p.id === updatedProduct.id ? updatedProduct : p);
    setProducts(updated);
  };

  const deleteProduct = (id: string) => {
    const updated = products.filter(p => p.id !== id);
    setProducts(updated);
  };

  const addCategory = (category: string) => {
    if (!categories.includes(category)) {
      const newCats = [...categories, category];
      setCategoriesState(newCats);
      localStorage.setItem(CATEGORIES_KEY, JSON.stringify(newCats));
    }
  };

  return {
    products,
    categories,
    setProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    addCategory,
    isLoaded
  };
}
