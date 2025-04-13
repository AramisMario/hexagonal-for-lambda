import { Entity } from "@domain/entities/entity";
export interface repositoryPortUpdate{
    update(data:Entity): Promise<Entity>
}

