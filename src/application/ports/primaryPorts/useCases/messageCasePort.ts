import { DebitedSuccessful } from "@domain/models/debitedSucess";
import { dependenciesType } from "@useCases/messageCase";
export interface MessageCasePort{
    sendMessage(message: DebitedSuccessful, dependencies: dependenciesType): Promise<string>
}