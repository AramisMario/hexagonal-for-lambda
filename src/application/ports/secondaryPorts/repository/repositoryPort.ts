import { Entity } from "@domain/entities/entity"
import { DebitedSuccessful } from "@domain/models/debitedSucess";
import { EntityProps } from "@domain/entities/entity";
export interface RepositoryPort<T = unknown>{
    create(entityProps:EntityProps): Promise<Entity>
    update(data:Entity): Promise<Entity>
    findByID(id: T): Promise<Entity>
    delete(data: Entity): Promise<boolean>
    transaction(account: Entity, transactionType: string, amount: number): Promise<DebitedSuccessful>
}