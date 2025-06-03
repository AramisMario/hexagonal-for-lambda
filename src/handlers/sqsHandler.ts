import { QUEUE_URL, THIRD_PARTY_URL } from "@utils/constants";
import { SqsQueue } from "@infrastructure/driven/adapters/sqsQueue/sqsQueue";
import { sqsAdapter } from "@infrastructure/driving/adapters/sqs/sqsAdapter";
import mySqlConnection from "@infrastructure/driven/database/mysql/mysqlConnection";
import { APIGatewayProxyEventV2, EventBridgeEvent, SQSEvent } from "aws-lambda";
import { accountDebitCase, dependenciesType } from "@application/useCases/accountDebitCase";
import { ThridPartyApiAdapter } from "@infrastructure/driven/adapters/thirdPartyApi/thirdPartyApi";
import { AccountMysqlRepository } from "@infrastructure/driven/repositories/account/accountMysqlRepository";
import { ThirdPartyApiErrorMapper } from '@infrastructure/driven/adapters/thirdPartyApi/thirdPartyErrorMapper/thirdPartyErrorMapper';

const dependencies: dependenciesType = {
    thirdPartyApi: new ThridPartyApiAdapter(THIRD_PARTY_URL, new ThirdPartyApiErrorMapper()),
    messageQueue: new SqsQueue(QUEUE_URL),
    repository: new AccountMysqlRepository(mySqlConnection)
}

const useCase = new accountDebitCase();

export const handler = async (event:APIGatewayProxyEventV2 | EventBridgeEvent<any,any> | SQSEvent) => {

    return await sqsAdapter(useCase)(event as SQSEvent,dependencies); 

}