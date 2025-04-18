import { UseCase, dependenciesType } from "@useCases/useCase";
import { SqsQueue } from "@drivenAdapters/sqsQueue/sqsQueue";
import { QUEUE_URL, THIRD_PARTY_URL } from "@utils/constants";
import { ThridPartyApiAdapter } from "@drivenAdapters/thirdPartyApi/thirdPartyApi";
import { EntityMysqlRepository } from "@infrastructure/driven/repositories/myEntity/repository/entityMySqlRepository";
import { MyEntityMapper } from "@drivenMappers/myEntityMapper/myEntityMapper";
import { APIGatewayProxyEventV2, EventBridgeEvent, SQSEvent } from "aws-lambda";
import { sqsAdapter } from "@drivingAdapters/sqs/sqsAdapter";
import { ServiceRepository } from '@infrastructure/driven/repositories/myEntity/serviceRepository/serviceRepository';
import { ThirdPartyApiErrorMapper } from '@drivenAdapters/thirdPartyApi/thirdPartyErrorMapper/thirdPartyErrorMapper';

const dependencies: dependenciesType = {
    thirdPartyApi: new ThridPartyApiAdapter(THIRD_PARTY_URL, new ThirdPartyApiErrorMapper()),
    messageQueue: new SqsQueue(QUEUE_URL),
    serviceRepository: new ServiceRepository(new EntityMysqlRepository(),new MyEntityMapper())
}

const useCase = new UseCase();

export const handler = async (event:APIGatewayProxyEventV2 | EventBridgeEvent<any,any> | SQSEvent) => {

    return await sqsAdapter(useCase)(event as SQSEvent,dependencies); 

}