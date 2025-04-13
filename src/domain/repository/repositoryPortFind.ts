import { Entity } from "@domain/entities/entity";
export interface RepositoryPortFind<T = unknown>{
    findByID(id: T): Promise<Entity>
}
