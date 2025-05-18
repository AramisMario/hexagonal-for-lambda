import { BaseError } from "@domain/domainErrors/baseError/baseError";

export class EntityInvalidAddressError extends BaseError{

    static readonly code = 'INVALID_FIELD';
    static readonly message = 'Invalid Address';    
    
    constructor(){
        super(EntityInvalidAddressError.message, EntityInvalidAddressError.code);
    }
}