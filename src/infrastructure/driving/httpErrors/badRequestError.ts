import { BaseError } from "@domain/domainErrors/baseError/baseError";

export class BadRequestError extends BaseError{
    static readonly httpCode = 400;
    static readonly code = 'BAD_REQUEST';
    static readonly message = 'Bad request';
    
    constructor(){
        super(BadRequestError.message, BadRequestError.code);
    }
}