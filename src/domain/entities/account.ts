import { z } from "zod";

const Account = z.object({
    status: z.string(),
    avaliableBalance: z.number(),
    accountNumber: z.string()
});

export type Account = z.infer<typeof Account>;

/*
export type EntityProps = {
    state: string;
    firstAttribute: number;
    secondAttribute: number;
    accountNumber: string;
}

export class Entity{

    private state: string;
    private firstAttribute: number;
    private secondAttribute: number;
    private accountNumber: string;

    constructor(props: EntityProps){
        this.accountNumber = props.accountNumber;
        this.firstAttribute = props.firstAttribute;
        this.secondAttribute = props.secondAttribute;
        this.state = props.state;
    }


    // validation and bussiness logic for the entity

    public isAllowed(){
        return this.state !== "LOCKED";
    }

    public getState(){
        return this.state;
    }

    public getFirstAttribute(){
        return this.firstAttribute;
    }

    public getSecondAttribute(){
        return this.secondAttribute;
    }

    public getAccountNumber(){
        return this.accountNumber;
    }


}

*/