import express from "express";
import config from "./config/expressConfig";
import { loadProductData } from "./repositories/productsRepository";
import policyRoutes from "./routes/policyRoutes";
import { loadPoliciesData } from "./repositories/policiesRepository";
import { globalErrorHandler } from "./middleware/globalErrorHandler";

loadProductData();
loadPoliciesData();

const app = express();

app.use(express.json());

app.use("/policies", policyRoutes);

app.use(globalErrorHandler);

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});