import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";
import { getResponse } from "~/utils/common";

enum SchemaType {
    Body = "body",
    Params = "params",
    Query = "query",
}

const SchemaValidation = (type: SchemaType, schema: Schema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            switch (type) {
                case SchemaType.Body:
                    req.body = await schema.validateAsync(req.body);
                    break;
                case SchemaType.Params:
                    req.params = await schema.validateAsync(req.params);
                    break;
                case SchemaType.Query:
                    req.query = await schema.validateAsync(req.query);
                    break;
                default:
                    throw new Error("Invalid schema type");
            }
            next();
        } catch (e: any) {
            res.status(400).json(getResponse({
                data: null,
                message: e.message,
            }))
        }
    }
}

export const validateBody = (schema: Schema) => {
    return SchemaValidation(SchemaType.Body, schema);
}

export const validateParams = (schema: Schema) => {
    return SchemaValidation(SchemaType.Params, schema);
}

export const validateQuery = (schema: Schema) => {
    return SchemaValidation(SchemaType.Query, schema);
}