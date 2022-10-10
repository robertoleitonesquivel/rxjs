export interface UDFs {
  TableId?:string;
  Description:string
  Name: string;
  Type: string;
  Select: boolean;
  Typehead: boolean;
  Required: boolean;
  MappedValues: [],
  value?: any;
}

export interface UDFsTarget{
  Name:string;
  value:any;
}
