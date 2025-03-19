"use client";
import { ProductList } from "@/app/components/ProductList";
import { useSelector } from "react-redux";
import { Heart } from "lucide-react";
import type { RootState } from "@/app/store/store";

export default function Home() {
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  return (
    <main className="container px-4 sm:px-6 py-4 sm:py-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0 mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold">Sản phẩm nổi bật</h1>
        <div className="flex items-center gap-2">
          <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-[#E31837]" />
          <span className="text-xs sm:text-sm font-medium">
            {wishlistItems.length} sản phẩm
          </span>
        </div>
      </div>
      <ProductList />
    </main>
  );
}
