"use client";

import Image from "next/image";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "@/app/store/features/wishlist/wishlistSlice";
import type { RootState } from "@/app/store/store";
import type { Product } from "@/app/store/features/products/productsSlice";
import { FaTruckFast } from "react-icons/fa6";
import { FaGift } from "react-icons/fa6";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const isWishlisted = wishlistItems.includes(product.id);

  const formatSoldCount = (count: number) => {
    return count >= 1000 ? `${(count / 1000).toFixed(1)}k` : count;
  };

  return (
    <div className="group relative rounded-lg bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.title}
          width={300}
          height={300}
          priority
          className="object-cover w-full h-full transition-transform group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
        />

        {/* Discount Badge */}
        {product.badges.discount && (
          <div className="absolute left-0 top-0 bg-[#F04438] text-white px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm font-medium rounded-br-lg">
            -{product.badges.discount}%
          </div>
        )}

        {/* Feature Badges */}
        <div className="absolute bottom-0 left-0 flex flex-row rounded-tr-lg overflow-hidden">
          {product.badges.freeShipping && (
            <span className="bg-[#12B76A] text-white px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium flex items-center">
              <FaTruckFast className="mr-1 text-sm sm:text-base" /> FREE
            </span>
          )}
          {product.badges.gift && (
            <span className="bg-[#FFE2B8] text-[#CC7600] px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium flex items-center">
              <FaGift className="mr-1 text-sm sm:text-base" /> Quà tặng
            </span>
          )}
        </div>
      </div>

      {/* Wishlist Button */}
      <button
        onClick={() => dispatch(toggleWishlist(product.id))}
        className="absolute right-1.5 sm:right-2 top-1.5 sm:top-2 rounded-full bg-white p-1.5 sm:p-2 shadow-md"
        aria-label="Add to wishlist"
      >
        <Heart
          className={cn(
            "h-4 w-4 sm:h-5 sm:w-5",
            isWishlisted ? "fill-red-500 text-red-500" : "text-gray-500"
          )}
        />
      </button>

      {/* Product Info */}
      <div className="p-2 sm:p-3 space-y-1.5 sm:space-y-2">
        {/* Flash Sale Timer */}
        {product.badges.flashSale && (
          <div className="bg-[#FFF1F3] text-[#E31837] rounded-lg px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium text-center flex items-center justify-center gap-1">
            <Image
              src="/flash-sale.svg"
              alt="Flash Sale"
              width={48}
              height={16}
              className="w-auto h-3 sm:h-4"
            />{" "}
            • 20:20 • 12/12
          </div>
        )}

        {/* Product Title */}
        <h3 className="line-clamp-2 text-xs sm:text-sm font-medium text-[#393e40]">
          {product.title}
        </h3>

        {/* Price */}
        <div className="flex items-baseline gap-1">
          <span className="text-[#f79009] text-base sm:text-lg font-bold">
            ₫{product.price.toLocaleString()}
          </span>
        </div>

        {/* Sold Count */}
        {product.totalSold && (
          <div className="text-[10px] sm:text-xs text-[#5c6366]">
            {formatSoldCount(product.totalSold)} Đã bán
          </div>
        )}
      </div>
    </div>
  );
}
