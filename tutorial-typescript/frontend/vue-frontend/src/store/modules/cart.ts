import { cartItemType, cartType } from "@/interfaces";
import { toast } from "bulma-toast";

export interface cartModuleType {
  cart: cartType;
}

export default {
  namespaced: true,
  state: (): cartModuleType => ({
    cart: {
      items: [],
    },
  }),
  mutations: {
    initializeStore(state: cartModuleType) {
      if (localStorage.getItem("cart")) {
        state.cart = JSON.parse(localStorage.getItem("cart")!);
      } else {
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    addToCart(state: cartModuleType, item: cartItemType) {
      const exists = state.cart.items.find(
        (cartItem) => cartItem.product.id === item.product.id
      );

      if (exists) {
        exists.quantity += item.quantity;
      } else {
        state.cart.items.push(item);
      }

      localStorage.setItem("cart", JSON.stringify(state.cart));

      // push notification
      toast({
        message: "Product added to cart.",
        type: "is-success",
      });
    },
    removeFromCart(state: cartModuleType, item: cartItemType) {
      const exists = state.cart.items.find(
        (cartItem) => cartItem.product.id === item.product.id
      );

      if (exists) {
        state.cart.items = state.cart.items.filter(
          (cartItem) => cartItem.product.id !== item.product.id
        );
      }

      localStorage.setItem("cart", JSON.stringify(state.cart));

      // push notification
      toast({
        message: "Product removed from cart.",
        type: "is-info",
      });
    },
  },
  getters: {
    cartTotalLength(state: cartModuleType) {
      return state.cart.items.reduce((sum, item) => (sum += item.quantity), 0);
    },
  },
};
