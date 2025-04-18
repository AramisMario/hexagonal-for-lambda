import { SQSEvent } from "aws-lambda";
import { UseCasePort } from "@primaryPorts/useCases/useCasePort";
import { dependenciesType } from "@application/useCases/useCase";
import { BodyMapper } from "@drivingMappers/bodyMapper";
import { validate } from "class-validator";
import { EntityPreconditionFailed } from "@domainErrors/entityErrors/entityPreconditionFail";
import { TransactionValidationFail } from "@domainErrors/entityErrors/transactionValidationFail";
import { UnexpectedError } from "@domainErrors/generalErrors/unexpectedError";
import { CaseDataMapper } from "@drivingMappers/dataMapper";
import { BadRequestError } from '@infrastructure/driving/httpErrors/badRequestError';
export const sqsAdapter = (useCase: UseCasePort) => async (event:SQSEvent,dependencies:dependenciesType) => {

    const records = event.Records;

    for(const record of records){
        try{
            const requestDTO = BodyMapper.mapToDTO(record.body);
            const isValid = (await validate(requestDTO)).length > 0 ? false : true;
    
            if(!isValid){
                // log the validation error
                throw new BadRequestError();
            }
            const caseData = CaseDataMapper.mapCaseData(requestDTO);

            await useCase.exec(caseData,dependencies);

        }catch(error){
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