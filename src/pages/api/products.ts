import type { NextApiRequest, NextApiResponse } from "next";
import { faker } from "@faker-js/faker";
import { Product } from "eos-lib/models/product";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product[]>
) {
  res
    .status(200)
    .json(
      Array.from({ length: 120000 }).map((_, index) => createProduct(index))
    );
}

function createProduct(id: number): Product {
  return {
    id: id,
    name: faker.commerce.product(),
    price: faker.commerce.price(100, 1000, 2, "$"),
    material: faker.commerce.productMaterial(),
  };
}
