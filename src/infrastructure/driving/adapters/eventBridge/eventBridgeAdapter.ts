import { EventBridgeEvent } from "aws-lambda";
import { UseCasePort } from "@primaryPorts/useCases/useCasePort";
import { dependenciesType } from "@application/useCases/useCase";
import { UnexpectedError } from "@domainErrors/generalErrors/unexpectedError";
import { DebitRequestDTO } from "@infrastructure/driving/DTOs/DebitRequestDTO";
import { DebitResponseDTOType } from "@infrastructure/driving/DTOs/DebitResponseDTO";
import { BadRequestError } from '@infrastructure/driving/httpErrors/badRequestError';
import { EntityPreconditionFailed } from "@domainErrors/entityErrors/entityPreconditionFail";
import { TransactionValidationFail } from "@domainErrors/entityErrors/transactionValidationFail";

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