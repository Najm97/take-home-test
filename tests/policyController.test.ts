import { Request, Response } from 'express';
import { getPolicyById } from '../src/controllers/policyController';
import IProduct from '../src/models/Product';
import IPolicy from '../src/models/Policy';
import { getAllPolicies as getAllPoliciesOriginal } from '../src/repositories/policiesRepository';
import { getAllProducts as getAllProductsOriginal, products } from '../src/repositories/productsRepository';
const getAllPolicies = getAllPoliciesOriginal as jest.Mock;
const getAllProducts = getAllProductsOriginal as jest.Mock;

jest.mock('../src/repositories/productsRepository');
jest.mock('../src/repositories/policiesRepository');

const testProduct: IProduct = {
    id: "prod_motor",
    name: "Motor Insurance",
    category: "motor",
    description: "Covers damage and liability for cars and motorcycles.",
    basePrice: 300,
    createdAt: "2024-01-01T10:00:00Z"
};

const testPolicy: IPolicy = {
    id: "pol_001",
    productId: "prod_motor",
    customerName: "Alice Smith",
    startDate: "2025-01-01",
    endDate: "2026-01-01",
    premium: 320,
    status: "active",
    createdAt: "2025-01-01T12:00:00Z"
};

describe("policyController", () => {

    describe("getPolicyById", () => {
        it("returns policy with product data", () => {

            getAllProducts.mockReturnValue([testProduct]);
            getAllPolicies.mockReturnValue([testPolicy]);

            const req = {} as Request;
            req.params = {
                id: "pol_001"
            };

            const res = {} as unknown as Response;
            res.json = jest.fn();
            res.status = jest.fn(() => res); // chained

            getPolicyById(req, res, jest.fn());

            const expected = {
                ...testPolicy, product: {
                    ...testProduct
                }
            };

            expect(res.json).toHaveBeenCalledWith(expected);
            expect(res.status).toHaveBeenCalledWith(200);
        });

        it("returns 404 not found when policy product not present in db", () => {

            getAllProducts.mockReturnValue([]);
            getAllPolicies.mockReturnValue([testPolicy]);

            const req = {} as Request;
            req.params = {
                id: "pol_001"
            };

            const res = {
                status: jest.fn(),
            } as unknown as Response;

            getPolicyById(req, res, jest.fn());

            expect(res.status).toHaveBeenCalledWith(404);
        });

        it("returns 404 not found when policy not present in db", () => {

            const req = {} as Request;
            req.params = {
                id: "pol_001"
            };

            const res = {
                status: jest.fn(),
            } as unknown as Response;

            getPolicyById(req, res, jest.fn());

            expect(res.status).toHaveBeenCalledWith(404);
        });
    });
});