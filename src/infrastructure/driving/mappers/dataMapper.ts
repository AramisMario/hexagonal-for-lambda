import { CaseData } from "@models/caseData";
import { RequestDTO } from "@dtos/RequestDTO";
export class CaseDataMapper{

    static mapCaseData(requestData:RequestDTO):CaseData{
        return {
            amount: requestData.amount,
            account: requestData.account
        }
    }

}