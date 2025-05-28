import 'module-alias/register';
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { QUEUE_URL, THIRD_PARTY_URL } from "@utils/constants";
import { SqsQueue } from "@infrastructure/driven/adapters/sqsQueue/sqsQueue";
import { accountDebitCase, dependenciesType } from "@application/useCases/accountDebitCase";
import { apigatewayAdapter } from '@infrastructure/driving/adapters/apigateway/apiGatewayAdapter';
import { ThridPartyApiAdapter } from "@infrastructure/driven/adapters/thirdPartyApi/thirdPartyApi";
import { AccountMysqlRepository } from '@infrastructure/driven/repositories/account/repository/accountMysqlRepository';
import { ThirdPartyApiErrorMapper } from '@infrastructure/driven/adapters/thirdPartyApi/thirdPartyErrorMapper/thirdPartyErrorMapper';
import mySqlConnection from "@infrastructure/driven/database/mysqlConnection";


const dependencies: dependenciesType = {
    thirdPartyApi: new ThridPartyApiAdapter(THIRD_PARTY_URL, new ThirdPartyApiErrorMapper()),
    messageQueue: new SqsQueue(QUEUE_URL),
    repository: new AccountMysqlRepository(mySqlConnection)
}

const useCase = new accountDebitCase();

export const handler = async (event:APIGatewayProxyEventV2) => {

    return await apigatewayAdapter(useCase)(event as APIGatewayProxyEventV2,dependencies); 

}