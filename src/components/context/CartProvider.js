import { useQuery } from "@apollo/client";
import { debounce, throttle } from "lodash";
import React, { useState, useEffect, useMemo } from "react";
import { getFormattedCart } from "../../functions";
import GET_CART from "../../queries/get-cart";

export const CartContext = React.createContext([{}, () => {}]);

export const CartProvider = (props) => {
  const [cart, setCart] = useState(null);
  console.log("cart: ", cart);
  useEffect(() => {
    // @TODO Will add option to show the cart with localStorage later.
    if (process.browser) {
      let cartData = localStorage.getItem("woo-next-cart");
      cartData = cartData != null ? JSON.parse(cartData) : "";
      console.log("parsed cartData from localStorage: ", cartData);
      setCart(cartData);
    }
  }, []);

  // Get Cart Data.
  const {
    data,
    refetch,
    loading: loadingCart,
  } = useQuery(GET_CART, {
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      // Update cart in the localStorage.
      const updatedCart = getFormattedCart(data);
      localStorage.setItem("woo-next-cart", JSON.stringify(updatedCart));

      // Update cart data in React Context.
      setCart(updatedCart);
    },
  });

  // this throttle below is only for users that spam "add to cart" button on multiple products
  // it makes sure we get a second request through
  // if we get more than 500ms of roundtrip and a power user then he has to deal with clunky ui...
  const refetchCart = useMemo(
    () => throttle(refetch, 500, { trailing: true }),
    []
  );

  const addProductToCart = (product, qty) => {
    // check if item exists, if it does bump the quantity
    const itemExists = cart?.products.some(
      (cartProduct) => cartProduct.productId === product.productId
    );
    console.log(itemExists);
    if (itemExists) bumpProductQty(product, 1);
    else {
      // else just add the item to the array
      let newProducts = cart?.products ? [...cart.products] : [];
      newProducts.push({
        ...product,
        qty: 1,
        price: parseFloat(product.priceRaw),
        totalPrice: parseFloat(product.priceRaw),
      });

      const newCart = calculateCartTotals(newProducts);
      setCart(newCart);
    }
  };

  const bumpProductQty = (product, n) => {
    // find the index
    let newProducts = cart.products ? [...cart.products] : [];
    const productIndex = newProducts.findIndex(
      (cartProduct) => cartProduct.productId === product.productId
    );
    let newProduct = newProducts[productIndex];
    //update qty and totalPrice

    newProduct.qty += n;
    newProduct.totalPrice = newProduct.qty * newProduct.price;

    const newCart = calculateCartTotals(newProducts);
    setCart(newCart);
  };

  const calculateCartTotals = (products) => {
    let totalProductsCount = 0;
    let totalProductsPrice = 0;
    products.forEach((product) => {
      totalProductsCount++;
      totalProductsPrice += product.totalPrice;
    });

    let newCart = { products, totalProductsCount, totalProductsPrice };
    return newCart;
  };

  return (
    <CartContext.Provider
      value={{
        cart: cart,
        setCart: setCart,
        refetchCart: refetchCart,
        loadingCart: loadingCart,
        addProductToCart,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};
