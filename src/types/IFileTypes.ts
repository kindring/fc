export enum fileType {
    dir,
    file,
}
export interface FsFile {
    path: string,
    name: string,
    type: fileType,
    cloudMatch: boolean
}
