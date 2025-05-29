import IPolicy from "../models/Policy";
import { readFile } from "fs/promises";

export let policies: IPolicy[] = [];

export const loadPoliciesData = async (): Promise<void> => {
    try {
        policies = JSON.parse(await readFile("policies.json", "utf8"));
    } catch (error) {
        console.error(`Failed to load policies file into memory error: ${error}`);
        throw new Error("Error reading policies file.");
    }
}

export const getAllPolicies = () => {
    return policies;
}