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

export type User={
  name:string;
  email:string;
  pic:string;
  role:string;
  phone:string;
  address:string;
  created:string;
  updated:string;
  courses:UserCourse[];
}

export enum CourseStatus{
  InProgress="INPROGRESS",
  Completed="COMPLETED",
  Failed="FAILED"
}

export class UserCourse{
  id:string;
  subject:string;
  category:string;
  status:string;
  started:string;
  completed:string;
  score:number;
}

export class Course{
  name:string;
  subject:string;
  topics:Topic[];
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


