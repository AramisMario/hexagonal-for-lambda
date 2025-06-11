import { EventBridgeEvent } from "aws-lambda";
import { QUEUE_URL, THIRD_PARTY_URL } from "@utils/constants";
import { SqsQueue } from "@infrastructure/driven/adapters/sqsQueue/sqsQueue";
import mySqlConnection from "@infrastructure/driven/database/mysql/mysqlConnection";
import { accountDebitCase, dependenciesType } from "@application/useCases/accountDebitCase";
import { ThridPartyApiAdapter } from "@infrastructure/driven/adapters/thirdPartyApi/thirdPartyApi";
import { eventBridgeAdapter } from "@infrastructure/driving/adapters/eventBridge/eventBridgeAdapter";
import { AccountMysqlRepository } from "@infrastructure/driven/repositories/account/accountMysqlRepository";
import { ThirdPartyApiErrorMapper } from '@infrastructure/driven/adapters/thirdPartyApi/thirdPartyErrorMapper/thirdPartyErrorMapper';

mySqlConnection.createPool();

const dependencies: dependenciesType = {
    thirdPartyApi: new ThridPartyApiAdapter(THIRD_PARTY_URL, new ThirdPartyApiErrorMapper()),
    messageQueue: new SqsQueue(QUEUE_URL),
    repository: new AccountMysqlRepository(mySqlConnection)
}

const useCase = new accountDebitCase();

export const handler = async (event: EventBridgeEvent<any,any>) => {

    return await eventBridgeAdapter(useCase)(event as EventBridgeEvent<any,any>,dependencies); 

}