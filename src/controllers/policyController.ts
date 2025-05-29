import { Request, Response, NextFunction } from "express";
import { getAllPolicies } from "../repositories/policiesRepository";
import { getAllProducts } from "../repositories/productsRepository";
import IPolicy from "../models/Policy";

export const getPolicyById = (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = request.params.id;
        const policy = getAllPolicies().find(p => p.id === id);

        if (!policy) {
            response.status(404).send();
            return;
        }

        const policyProduct = getAllProducts().find(p => p.id === policy.productId);

        if (!policyProduct) {
            console.error(`Product with id: ${policy.productId} could not be found`);
            response.status(404).send();
            return;
        }

        const dto: IPolicy = {
            ...policy, product: {
                ...policyProduct
            }
        };

        response.status(200).json(dto);
    } catch (error) {
        next(error);
    }
}

export const getPoliciesByCustomer = (request: Request, response: Response, next: NextFunction) => {
    try {
        const customerName = request.query.customerName;
        const customerPolicies = getAllPolicies().filter(p => p.customerName === customerName);

        response.status(200).json(customerPolicies);
    } catch (error) {
        next(error);
    }
}

export const createPolicy = (request: Request, response: Response, next: NextFunction) => {
    try {
        const { productId, customerName, startDate, endDate, premium, status } = request.body;
        const mostRecentId = Math.max(...getAllPolicies().map(p => Number(p.id.substring(4))));
        const newId = `${mostRecentId + 1}`.padStart(3, '0');

        const newPolicy: IPolicy = {
            id: `pol_${newId}`,
            productId,
            customerName,
            startDate,
            endDate,
            premium,
            status,
            createdAt: new Date().toISOString()
        };

        getAllPolicies().push(newPolicy);

        response.setHeader("Location", `${request.protocol}://${request.get('host')}/policies/${newPolicy.id}`);
        response.status(201).json(newPolicy);
    } catch (error) {
        next(error);
    }
}

export const updatePolicyById = (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = request.params.id;
        let policy = getAllPolicies().find(p => p.id === id);

        if (!policy) {
            response.status(404).send(`Policy update failed - policy with id ${id} could not be found.`);
            return;
        }

        const { productId, customerName, startDate, endDate, premium, status, createdAt } = request.body;

        policy.productId = productId;
        policy.customerName = customerName;
        policy.startDate = startDate;
        policy.endDate = endDate;
        policy.premium = premium;
        policy.status = status;
        policy.createdAt = createdAt;

        response.status(204).send();
    } catch (error) {
        next(error);
    }
}

export const deletePolicyById = (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = request.params.id;
        let policyIndex = getAllPolicies().findIndex(p => p.id === id);

        if (policyIndex === -1) {
            response.status(404).send(`Policy delete failed - policy with id ${id} could not be found.`);
            return;
        }

        getAllPolicies().splice(policyIndex, 1);

        response.status(200).send();
    } catch (error) {
        next(error);
    }
}