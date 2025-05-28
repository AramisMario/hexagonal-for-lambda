import { UseCase, dependenciesType } from "@application/useCases/accountDebitCase";
import { SqsQueue } from "@drivenAdapters/sqsQueue/sqsQueue";
import { QUEUE_URL, THIRD_PARTY_URL } from "@utils/constants";
import { ThridPartyApiAdapter } from "@drivenAdapters/thirdPartyApi/thirdPartyApi";
import { EntityMysqlRepositoryFind } from '@drivenRepositories/account/repository/mysqlRepositoryFind';
import { EntityMysqlRepositoryTransaction } from '@drivenRepositories/account/repository/mysqlRepositoryTransact';
import { MyEntityMapper } from "@drivenMappers/myEntityMapper/myEntityMapper";
import { EventBridgeEvent } from "aws-lambda";
import { eventBridgeAdapter } from "@drivingAdapters/eventBridge/eventBridgeAdapter";
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

export const handler = async (event: EventBridgeEvent<any,any>) => {

    return await eventBridgeAdapter(useCase)(event as EventBridgeEvent<any,any>,dependencies); 

}