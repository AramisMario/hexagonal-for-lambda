import 'module-alias/register';
import { Utils } from "@utils/utils";
import { HTTP_RESPONSES } from "@utils/constants";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { dependenciesType } from "@application/useCases/useCase";
import { UseCasePort } from "@primaryPorts/useCases/useCasePort";
import { UnexpectedError } from '@domainErrors/generalErrors/unexpectedError';
import { DebitRequestDTO } from '@infrastructure/driving/DTOs/DebitRequestDTO';
import { BadRequestError } from '@infrastructure/driving/httpErrors/badRequestError';
import { DebitResponseDTOType } from "@infrastructure/driving/DTOs/DebitResponseDTO";
import { EntityPreconditionFailed } from "@domainErrors/entityErrors/entityPreconditionFail";
import { TransactionValidationFail } from "@domainErrors/entityErrors/transactionValidationFail";

export const apigatewayAdapter = (useCase: UseCasePort) => async (event:APIGatewayProxyEventV2,dependencies:dependenciesType) => {

    try{
        const body = JSON.parse(event.body as string);

        if(!DebitRequestDTO.safeParse(body).success){
            // log the validation error
            throw new BadRequestError();
        }

        const result:DebitResponseDTOType = await useCase.exec(body,dependencies);

        return Utils.response(
            HTTP_RESPONSES.SUCCESSFUL.httpCode,
            HTTP_RESPONSES.SUCCESSFUL.code,
            HTTP_RESPONSES.SUCCESSFUL.message,
            result
        );

    }catch(error: any){
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