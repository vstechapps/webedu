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
  id:string;
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


