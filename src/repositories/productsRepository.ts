import IProduct from "../models/Product";
import { readFile } from "fs/promises";

export let products: IProduct[] = [];

export const loadProductData = async (): Promise<void> => {
    try {
        products = JSON.parse(await readFile("products.json", "utf8"));
    } catch (error) {
        console.error(`Failed to load products file into memory error: ${error}`);
        throw new Error("Error reading products file.");
    }
}

export const getAllProducts = () => {
    return products;
}