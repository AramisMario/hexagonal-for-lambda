import { Account, AccountStatusSchema, AllowedStatusSchema } from "@domain/models/account";
import { DebitAccount } from "@models/debitAccount";
import { MessageCase } from "@useCases/messageCase";
import { DebitedSuccessful } from "@models/debitedSucess";
import { FindAccountCase } from "@useCases/findAccountCase";
import { TransactionCase } from "@useCases/transactionCase";
import { ThirdPartyApiCase } from "@useCases/thirdParyApiCase";
import { AccountRepository } from "@domain/repository/accountRepository";
import { QueuePort } from "@application/ports/secondaryPorts/queue/queuePort";
import { AccountDebitPort } from "@application/ports/primaryPorts/useCases/accountDebitPort";
import { FindAccountCasePort } from "@application/ports/primaryPorts/useCases/findAccountCasePort";
import { EntityPreconditionFailed } from "@domain/domainErrors/entityErrors/entityPreconditionFail";
import { ThirdPartyApiPort } from "@application/ports/secondaryPorts/thirdPartyApi/thirdPartyApiPort";

export type dependenciesType = {
    thirdPartyApi: ThirdPartyApiPort,
    messageQueue: QueuePort,
    repository: AccountRepository,
};

export class accountDebitCase implements AccountDebitPort{

    async exec(data: DebitAccount, dependencies: dependenciesType){
        const { thirdPartyApi, messageQueue, repository } = dependencies;

        try{

            const findAccount:FindAccountCasePort = new FindAccountCase();

            let account: Account;
            try{
                account = await findAccount.exec(data.account, {repository});
            }catch(error){
                // log the error here and handle the error
                throw error;
            }

            if(!AllowedStatusSchema.safeParse(account.status)){
                throw new EntityPreconditionFailed();
            }

            let transactionResult: DebitedSuccessful;
            try{
                const transactionCase = new TransactionCase();
                transactionResult = await transactionCase.exec({account, amount: data.amount},{repository});
            }catch(error){
                // log the error here and handle the error
                throw error;
            }

            try{
                const thirparyApiCase = new ThirdPartyApiCase();
                thirparyApiCase.exec(transactionResult, {thirdPartyApi});
            }catch(error){
                // log the error here and handle the error
                throw error;
            }

            try{
                const messageCase = new MessageCase();
                messageCase.sendMessage(transactionResult,{messageQueue});
            }catch(error){
                // log the error here and handle the error
                throw error;
            }

            return transactionResult;

        }catch(error){
            // some logic needed to handle de error or using a logger
            throw error;
        }
    }
}