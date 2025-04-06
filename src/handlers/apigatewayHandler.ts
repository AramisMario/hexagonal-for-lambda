import 'module-alias/register';
import { UseCase, dependenciesType } from "@useCases/useCase";
import { SqsQueue } from "@drivenAdapters/sqsQueue/sqsQueue";
import { QUEUE_URL, THIRD_PARTY_URL } from "@utils/constants";
import { ThridPartyApiAdapter } from "@drivenAdapters/thirdPartyApi/thirdPartyApi";
import { EntityMysqlRepository } from '@infrastructure/driven/repositories/myEntity/repository/entityMySqlRepository';
import { MyEntityMapper } from "@drivenMappers/myEntityMapper/myEntityMapper";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { apigatewayAdapter } from "@drivingAdapters/apigateway/apiGatewayAdapter";
import { ThirdPartyApiErrorMapper } from '@drivenAdapters/thirdPartyApi/thirdPartyErrorMapper/thirdPartyErrorMapper';

const dependencies: dependenciesType = {
    thirdPartyApi: new ThridPartyApiAdapter(THIRD_PARTY_URL, new ThirdPartyApiErrorMapper()),
    messageQueue: new SqsQueue(QUEUE_URL),
    repository: new EntityMysqlRepository(new MyEntityMapper())
}

const useCase = new UseCase();

export const handler = async (event:APIGatewayProxyEventV2) => {

    return await apigatewayAdapter(useCase)(event as APIGatewayProxyEventV2,dependencies); 

}