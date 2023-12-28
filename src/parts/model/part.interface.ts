import { User } from "src/users/model/user.interface";

export interface Part {
    id?: number;
    name?: string;
    description?: string;
    state?: PartState;
    reference?: string ;
    quantity?: number;
    price?: number;
    imgUrl?: string;
    user?: User;
}

export enum PartState {
    NEW='new',
    USED='used'
}