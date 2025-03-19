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
          sizes="(max-width: 768px) 50vw, 25vw"
        />

        {/* Discount Badge */}
        {product.badges.discount && (
          <div className="absolute left-0 top-0 bg-[#F04438] text-white px-3 py-1 font-medium rounded-br-lg">
            -{product.badges.discount}%
          </div>
        )}

        {/* Feature Badges */}
        <div className="absolute bottom-0 left-0 flex flex-row rounded-tr-lg overflow-hidden">
          {product.badges.freeShipping && (
            <span className="bg-[#12B76A] text-white px-2 py-1 text-xs font-medium flex items-center">
              <FaTruckFast className="mr-1 text-base" /> FREE
            </span>
          )}
          {product.badges.gift && (
            <span className="bg-[#FFE2B8] text-[#CC7600] px-2 py-1 text-xs font-medium flex items-center">
              <FaGift className="mr-1 text-base" /> Quà tặng
            </span>
          )}
        </div>
      </div>

      {/* Wishlist Button */}
      <button
        onClick={() => dispatch(toggleWishlist(product.id))}
        className="absolute right-2 top-2 rounded-full bg-white p-2 shadow-md"
        aria-label="Add to wishlist"
      >
        <Heart
          className={cn(
            "h-5 w-5",
            isWishlisted ? "fill-red-500 text-red-500" : "text-gray-500"
          )}
        />
      </button>

      {/* Product Info */}
      <div className="p-3 space-y-2">
        {/* Flash Sale Timer */}
        {product.badges.flashSale && (
          <div className="bg-[#FFF1F3] text-[#E31837] rounded-lg px-3 py-1.5 text-xs font-medium text-center mb-2 flex items-center justify-center gap-1">
            <Image
              src="/flash-sale.svg"
              alt="Flash Sale"
              width={61}
              height={20}
            />{" "}
            • 20:20 • 12/12
          </div>
        )}

        {/* Product Title */}
        <h3 className="line-clamp-2 text-sm font-medium text-[#393e40]">
          {product.title}
        </h3>

        {/* Price */}
        <div className="flex items-baseline gap-1">
          <span className="text-[#f79009] text-lg font-bold">
            ₫{product.price.toLocaleString()}
          </span>
        </div>

        {/* Sold Count */}
        {product.totalSold && (
          <div className="text-xs text-[#5c6366]">
            {formatSoldCount(product.totalSold)} Đã bán
          </div>
        )}
      </div>
    </div>
  );
}
