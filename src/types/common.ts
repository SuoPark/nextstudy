export interface IApi {
  url: string;
  method: "get" | "post" | "put" | "delete";
}
export interface IOptions {
  label: string;
  value: string;
}

export interface IOptionVal {
  label: string;
  value: number;
}

export type IOptionYN = "Y" | "N";

export interface IPaging {
  pageable: {
    pageNumber: number;
    pageSize: number;
    paged: boolean;
  };
  totalElements: number;
  totalPages: number;
}
