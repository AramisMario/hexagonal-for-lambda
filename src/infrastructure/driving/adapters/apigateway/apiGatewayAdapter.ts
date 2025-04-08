import 'module-alias/register';
import { Utils } from "@utils/utils";
import { ResponseDTO } from "@infrastructure/driving/DTOs/responseDTO";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { HTTP_RESPONSES } from "@utils/constants";
import { UseCasePort } from "@primaryPorts/useCases/useCasePort";
import { EntityPreconditionFailed } from "@domainErrors/entityErrors/entityPreconditionFail";
import { dependenciesType } from "@application/useCases/useCase";
import { TransactionValidationFail } from "@domainErrors/entityErrors/transactionValidationFail";
import { BodyMapper } from "@drivingMappers/bodyMapper";
import { validate } from "class-validator";
import { UnexpectedError } from '@domainErrors/generalErrors/unexpectedError';
import { CaseDataMapper } from '@drivingMappers/dataMapper';
import { BadRequestError } from '@infrastructure/driving/httpErrors/badRequestError';
import { CaseData } from '@domain/models/caseData';
export const apigatewayAdapter = (useCase: UseCasePort) => async (event:APIGatewayProxyEventV2,dependencies:dependenciesType) => {

    try{
        const body = JSON.parse(event.body as string);

        const requestDTO = BodyMapper.mapToDTO(body);

        const isValid = (await validate(requestDTO)).length > 0 ? false : true;

        if(!isValid){
            // log the validation error
            throw new BadRequestError();
        }

        const caseData: CaseData = CaseDataMapper.mapCaseData(requestDTO);

        const result = await useCase.exec(caseData,dependencies);

        const responseData = new ResponseDTO(
            result.debitedAmount,
            result.cost
        );
        return Utils.response(
            HTTP_RESPONSES.SUCCESSFUL.httpCode,
            HTTP_RESPONSES.SUCCESSFUL.code,
            HTTP_RESPONSES.SUCCESSFUL.message,
            responseData
        );


    }catch(error){
        switch(error.code){

            case BadRequestError.code:
                // log the error here
                return Utils.response(
                    BadRequestError.httpCode,
                    BadRequestError.code,
                    BadRequestError.message
                );

            case EntityPreconditionFailed.code:
                // log the error here
                return Utils.response(
                    412,
                    EntityPreconditionFailed.code,
                    EntityPreconditionFailed.message
                );
            case TransactionValidationFail.code:
                // log the error here
                return Utils.response(
                    412,
                    TransactionValidationFail.code,
                    TransactionValidationFail.message
                )
            case UnexpectedError.code:
                // log the error here
                return Utils.response(
                    500,
                    UnexpectedError.code,
                    UnexpectedError.message
                )
            default:
                // log the error here
                return Utils.response(
                    500,
                    UnexpectedError.code,
                    UnexpectedError.message
                )
        }
    }

}