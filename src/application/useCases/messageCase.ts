import { MessageCasePort } from "@primaryPorts/useCases/messageCasePort";
import { QueuePort } from "@application/ports/secondaryPorts/queue/queuePort";
import { DebitedSuccessful } from "@domain/models/debitedSucess";
export type dependenciesType = {
    messageQueue: QueuePort,
}

export class MessageCase implements MessageCasePort{
    async sendMessage(message: DebitedSuccessful, dependencies: dependenciesType): Promise<string> {

        const { messageQueue } = dependencies;
        try{
            return await messageQueue.sendQueueMessage(message);
        }catch(error){
            // handle and log the error
            throw error;
        }
        
    }
}