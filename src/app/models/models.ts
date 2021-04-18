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
}
