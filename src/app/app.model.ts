import { Type } from "@angular/core";

export interface User{
    id:string;
    name:string;
    email:string;
    image?:string;
    contact?:string;
    role:Role
}

export interface Assessment{
    id:string;
    name:string;
    course:string;
    content:string;
    duration?:number;
    questions?:Question[];
}

export interface Question{
    id:string;
    text:string;
    options:Option[];
}

export interface Option{
    id:string;
    text:string;
    correct:boolean;
    selected:boolean
}

export interface Course{
    id?:string;
    name:string;
    description:string;
    category:string;
    label?:string;
    active:boolean;
    pages?:string[];
    image?:string;
    order:number;
    topics?: string[];
    assessments?:string[];
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
  
export interface Topic{
    id?:string;
    name:string;
    lock:boolean;
    active:boolean;
    type:ContentType;
    pages?: string[];
    url?:string;
    cors?:boolean;
  }

export enum ContentType{
    HTML="HTMl",
    PDF="PDF",
    URL="URL"
}