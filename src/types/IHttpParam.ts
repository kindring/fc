export enum paramSource {
    query = "query",
    body = "body"
}
export interface IHttpParam {
    type?: any,
    key: string,
    required?: boolean,
    default?: any,
    source: paramSource
}
