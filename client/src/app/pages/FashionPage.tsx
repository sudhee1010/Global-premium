"use client";

import {
  Star,
  Heart,
  ShoppingCart,
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
} from "lucide-react";
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

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────

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
    titleLines: ["Athleisure", "Collection"],
    description: "Perfect blend of fashion and functionality. Ideal for active lifestyles.",
    primaryCta: "Buy 2 Get 1 Free",
    primaryCtaHref: "/products?offer=buy2get1",
    secondaryCta: "Explore More",
    secondaryCtaHref: "/products?category=Fashion",
    slideLabel: "3 / 4",
    image: "https://images.unsplash.com/photo-1483721310020-03333e577078?w=1400",
    overlayFrom: "rgba(20,120,80,0.72)",
    overlayTo: "rgba(0,180,160,0.55)",
  },
  {
    badge: "New Arrivals",
    label: "URBAN EDGE",
    titleLines: ["Street Style", "Essentials"],
    description: "Bold silhouettes and cutting-edge designs for the modern trendsetter.",
    primaryCta: "Shop Now",
    primaryCtaHref: "/products?style=street",
    secondaryCta: "Explore More",
    secondaryCtaHref: "/products?category=Fashion",
    slideLabel: "1 / 4",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1400",
    overlayFrom: "rgba(30,30,80,0.78)",
    overlayTo: "rgba(80,40,120,0.58)",
  },
  {
    badge: "Sale",
    label: "SUMMER VIBES",
    titleLines: ["Summer", "Collection"],
    description: "Light fabrics, bold prints and breezy silhouettes for the season.",
    primaryCta: "Up to 40% Off",
    primaryCtaHref: "/products?sale=summer",
    secondaryCta: "Explore More",
    secondaryCtaHref: "/products?category=Fashion",
    slideLabel: "2 / 4",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1400",
    overlayFrom: "rgba(180,80,20,0.70)",
    overlayTo: "rgba(240,160,0,0.52)",
  },
  {
    badge: "Exclusive",
    label: "WINTER WARMTH",
    titleLines: ["Winter", "Wardrobe"],
    description: "Stay warm and stylish with our premium winter collection.",
    primaryCta: "Shop Winter",
    primaryCtaHref: "/products?season=winter",
    secondaryCta: "Explore More",
    secondaryCtaHref: "/products?category=Fashion",
    slideLabel: "4 / 4",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=1400",
    overlayFrom: "rgba(10,40,100,0.78)",
    overlayTo: "rgba(20,100,160,0.58)",
  },
];

const shopForLovedOnes = [
  {
    name: "Men",
    description: "Discover men's collection",
    image: "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=800",
    href: "/products?gender=men",
    badge: null as string | null,
  },
  {
    name: "Women",
    description: "Explore women's collection",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800",
    href: "/products?gender=women",
    badge: null as string | null,
  },
  {
    name: "Gen Z Drips",
    description: "Trending Gen Z styles",
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800",
    href: "/products?style=genz",
    badge: "Spoyl",
  },
];

// Row 1: 3 cards (wide images, landscape)
// Row 2: 4 cards (wide images, landscape)
const featuredProducts = [
  {
    id: 1,
    name: "Designer Sunglasses",
    category: "Fashion",
    price: 159.99,
    originalPrice: null as number | null,
    rating: 4.6,
    reviews: 235,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800",
    badge: null as string | null,
  },
  {
    id: 2,
    name: "Leather Backpack",
    category: "Fashion",
    price: 129.99,
    originalPrice: 189.99 as number | null,
    rating: 4.7,
    reviews: 832,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800",
    badge: null as string | null,
  },
  {
    id: 3,
    name: "Summer Dress",
    category: "Fashion",
    price: 79.99,
    originalPrice: 119.99 as number | null,
    rating: 4.3,
    reviews: 419,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800",
    badge: "New Arrival",
  },
  {
    id: 4,
    name: "Men's Casual Jacket",
    category: "Fashion",
    price: 149.99,
    originalPrice: 219.99 as number | null,
    rating: 4.8,
    reviews: 670,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800",
    badge: null as string | null,
  },
  {
    id: 5,
    name: "Women's Sneakers",
    category: "Fashion",
    price: 89.99,
    originalPrice: null as number | null,
    rating: 4.5,
    reviews: 389,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
    badge: "Trending",
  },
  {
    id: 6,
    name: "Leather Handbag",
    category: "Fashion",
    price: 199.99,
    originalPrice: 279.99 as number | null,
    rating: 4.7,
    reviews: 471,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800",
    badge: null as string | null,
  },
  {
    id: 7,
    name: "Men's Watch Classic",
    category: "Fashion",
    price: 249.99,
    originalPrice: 349.99 as number | null,
    rating: 4.7,
    reviews: 516,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
    badge: "Classic",
  },
];

// ─────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────

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

// Product card — uniform aspect-[4/3] image, info below, orange Add to Cart button
function ProductCard({
  product,
  onAddToCart,
}: {
  product: (typeof featuredProducts)[0];
  onAddToCart: (p: (typeof featuredProducts)[0]) => void;
}) {
  return (
    <div className="rounded-2xl overflow-hidden bg-[#1a1d23] group flex flex-col h-full">
      {/* Image area */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
        />
        {product.badge && (
          <div className="absolute top-3 left-3 z-10">
            <span className="text-white text-[10px] font-semibold px-2.5 py-1 rounded-full bg-[#F7931A]">
              {product.badge}
            </span>
          </div>
        )}
        <button className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/80 transition-colors">
          <Heart className="size-3.5 text-white" />
        </button>
      </div>

      {/* Info area */}
      <div className="p-3 flex flex-col flex-1">
        {/* Category label */}
        <p className="text-[#F7931A] text-[10px] font-semibold uppercase tracking-wide mb-1">
          {product.category}
        </p>

        {/* Product name */}
        <h3 className="text-white text-sm font-semibold mb-1.5 line-clamp-1">
          {product.name}
        </h3>

        {/* Stars + review count */}
        <div className="flex items-center gap-1.5 mb-2">
          <StarRating rating={product.rating} />
          <span className="text-gray-400 text-[10px]">
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Price row */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-white font-bold text-sm">${product.price}</span>
          {product.originalPrice && (
            <span className="text-gray-500 text-xs line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>

        {/* Add to Cart — full width orange button */}
        <Button
          size="sm"
          className="w-full mt-auto bg-[#F7931A] hover:bg-orange-500 active:bg-orange-600 text-white text-xs font-semibold rounded-xl h-8 transition-colors"
          onClick={() => onAddToCart(product)}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────

export function FashionPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { addItem } = useCart();

  const slide = heroSlides[currentSlide];

  const prevSlide = () =>
    setCurrentSlide((c) => (c === 0 ? heroSlides.length - 1 : c - 1));
  const nextSlide = () =>
    setCurrentSlide((c) => (c === heroSlides.length - 1 ? 0 : c + 1));

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

      {/* ── 1. FASHION SUBCATEGORIES ── */}
      <section className="py-8 bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-xl font-bold text-white">Fashion Products</h2>
            <Link
              href="/products?category=Fashion"
              className="text-[#F7931A] hover:text-orange-400 font-semibold text-sm"
            >
              View All →
            </Link>
          </div>
          <p className="text-gray-400 text-sm mb-5">
            Discover our complete collection of premium products
          </p>
          <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-9 lg:grid-cols-10 gap-3">
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

      {/* ── 2. HERO CAROUSEL ── */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-5 bg-gray-950">
        <div
          className="relative w-full overflow-hidden rounded-2xl"
          style={{ minHeight: 420 }}
        >
          {/* Background photo */}
          <div className="absolute inset-0">
            <ImageWithFallback
              src={slide.image}
              alt={slide.titleLines.join(" ")}
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Coloured gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${slide.overlayFrom} 0%, ${slide.overlayTo} 100%)`,
            }}
          />

          {/* Decorative circle — right side */}
          <div
            className="absolute pointer-events-none"
            style={{
              right: "7%",
              top: "50%",
              transform: "translateY(-50%)",
              width: "clamp(180px, 28vw, 360px)",
              height: "clamp(180px, 28vw, 360px)",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.09)",
              border: "1.5px solid rgba(255,255,255,0.14)",
              backdropFilter: "blur(2px)",
            }}
          />

          {/* Text content */}
          <div
            className="relative z-10 flex flex-col justify-center px-8 sm:px-12 py-12"
            style={{ minHeight: 420 }}
          >
            <div className="mb-4">
              <span
                className="inline-block text-white text-sm font-semibold px-5 py-1.5 rounded-full"
                style={{ background: "#F7931A" }}
              >
                {slide.badge}
              </span>
            </div>

            <p
              className="text-white font-semibold uppercase mb-3"
              style={{ fontSize: "0.75rem", letterSpacing: "0.22em" }}
            >
              {slide.label}
            </p>

            <h1
              className="text-white font-black leading-[1.05] mb-5"
              style={{ fontSize: "clamp(2.6rem, 5.5vw, 5rem)" }}
            >
              {slide.titleLines.map((line, i) => (
                <span key={i} className="block">{line}</span>
              ))}
            </h1>

            <p
              className="text-white/85 mb-8 max-w-sm"
              style={{ fontSize: "0.94rem", lineHeight: 1.65 }}
            >
              {slide.description}
            </p>

            <div className="flex flex-col gap-3" style={{ width: "fit-content" }}>
              <Link
                href={slide.primaryCtaHref}
                className="inline-flex items-center justify-center px-8 py-3 rounded-full font-bold transition-all duration-200 hover:bg-white/10"
                style={{
                  border: "2px solid rgba(255,255,255,0.50)",
                  color: "#F7931A",
                  fontSize: "1.05rem",
                  minWidth: 220,
                  background: "rgba(255,255,255,0.04)",
                }}
              >
                {slide.primaryCta}
              </Link>

              <Link
                href={slide.secondaryCtaHref}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-3 rounded-full font-bold text-white transition-all duration-200 hover:bg-orange-500"
                style={{
                  background: "#F7931A",
                  fontSize: "1rem",
                  minWidth: 220,
                }}
              >
                <ShoppingBag className="size-5" />
                {slide.secondaryCta}
              </Link>
            </div>
          </div>

          {/* Slide counter */}
          <div className="absolute top-4 right-4 z-20">
            <span
              className="text-white text-sm font-semibold px-4 py-1.5 rounded-full"
              style={{
                background: "rgba(20,30,40,0.68)",
                backdropFilter: "blur(6px)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              {slide.slideLabel}
            </span>
          </div>

          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center rounded-full transition-all duration-200 hover:bg-black/60"
            style={{
              width: 38, height: 38,
              background: "rgba(20,30,40,0.65)",
              backdropFilter: "blur(4px)",
              border: "1px solid rgba(255,255,255,0.14)",
            }}
          >
            <ChevronLeft className="size-5 text-white" />
          </button>

          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center rounded-full transition-all duration-200 hover:bg-black/60"
            style={{
              width: 38, height: 38,
              background: "rgba(20,30,40,0.65)",
              backdropFilter: "blur(4px)",
              border: "1px solid rgba(255,255,255,0.14)",
            }}
          >
            <ChevronRight className="size-5 text-white" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                aria-label={`Slide ${i + 1}`}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: i === currentSlide ? 24 : 6,
                  background: i === currentSlide ? "#F7931A" : "rgba(255,255,255,0.40)",
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. FLASH DEALS & OFFERS ── */}
      <FlashDealsSection />

      {/* ── 4. SHOP FOR LOVED ONES ── */}
      <section className="py-12 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-6">Shop for Loved Ones</h2>
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
                    <Badge className="bg-[#F7931A] text-white text-xs">{item.badge}</Badge>
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

      {/* ── 5. SHOP BY CATEGORY ── */}
      <ShopByCategorySection />

      {/* ── 6. PRODUCTS GRID — exact match to screenshot ── */}
      <section className="py-10 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Toolbar row */}
          <div className="flex items-center justify-between mb-5">
            <p className="text-gray-400 text-sm">
              Showing {featuredProducts.length} products
            </p>
            <div className="flex items-center gap-2">
              {/* Filters button — outlined */}
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-800 text-xs font-medium transition-colors">
                <SlidersHorizontal className="size-3.5" />
                Filters
              </button>
              {/* Featured button — solid dark */}
              <button className="px-3 py-1.5 rounded-lg bg-gray-800 text-white hover:bg-gray-700 text-xs font-medium transition-colors">
                Featured
              </button>
            </div>
          </div>

          {/* ── ROW 1: 3 equal cards ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {featuredProducts.slice(0, 3).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>

          {/* ── ROW 2: 4 equal cards ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredProducts.slice(3, 7).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. HOT DEALS PROMO BANNER ── */}
      <section className="py-12 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-600 via-red-600 to-pink-700 p-12 md:p-16">
            <div className="absolute top-4 left-4">
              <Badge className="bg-white/20 border border-white/30 text-white text-xs">
                Hot Deal
              </Badge>
            </div>
            <div className="absolute top-4 right-4">
              <Badge className="bg-white/20 border border-white/30 text-white text-xs">
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
            <div className="absolute right-0 top-0 bottom-0 w-2/5 opacity-25 pointer-events-none">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800"
                alt="Fashion Sale"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. SHOP BY STYLE ── */}
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
                  <h3 className="text-2xl font-bold text-white mb-1">{style.name}</h3>
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