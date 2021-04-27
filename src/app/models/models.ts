export type Menu={
  name:string;
  click:string;
  route:string;
  icon:string;
}

export enum Role{
  user="USER",
  admin="ADMIN"
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

export enum CourseStatus{
  InProgress="INPROGRESS",
  Completed="COMPLETED",
  Failed="FAILED"
}

export class UserCourse{
  user:string;
  course:string;
  subject:string;
  category:string;
  status:string;
  started:string;
  completed:string;
  score:number;
  duration:number;
}

export class Course{
  id?:string;
  name:string;
  subject:string;
  topics?:Topic[];
  quiz?:Quiz;
}

export class Topic{
  name:string;
  pages:Page[];
}

export class Page{
  heading:string;
  content:string;
  number:number;
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
