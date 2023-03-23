import { faker } from "@faker-js/faker";
import { Product } from "eos-lib/models/product";

export function createProduct(id: number): Product {
  return {
    id: id,
    name: faker.commerce.product(),
    price: faker.commerce.price(100, 1000, 2, "$"),
    material: faker.commerce.productMaterial(),
  };
}

export async function getAllProducts(): Promise<Product[]> {
  return Array.from({ length: 120000 }).map((_, index) => createProduct(index));
}
