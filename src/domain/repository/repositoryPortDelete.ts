import { Entity } from "@domain/entities/entity"
export interface RepositoryPortDelete{
    delete(data: Entity): Promise<boolean>
}

