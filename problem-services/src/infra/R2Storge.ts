import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";


export class R2Storage {
    private client: S3Client;
    constructor() {
        this.client = new S3Client({
            region: 'auto',
            endpoint: `https://${process.env.ENDPOINT!}.r2.cloudflarestorage.com`,
            credentials: {
                accessKeyId: process.env.ACCESS_KEY!,
                secretAccessKey: process.env.SECRET_KEY!,
            },
        })
    }

    async uploadProblemContent(
        slug:string,
        files:{
            statement:Buffer;
            example:Buffer;
            constraints?:Buffer|undefined;
        }
    ):Promise<string>{
        console.log(process.env.ACCESS_KEY,process.env.SECRET_KEY,process.env.BUCKET)
        const basePath = `problem/${slug}/v1`

        await this.put(`${basePath}/statement.md`, files.statement);
        if (files?.example){
            await this.put(`${basePath}/example.md`, files.example);
        }
        if (files?.constraints){
            await this.put(`${basePath}/contraints.md`, files.constraints);
        }
        return basePath;
    }

    private async put(key:string,body:Buffer){
        await this.client.send(
            new PutObjectCommand({
                Bucket:process.env.BUCKET!,
                Key:key,
                Body:body,
                ContentType:"text/plain"
            })
        )
    }

    async getStatement(key:string){
        const cmd = new GetObjectCommand({
            Bucket:process.env.BUCKET!,
            Key:key
        })
        const res = await this.client.send(cmd)
        return res.Body
    }

}