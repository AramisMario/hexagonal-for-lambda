import { Entity } from "@domain/entities/entity";
import { DebitedSuccessful } from "@domain/models/debitedSucess";
export class MyEntityMapper{

    mapToRepository(entity: Entity){
        return{
            first: entity.getFirstAttribute(),
            second: entity.getSecondAttribute(),
            state: entity.getState(),
            accountNumber: entity.getAccountNumber()
        }
    }

    mapToEntity(record: any): Entity{
        const props = {
            firstAttribute: record.first,
            secondAttribute: record.second,
            state: record.state,
            accountNumber: record.accountNumber
        };

        return new Entity(props);
    }

    mapToModel(record: any): DebitedSuccessful{
        return {
            debitedAmount: record.debitedAmount,
            cost: record.cost,
        }
    }

}