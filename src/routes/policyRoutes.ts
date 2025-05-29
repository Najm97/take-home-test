import { Router } from "express";
import { createPolicy, deletePolicyById, getPoliciesByCustomer, getPolicyById, updatePolicyById } from "../controllers/policyController";
import { apiKeyAuthentication } from "../middleware/apiKeyAuthentication";

const router = Router();

router.get("/:id", getPolicyById);
router.get("/", getPoliciesByCustomer);

router.post("/", apiKeyAuthentication, createPolicy);
router.put("/:id", apiKeyAuthentication, updatePolicyById);
router.delete("/:id", apiKeyAuthentication, deletePolicyById);

export default router;