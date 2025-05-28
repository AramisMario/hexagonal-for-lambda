import { UseCase, dependenciesType } from "@application/useCases/accountDebitCase";
import { SqsQueue } from "@drivenAdapters/sqsQueue/sqsQueue";
import { QUEUE_URL, THIRD_PARTY_URL } from "@utils/constants";
import { ThridPartyApiAdapter } from "@drivenAdapters/thirdPartyApi/thirdPartyApi";
import { EntityMysqlRepositoryFind } from '@drivenRepositories/account/repository/mysqlRepositoryFind';
import { EntityMysqlRepositoryTransaction } from '@drivenRepositories/account/repository/mysqlRepositoryTransact';
import { MyEntityMapper } from "@drivenMappers/myEntityMapper/myEntityMapper";
import { APIGatewayProxyEventV2, EventBridgeEvent, SQSEvent } from "aws-lambda";
import { sqsAdapter } from "@drivingAdapters/sqs/sqsAdapter";
import { ThirdPartyApiErrorMapper } from '@drivenAdapters/thirdPartyApi/thirdPartyErrorMapper/thirdPartyErrorMapper';
import mySqlConnection from "@infrastructure/driven/database/mysqlConnection";

const entityMapper = new MyEntityMapper();
const dependencies: dependenciesType = {
    thirdPartyApi: new ThridPartyApiAdapter(THIRD_PARTY_URL, new ThirdPartyApiErrorMapper()),
    messageQueue: new SqsQueue(QUEUE_URL),
    repositoryFind: new EntityMysqlRepositoryFind(entityMapper),
    repositoryTransaction: new EntityMysqlRepositoryTransaction(entityMapper),
}

const useCase = new UseCase();

export const handler = async (event:APIGatewayProxyEventV2 | EventBridgeEvent<any,any> | SQSEvent) => {

    return await sqsAdapter(useCase)(event as SQSEvent,dependencies); 

}