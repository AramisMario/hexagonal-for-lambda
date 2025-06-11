import { dependenciesType } from "@useCases/messageCase";
import { DebitedSuccessful } from "@domain/models/debitedSucess";
export interface MessageCasePort{
    sendMessage(message: DebitedSuccessful, dependencies: dependenciesType): Promise<string>
}