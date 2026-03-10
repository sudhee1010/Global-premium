import { motion } from "motion/react";
import { useEffect } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  CheckCircle2,
  Package,
  MapPin,
  Calendar,
  CreditCard,
  X,
} from "lucide-react";
import confetti from "canvas-confetti";
import { useSuccessSound } from "../hooks/useSuccessSound";

interface OrderSuccessCardProps {
  orderData: {
    orderNumber: string;
    amount: number;
    paymentMethod: string;
    estimatedDelivery: string;
    shippingAddress: {
      name: string;
      address: string;
      city: string;
      state: string;
      zip: string;
    };
    itemCount: number;
  };
  onClose?: () => void;
}

export function OrderSuccessCard({
  orderData,
  onClose,
}: OrderSuccessCardProps) {
  const { playSuccessSound } = useSuccessSound();

  useEffect(() => {
    // Play success sound
    playSuccessSound();

    // Fire confetti on mount
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      // Fire confetti from both sides
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#F7931A', '#22c55e', '#3b82f6', '#f59e0b', '#10b981'],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#F7931A', '#22c55e', '#3b82f6', '#f59e0b', '#10b981'],
      });
    }, 250);

    return () => clearInterval(interval);
  }, [playSuccessSound]);

  return (
    <div className="w-full max-w-full px-4 py-6 md:px-6 lg:px-8">
      <Card className="relative w-full bg-white dark:bg-gray-900 border-0 rounded-[24px] shadow-2xl overflow-hidden">
        {/* Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 size-10 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center justify-center"
            aria-label="Close"
          >
            <X className="size-5 text-gray-600 dark:text-gray-400" />
          </button>
        )}

        <div className="p-8 md:p-12 lg:p-16">
          {/* Success Icon & Title */}
          <div className="flex flex-col items-center text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
              className="mb-6"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping" />
                <div className="relative size-28 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-2xl">
                  <CheckCircle2 className="size-14 text-white" strokeWidth={3} />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3">
                Order Placed Successfully! 🎉
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Thank you for your purchase. Your order has been confirmed.
              </p>
            </motion.div>
          </div>

          {/* Order Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Order Number */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-[20px] backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="size-10 rounded-full bg-[#F7931A]/10 flex items-center justify-center">
                  <Package className="size-5 text-[#F7931A]" />
                </div>
                <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                  Order Number
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {orderData.orderNumber}
              </p>
            </motion.div>

            {/* Estimated Delivery */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-[20px] backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="size-10 rounded-full bg-[#F7931A]/10 flex items-center justify-center">
                  <Calendar className="size-5 text-[#F7931A]" />
                </div>
                <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                  Estimated Delivery
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {orderData.estimatedDelivery}
              </p>
            </motion.div>
          </div>

          {/* Payment Method */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="p-6 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-950/30 dark:to-yellow-950/30 rounded-[20px] border-2 border-orange-200/50 dark:border-orange-800/50 mb-8 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-white dark:bg-gray-900 shadow-md flex items-center justify-center">
                  <CreditCard className="size-5 text-[#F7931A]" />
                </div>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                  Payment Method
                </span>
              </div>
              <Badge className="bg-green-500 hover:bg-green-500 text-white font-semibold px-4 py-1 text-sm">
                Paid
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
                {orderData.paymentMethod}
              </span>
              <span className="text-4xl font-bold text-[#F7931A]">
                ${orderData.amount.toFixed(2)}
              </span>
            </div>
          </motion.div>

          {/* Shipping Address */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-[20px] mb-8 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="size-10 rounded-full bg-[#F7931A]/10 flex items-center justify-center">
                <MapPin className="size-5 text-[#F7931A]" />
              </div>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                Shipping Address
              </span>
            </div>
            <div className="text-base text-gray-600 dark:text-gray-400 space-y-1 pl-[52px]">
              <p className="font-semibold text-gray-900 dark:text-white">
                {orderData.shippingAddress.name}
              </p>
              <p>{orderData.shippingAddress.address}</p>
              <p>
                {orderData.shippingAddress.city}, {orderData.shippingAddress.state}{" "}
                {orderData.shippingAddress.zip}
              </p>
            </div>
          </motion.div>

          {/* Order Items */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Order Items ({orderData.itemCount})
            </h3>
          </motion.div>
        </div>
      </Card>
    </div>
  );
}

