"use server";

import WooCommerceRestApi from "woocommerce-rest-ts-api";

const wooCommerce = new WooCommerceRestApi({
  url: "http://kunalmno-yeezey.local/",
  consumerKey: process.env.WC_CONSUMER_KEY as string,
  consumerSecret: process.env.WC_CONSUMER_SECRET as string,
  version: "wc/v3",
});

export const getProducts = async () => {
  const products = await wooCommerce.get("products");
  return products.data;
};

export const getProduct = async (id: string) => {
  const product = await wooCommerce.get(`products`, {
    id: parseInt(id),
  });
  return product.data;
};
