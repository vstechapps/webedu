export type Menu={
  name:string;
  click:string;
  route:string;
  icon:string;
}

export class User{
  id:string;
  name:string;
  email:string;
  pic:string;
  role:string;
  phone:string;
  address:string;
  created:string;
  updated:string;
}

export class UserCourse{
  id?:string;
  user:string;
  course:string;
  status:string;
  started:string;
  completed?:string;
  score?:number;
  topic:number;
}

export class Course{
  id?:string;
  name:string;
  subject:string;
  duration:string;
  topics:Topic[];
  quiz?:Quiz;
}

export class Topic{
  name:string;
  type:string;
  content:string;
  url:string;
  order:number;
}

export class CourseSubject{
  id?:string;
  name:string;
}

export class Quiz{
  course:string;
  questions:Question[];
}

export class Question{
  text:string;
  options:Option[];
}

export class Option{
  text:string;
  correct:boolean;
}

export enum CourseStatus{
  InProgress="INPROGRESS",
  Completed="COMPLETED",
  Failed="FAILED"
}

export enum ContentType{
  HTML="HTML",
  PDF="PDF",
  VIDEO="VIDEO",
  DOCUMENT="DOCUMENT"
}

export enum Role{
  USER="USER",
  ADMIN="ADMIN"
}
