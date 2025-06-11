import { SQSEvent } from "aws-lambda";
import { dependenciesType } from "@application/useCases/accountDebitCase";
import { DebitRequestDTO } from "@infrastructure/driving/DTOs/DebitRequestDTO";
import { UseCasePort } from "@application/ports/primaryPorts/useCases/accountDebitPort";
import { BadRequestError } from '@infrastructure/driving/httpErrors/badRequestError';
import { UnexpectedError } from "@domain/domainErrors/generalErrors/unexpectedError";
import { EntityPreconditionFailed } from "@domain/domainErrors/entityErrors/entityPreconditionFail";
import { TransactionValidationFail } from "@domain/domainErrors/entityErrors/transactionValidationFail";
export const sqsAdapter = (useCase: UseCasePort) => async (event:SQSEvent,dependencies:dependenciesType) => {

    const records = event.Records;

    for(const record of records){
        try{
            const body = JSON.parse(record.body);

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
}