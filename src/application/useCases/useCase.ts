import { CaseData } from "@models/caseData";
import { QueuePort } from "@application/ports/secondaryPorts/queue/queuePort";
import { DebitedSuccessful } from "@models/debitedSucess";
import { ThirdPartyApiPort } from "@secondaryPorts/thirdPartyApi/thirdPartyApiPort";
import { EntityPreconditionFailed } from "@domainErrors/entityErrors/entityPreconditionFail";
import { UseCasePort } from "@primaryPorts/useCases/useCasePort";
import { FindAccountCasePort } from "@primaryPorts/useCases/findAccountCasePort";
import { FindAccountCase } from "@useCases/findAccountCase";
import { TransactionCase } from "@useCases/transactionCase";
import { MessageCase } from "@useCases/messageCase";
import { ThirdPartyApiCase } from "@useCases/thirdParyApiCase";
import { RepositoryPort } from "@application/ports/secondaryPorts/repository/repositoryPort";
import { Entity } from "@domain/entities/entity";

export type dependenciesType = {
    thirdPartyApi: ThirdPartyApiPort,
    messageQueue: QueuePort,
    repository: RepositoryPort
};

export class UseCase implements UseCasePort{

    async exec(data: CaseData, dependencies: dependenciesType){
        const { thirdPartyApi, messageQueue, repository } = dependencies;

        try{

            const findAccount:FindAccountCasePort = new FindAccountCase();

            let account: Entity;
            try{
                account = await findAccount.exec(data.account, {repository});
            }catch(error){
                // log the error here and handle the error
                throw error;
            }

            if(!account.isAllowed()){
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