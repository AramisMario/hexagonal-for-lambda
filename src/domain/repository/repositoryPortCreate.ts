import { Entity } from "@domain/entities/entity"
import { EntityProps } from "@domain/entities/entity";
export interface RepositoryPortCreate{
    create(entityProps:EntityProps): Promise<Entity>

}