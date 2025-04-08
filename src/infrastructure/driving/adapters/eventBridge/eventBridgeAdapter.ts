import { EventBridgeEvent } from "aws-lambda";
import { UseCasePort } from "@primaryPorts/useCases/useCasePort";
import { dependenciesType } from "@application/useCases/useCase";
import { BodyMapper } from "@drivingMappers/bodyMapper";
import { validate } from "class-validator";
import { EntityPreconditionFailed } from "@domainErrors/entityErrors/entityPreconditionFail";
import { TransactionValidationFail } from "@domainErrors/entityErrors/transactionValidationFail";
import { UnexpectedError } from "@domainErrors/generalErrors/unexpectedError";
import { CaseDataMapper } from "@drivingMappers/dataMapper";
import { BadRequestError } from '@infrastructure/driving/httpErrors/badRequestError';
import { CaseData } from "@domain/models/caseData";
export const eventBridgeAdapter = (useCase: UseCasePort) => async (event:EventBridgeEvent<any,any>,dependencies:dependenciesType) => {

    try{
        const body = event.detail.body;

        const requestDTO = BodyMapper.mapToDTO(body);
        const isValid = (await validate(requestDTO)).length > 0 ? false : true;
    
        if(!isValid){
            // use a logger to log the validation
            throw new BadRequestError();
        }
        const caseData: CaseData = CaseDataMapper.mapCaseData(requestDTO);

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