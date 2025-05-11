import { IResponse } from "../types/ICommon";

interface IResponseParams<T> {
    data: T;
    message?: string;
}

export const getResponse = <T>({ data, message }: IResponseParams<T>): IResponse<T> => {
    return {
        success: !!data,
        message: message || (data ? "Success" : "Failed"),
        data,
    };
}