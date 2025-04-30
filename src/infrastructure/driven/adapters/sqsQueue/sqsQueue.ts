
import { QueuePort } from "@application/ports/secondaryPorts/queue/queuePort";
import { UnexpectedError } from "@domainErrors/generalErrors/unexpectedError";
import { SQS, SendMessageCommandInput } from "@aws-sdk/client-sqs";
import { DebitedSuccessful } from "@domain/models/debitedSucess";
const AWS = require("aws-sdk");

export class SqsQueue implements QueuePort{
    private queueUrl: string;
    private SQS: SQS;
    constructor(queueUrl: string){
        this.queueUrl = queueUrl;
        this.SQS = new AWS.SQS({ apiVersion: "2012-11-05" });
    }

    async sendQueueMessage(data: DebitedSuccessful){
        try{
            const params = {
                
            } as SendMessageCommandInput

            return (await this.SQS.sendMessage(params)).MessageId;
        }catch(error){
            throw new UnexpectedError();
        }
        
    }

}