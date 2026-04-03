// src/pages/Cart.jsx
import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import {
  FiTrash2,
  FiPlus,
  FiMinus,
  FiShoppingBag,
  FiArrowLeft,
  FiCreditCard,
} from "react-icons/fi";
import toast from "react-hot-toast";

const Cart = () => {
  const {
    cartItems,
    totalAmount,
    totalItems,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    setIsPlacingOrder(true);

    // Simulate order placement
    setTimeout(() => {
      toast.success("Order placed successfully! 🎉");
      clearCart();
      setIsPlacingOrder(false);
    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center">
          <div className="inline-block p-6 bg-gray-100 rounded-full mb-6">
            <FiShoppingBag className="w-16 h-16 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Your Cart is Empty
          </h2>
          <p className="text-gray-600 mb-6">
            Looks like you haven't added any items yet
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
          >
            <FiArrowLeft />
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-1">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="hidden md:grid grid-cols-12 gap-4 bg-gray-50 px-6 py-3 text-sm font-semibold text-gray-600">
              <div className="col-span-5">Product</div>
              <div className="col-span-3 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
            </div>

            {cartItems.map((item) => (
              <div
                key={item._id}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center border-b border-gray-100 px-4 md:px-6 py-4"
              >
                {/* Product Info */}
                <div className="col-span-12 md:col-span-5 flex items-center gap-4">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <Link to={`/product/${item._id}`}>
                      <h3 className="font-semibold text-gray-900 hover:text-green-600 transition">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-500">
                      {item.category?.name}
                    </p>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="text-red-500 text-sm hover:text-red-600 mt-1 flex items-center gap-1"
                    >
                      <FiTrash2 className="w-3 h-3" />
                      Remove
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div className="col-span-12 md:col-span-3 text-left md:text-center">
                  <span className="md:hidden font-semibold text-gray-600 mr-2">
                    Price:
                  </span>
                  <span className="text-gray-900 font-semibold">
                    ${item.price}
                  </span>
                </div>

                {/* Quantity */}
                <div className="col-span-12 md:col-span-2">
                  <div className="flex items-center gap-3 justify-start md:justify-center">
                    <button
                      onClick={() =>
                        updateQuantity(item._id, item.quantity - 1)
                      }
                      className="p-1 rounded-full hover:bg-gray-100 transition"
                    >
                      <FiMinus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item._id, item.quantity + 1)
                      }
                      className="p-1 rounded-full hover:bg-gray-100 transition"
                    >
                      <FiPlus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Total */}
                <div className="col-span-12 md:col-span-2 text-left md:text-right">
                  <span className="md:hidden font-semibold text-gray-600 mr-2">
                    Total:
                  </span>
                  <span className="text-green-600 font-bold text-lg">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between items-center">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 transition"
            >
              <FiArrowLeft />
              Continue Shopping
            </Link>
            <button
              onClick={clearCart}
              className="text-red-600 hover:text-red-700 transition"
            >
              Clear Cart
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-96">
          <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Order Summary
            </h2>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Items:</span>
                <span className="font-semibold">{totalItems}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-semibold">${totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping:</span>
                <span className="text-green-600 font-semibold">Free</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between">
                  <span className="text-lg font-bold text-gray-900">
                    Total:
                  </span>
                  <span className="text-2xl font-bold text-green-600">
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={isPlacingOrder}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPlacingOrder ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Placing Order...
                </>
              ) : (
                <>
                  <FiCreditCard />
                  Place Order
                </>
              )}
            </button>

            <p className="text-xs text-gray-500 text-center mt-4">
              By placing your order, you agree to our Terms & Conditions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
