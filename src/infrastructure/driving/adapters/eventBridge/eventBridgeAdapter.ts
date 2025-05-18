import { EventBridgeEvent } from "aws-lambda";
import { dependenciesType } from "@application/useCases/accountDebitCase";
import { DebitRequestDTO } from "@infrastructure/driving/DTOs/DebitRequestDTO";
import { UseCasePort } from "@application/ports/primaryPorts/useCases/useCasePort";
import { UnexpectedError } from "@domain/domainErrors/generalErrors/unexpectedError";
import { BadRequestError } from '@infrastructure/driving/httpErrors/badRequestError';
import { EntityPreconditionFailed } from "@domain/domainErrors/entityErrors/entityPreconditionFail";
import { TransactionValidationFail } from "@domain/domainErrors/entityErrors/transactionValidationFail";

export const eventBridgeAdapter = (useCase: UseCasePort) => async (event:EventBridgeEvent<any,any>,dependencies:dependenciesType) => {

    try{
        const body = event.detail.body;

        if(!DebitRequestDTO.safeParse(body).success){
            // log the validation error
            throw new BadRequestError();
        }

        await useCase.exec(body,dependencies);
    }catch(error: any){
        switch(error.code){

            case BadRequestError.code:
                    // log the error here and do what you need 
                break;

            case EntityPreconditionFailed.code:
                    // log the error here and do what you need 
                break;
            case TransactionValidationFail.code:
                    // log the error here and do what you need 
                break;
            case UnexpectedError.code:
                    // log the error here and do what you need 
                break;
            default:
                    // log the error here and do what you need 
                break;
        }
    }

}