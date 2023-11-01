export interface User{
    id:string,
    name:string,
    email:string,
    image?:string,
    contact?:string,
    role:Role
}

export interface Assessment{
    id:string,
    name:string,
    course:string,
    duration:number,
    questions:Question[],
}

export interface Question{
    id:string,
    question:string,
    options:Option[];
}

export interface Option{
    id:string,
    correct:boolean,
    selected:boolean
}

export interface Course{
    id?:string,
    name:string,
    description:string,
    category:string,
    image:string,
    route?:string,
    active:boolean,
    pages?: string[];
    assessments?:Assessment[];
}

export interface Category{
    id?:string;
    name:string;
    parent?:string;
    courses?:Course[];
    categories?:Category[];
    active?:boolean;
}

export enum Role{
    USER="USER",
    CLIENT="CLIENT",
    ADMIN="ADMIN"
}