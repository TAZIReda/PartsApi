import { Part } from "src/parts/model/part.interface";

export interface User {
    id?: number;
    name?: string;
    email?: string;
    password?: string;
    address?: string;
    entreprise?: string;
    phone?: number;
    role?: UserRole;
    parts?: Part[];
}

export enum UserRole{
    ADMIN = "admin",
    USER= "user"
}