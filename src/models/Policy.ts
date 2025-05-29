import IProduct from "./Product";

interface IPolicy {
    id: `pol_${string}`,
    productId: string,
    product?: IProduct,
    customerName: string,
    startDate: string,
    endDate: string,
    premium: number,
    status: string,
    createdAt: string
}

export default IPolicy;
