export enum fileType {
    dir,
    file,
    notRead
}
export interface FsFile {
    path: string,
    name: string,
    type: fileType,
    cloudMatch: boolean,
    loadInfo?: boolean,
    errTips?: string
}
