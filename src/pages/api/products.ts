import type { NextApiRequest, NextApiResponse } from "next";
import { Product } from "eos-lib/models/product";
import { createProduct } from "eos-lib/utils/utils";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product[]>
) {
  res
    .status(200)
    .json(Array.from({ length: 1200 }).map((_, index) => createProduct(index)));
}
