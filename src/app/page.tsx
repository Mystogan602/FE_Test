"use client";
import { ProductList } from "@/app/components/ProductList";
import { useSelector } from "react-redux";
import { Heart } from "lucide-react";
import type { RootState } from "@/app/store/store";

export default function Home() {
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  return (
    <main className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Sản phẩm nổi bật</h1>
        <div className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-[#E31837]" />
          <span className="text-sm font-medium">
            {wishlistItems.length} sản phẩm
          </span>
        </div>
      </div>
      <ProductList />
    </main>
  );
}
