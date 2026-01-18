export interface ContentStorage{
    uploadProblemStatement(
        slug:string,
        files:{
            statement:Buffer;
            example?:Buffer;
            constraints?:Buffer;
        }
    ):Promise<string>;
}