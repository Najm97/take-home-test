import { Request, Response, NextFunction } from "express";

const apiKey = "secret123";
const apiKeyHeader = "x-api-key";

export const apiKeyAuthentication = (request: Request, response: Response, next: NextFunction) => {
    if(request.get(apiKeyHeader) === apiKey){
        next();
    }else{
        response.status(401).send("Authentication failed - missing or invalid api key.");
    }
}