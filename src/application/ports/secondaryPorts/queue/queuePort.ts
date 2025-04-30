import { DebitedSuccessful } from "@domain/models/debitedSucess";

export interface QueuePort{
    sendQueueMessage(data: DebitedSuccessful): Promise<string>
}