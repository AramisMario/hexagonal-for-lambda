import { Entity } from "@domain/entities/entity";

export interface FindAccountCasePort{
    exec(account: string, dependencies): Promise<Entity>
}