"use client";

import { Star, Heart, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import Link from "next/link";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { FlashDealsSection } from "../components/FlashDealsSection";
import { ShopByCategorySection } from "../components/ShopByCategorySection";
import { getProductsByCategory } from "../data/products";
import { useCart } from "../contexts/CartContext";
import { toast } from "sonner";
import { useState } from "react";

const fashionSubcategories = [
  { name: "LSE", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400" },
  { name: "T-shirts, Shirts", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400" },
  { name: "Jeans", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400" },
  { name: "Sports Shoes", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400" },
  { name: "Watches", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400" },
  { name: "Kids Clothing", image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400" },
  { name: "Backpacks", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400" },
  { name: "Kurtas", image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400" },
  { name: "Casual Wear", image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400" },
  { name: "Tracksuits", image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400" },
  { name: "Trendy Street", image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400" },
  { name: "Kurta Sets", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400" },
  { name: "Dresses, tops", image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400" },
  { name: "Casual shoes", image: "https://images.unsplash.com/photo-1463100099107-aa0980ccd584?w=400" },
  { name: "Trolley Bags", image: "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=400" },
  { name: "Jewellery", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400" },
  { name: "Sarees", image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400" },
  { name: "Jackets, Sweaters", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400" },
];

const heroSlides = [
  {
    badge: "Trending",
    label: "STYLE MEETS COMFORT",
    title: "Athleisure\nCollection",
    description: "Perfect blend of fashion and functionality. Ideal for active lifestyles.",
    cta: "Buy 2 Get 1 Free",
    secondaryCta: "Explore More",
    slide: "3 / 4",
    image: "https://images.unsplash.com/photo-1483721310020-03333e577078?w=1200",
    gradient: "from-emerald-900 via-teal-900 to-emerald-800",
  },
  {
    badge: "New Arrivals",
    label: "URBAN EDGE",
    title: "Street Style\nEssentials",
    description: "Bold silhouettes and cutting-edge designs for the modern trendsetter.",
    cta: "Shop Now",
    secondaryCta: "View Collection",
    slide: "1 / 4",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200",
    gradient: "from-gray-900 via-zinc-900 to-neutral-900",
  },
];

const shopForLovedOnes = [
  {
    name: "Men",
    description: "Discover men's collection",
    image: "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=800",
    href: "/products?gender=men",
  },
  {
    name: "Women",
    description: "Explore women's collection",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800",
    href: "/products?gender=women",
  },
  {
    name: "Gen Z Drips",
    description: "Trending Gen Z styles",
    badge: "Spoyl",
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800",
    href: "/products?style=genz",
  },
];

const featuredProducts = [
  {
    id: 1,
    name: "Designer Sunglasses",
    category: "Fashion",
    price: 159.99,
    originalPrice: null,
    rating: 4.6,
    reviews: 235,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600",
    badge: null,
  },
  {
    id: 2,
    name: "Leather Backpack",
    category: "Fashion",
    price: 129.99,
    originalPrice: 189.99,
    rating: 4.7,
    reviews: 832,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600",
    badge: null,
  },
  {
    id: 3,
    name: "Summer Dress",
    category: "Fashion",
    price: 79.99,
    originalPrice: 119.99,
    rating: 4.3,
    reviews: 419,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600",
    badge: "New Arrival",
  },
  {
    id: 4,
    name: "Men's Casual Jacket",
    category: "Fashion",
    price: 149.99,
    originalPrice: 219.99,
    rating: 4.8,
    reviews: 670,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600",
    badge: null,
  },
  {
    id: 5,
    name: "Women's Sneakers",
    category: "Fashion",
    price: 89.99,
    originalPrice: null,
    rating: 4.5,
    reviews: 389,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
    badge: "Trending",
  },
  {
    id: 6,
    name: "Leather Handbag",
    category: "Fashion",
    price: 199.99,
    originalPrice: 279.99,
    rating: 4.7,
    reviews: 471,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600",
    badge: null,
  },
  {
    id: 7,
    name: "Men's Watch Classic",
    category: "Fashion",
    price: 249.99,
    originalPrice: 349.99,
    rating: 4.7,
    reviews: 516,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
    badge: "Classic",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`size-3 ${
            star <= Math.floor(rating)
              ? "fill-yellow-400 text-yellow-400"
              : star - 0.5 <= rating
              ? "fill-yellow-400/50 text-yellow-400"
              : "fill-gray-600 text-gray-600"
          }`}
        />
      ))}
    </div>
  );
}

export function FashionPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { addItem } = useCart();
  const products = getProductsByCategory("Fashion");

  const slide = heroSlides[currentSlide];

  const handleAddToCart = (product: (typeof featuredProducts)[0]) => {
    addItem({
      id: String(product.id),
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Category Subcategories Section */}
      <section className="py-8 bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Fashion Products</h2>
            <Link
              href="/products?category=Fashion"
              className="text-[#F7931A] hover:text-orange-400 font-semibold text-sm"
            >
              View All →
            </Link>
          </div>
          <p className="text-gray-400 text-sm mb-6">
            Discover our complete collection of premium products
          </p>
          <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-9 lg:grid-cols-10 xl:grid-cols-10 gap-3">
            {fashionSubcategories.map((item) => (
              <Link
                key={item.name}
                href={`/products?subcategory=${encodeURIComponent(item.name)}`}
                className="group flex flex-col items-center"
              >
                <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-1.5 bg-gray-800 hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300 hover:scale-105">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <p className="text-[10px] text-center text-gray-300 group-hover:text-white font-medium line-clamp-2 leading-tight">
                  {item.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Hero Carousel Section */}
      <section className="relative overflow-hidden">
        <div
          className={`relative bg-gradient-to-br ${slide.gradient} min-h-[400px] md:min-h-[480px]`}
        >
          {/* Background Image */}
          <div className="absolute inset-0 opacity-30">
            <ImageWithFallback
              src={slide.image}
              alt="Fashion Hero"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

          {/* Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex items-center min-h-[400px] md:min-h-[480px]">
            <div className="max-w-lg">
              {/* Badge */}
              <div className="flex items-center gap-2 mb-4">
                <Badge className="bg-[#F7931A] hover:bg-orange-500 text-white text-xs px-3 py-1">
                  {slide.badge}
                </Badge>
              </div>

              {/* Label */}
              <p className="text-gray-300 text-xs font-semibold tracking-[0.25em] uppercase mb-3">
                {slide.label}
              </p>

              {/* Title */}
              <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-5 whitespace-pre-line">
                {slide.title}
              </h1>

              {/* Description */}
              <p className="text-gray-300 text-sm mb-8 leading-relaxed">
                {slide.description}
              </p>

              {/* CTAs */}
              <div className="flex items-center gap-3 flex-wrap">
                <Button
                  size="lg"
                  className="bg-[#F7931A] hover:bg-orange-500 text-white font-bold rounded-full px-8"
                >
                  {slide.cta}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/40 text-white hover:bg-white/10 rounded-full px-8 bg-transparent"
                >
                  {slide.secondaryCta}
                </Button>
              </div>
            </div>
          </div>

          {/* Slide Counter */}
          <div className="absolute top-4 right-4 z-20">
            <Badge
              variant="secondary"
              className="bg-white/20 text-white border-white/30 text-xs"
            >
              {slide.slide}
            </Badge>
          </div>

          {/* Nav Arrows */}
          <button
            onClick={() =>
              setCurrentSlide((prev) =>
                prev === 0 ? heroSlides.length - 1 : prev - 1
              )
            }
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 flex items-center justify-center border border-white/20 transition-all"
          >
            <ChevronLeft className="size-5 text-white" />
          </button>
          <button
            onClick={() =>
              setCurrentSlide((prev) =>
                prev === heroSlides.length - 1 ? 0 : prev + 1
              )
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 flex items-center justify-center border border-white/20 transition-all"
          >
            <ChevronRight className="size-5 text-white" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentSlide
                    ? "w-6 bg-[#F7931A]"
                    : "w-1.5 bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Flash Deals & Offers */}
      <FlashDealsSection />

      {/* Shop for Loved Ones */}
      <section className="py-12 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-6">
            Shop for Loved Ones
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {shopForLovedOnes.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="group relative overflow-hidden rounded-2xl aspect-[4/3] hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 hover:scale-[1.02]"
              >
                <ImageWithFallback
                  src={item.image}
                  alt={item.name}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                {item.badge && (
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-[#F7931A] text-white text-xs">
                      {item.badge}
                    </Badge>
                  </div>
                )}
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-2xl font-bold text-white">{item.name}</h3>
                  <p className="text-white/70 text-xs mt-0.5">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Category Section */}
      <ShopByCategorySection />

      {/* Products Grid Section */}
      <section className="py-12 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-400 text-sm">
              Showing {featuredProducts.length} products
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent rounded-lg text-xs"
              >
                🔧 Filters
              </Button>
              <Button
                size="sm"
                className="bg-gray-800 text-white hover:bg-gray-700 rounded-lg text-xs"
              >
                Featured
              </Button>
            </div>
          </div>

          {/* Products Grid — matches screenshot layout (asymmetric rows) */}
          <div className="grid grid-cols-12 gap-4">
            {/* Row 1: 1 large left + 3 cards right */}
            <div className="col-span-12 md:col-span-3 row-span-2 rounded-2xl overflow-hidden bg-gray-900 group relative">
              <div className="aspect-[3/4] relative overflow-hidden">
                <ImageWithFallback
                  src={featuredProducts[0].image}
                  alt={featuredProducts[0].name}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
                <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 flex items-center justify-center hover:bg-black/70 transition-colors">
                  <Heart className="size-4 text-white" />
                </button>
              </div>
              <div className="p-3">
                <p className="text-[#F7931A] text-xs font-medium mb-1">
                  {featuredProducts[0].category}
                </p>
                <h3 className="text-white text-sm font-semibold mb-1 line-clamp-1">
                  {featuredProducts[0].name}
                </h3>
                <div className="flex items-center gap-1 mb-2">
                  <StarRating rating={featuredProducts[0].rating} />
                  <span className="text-gray-400 text-xs">
                    {featuredProducts[0].rating} ({featuredProducts[0].reviews})
                  </span>
                </div>
                <p className="text-white font-bold text-base mb-3">
                  ${featuredProducts[0].price}
                </p>
                <Button
                  size="sm"
                  className="w-full bg-[#F7931A] hover:bg-orange-500 text-white text-xs rounded-lg"
                  onClick={() => handleAddToCart(featuredProducts[0])}
                >
                  Add to Cart
                </Button>
              </div>
            </div>

            {/* Cards 2, 3, 4 */}
            {featuredProducts.slice(1, 4).map((product) => (
              <div
                key={product.id}
                className="col-span-12 sm:col-span-4 md:col-span-3 rounded-2xl overflow-hidden bg-gray-900 group relative"
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.badge && (
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-[#F7931A] text-white text-[10px] px-2 py-0.5">
                        {product.badge}
                      </Badge>
                    </div>
                  )}
                  <button className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/40 flex items-center justify-center hover:bg-black/70 transition-colors">
                    <Heart className="size-3.5 text-white" />
                  </button>
                </div>
                <div className="p-3">
                  <p className="text-[#F7931A] text-[10px] font-medium mb-0.5">
                    {product.category}
                  </p>
                  <h3 className="text-white text-sm font-semibold mb-1 line-clamp-1">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 mb-1.5">
                    <StarRating rating={product.rating} />
                    <span className="text-gray-400 text-[10px]">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-2.5">
                    <p className="text-white font-bold text-sm">
                      ${product.price}
                    </p>
                    {product.originalPrice && (
                      <p className="text-gray-500 text-xs line-through">
                        ${product.originalPrice}
                      </p>
                    )}
                  </div>
                  <Button
                    size="sm"
                    className="w-full bg-[#F7931A] hover:bg-orange-500 text-white text-xs rounded-lg h-8"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))}

            {/* Row 2 remaining cards */}
            {featuredProducts.slice(4).map((product) => (
              <div
                key={product.id}
                className="col-span-12 sm:col-span-4 md:col-span-3 rounded-2xl overflow-hidden bg-gray-900 group relative"
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.badge && (
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-[#F7931A] text-white text-[10px] px-2 py-0.5">
                        {product.badge}
                      </Badge>
                    </div>
                  )}
                  <button className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/40 flex items-center justify-center hover:bg-black/70 transition-colors">
                    <Heart className="size-3.5 text-white" />
                  </button>
                </div>
                <div className="p-3">
                  <p className="text-[#F7931A] text-[10px] font-medium mb-0.5">
                    {product.category}
                  </p>
                  <h3 className="text-white text-sm font-semibold mb-1 line-clamp-1">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 mb-1.5">
                    <StarRating rating={product.rating} />
                    <span className="text-gray-400 text-[10px]">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-2.5">
                    <p className="text-white font-bold text-sm">
                      ${product.price}
                    </p>
                    {product.originalPrice && (
                      <p className="text-gray-500 text-xs line-through">
                        ${product.originalPrice}
                      </p>
                    )}
                  </div>
                  <Button
                    size="sm"
                    className="w-full bg-[#F7931A] hover:bg-orange-500 text-white text-xs rounded-lg h-8"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Hot Deals Carousel */}
      <section className="py-12 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-600 via-red-600 to-pink-700 p-12 md:p-16">
            <div className="absolute top-4 left-4">
              <Badge className="bg-white/20 border-white/30 text-white text-xs">
                Hot Deal
              </Badge>
            </div>
            <div className="absolute top-4 right-4">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-xs">
                1 / 4
              </Badge>
            </div>
            <div className="relative z-10 max-w-xl">
              <p className="text-white/80 text-xs font-semibold mb-3 uppercase tracking-widest">
                FASHION COLLECTION 2026
              </p>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-5">
                Style Bundle Sale
              </h2>
              <p className="text-white/90 text-base mb-8">
                Elevate your wardrobe with our exclusive fashion collection. Limited time offer!
              </p>
              <div className="flex items-center gap-4 flex-wrap">
                <Badge className="bg-white text-orange-600 text-2xl font-black px-6 py-2">
                  50% OFF
                </Badge>
                <Button
                  size="lg"
                  className="bg-white text-orange-600 hover:bg-gray-100 font-bold rounded-full"
                >
                  <ShoppingCart className="size-5 mr-2" />
                  Grab Deals
                </Button>
              </div>
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-2/5 opacity-25">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800"
                alt="Fashion Sale"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Style Section */}
      <section className="py-12 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-8">Shop by Style</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                name: "Men's Fashion",
                image: "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=800",
                description: "Explore men's styles",
                href: "/products?gender=men",
                overlay: "from-blue-900/70",
              },
              {
                name: "Women's Fashion",
                image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800",
                description: "Discover women's trends",
                href: "/products?gender=women",
                overlay: "from-pink-900/70",
              },
              {
                name: "Kids & Baby",
                image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800",
                description: "Dress them in style",
                href: "/products?age=kids",
                overlay: "from-orange-900/70",
              },
            ].map((style) => (
              <Link
                key={style.name}
                href={style.href}
                className="group relative overflow-hidden rounded-3xl aspect-[4/3] hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-300 hover:scale-[1.02]"
              >
                <ImageWithFallback
                  src={style.image}
                  alt={style.name}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${style.overlay} via-black/30 to-transparent`}
                />
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {style.name}
                  </h3>
                  <p className="text-white/80 text-sm">{style.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}