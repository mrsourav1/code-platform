import { prisma } from "../lib/prisma.js";

export class SubmissionRepo{
    async create(data:{
        problemId:string;
        language:string;
        sourceCode:string;
    }){
        return prisma.submission.create({
            data:{
                ...data,
                status:"PENDING"
            }
        })
    }

    async findById(id:string){
        return prisma.submission.findUnique({
            where:{id}
        })
    }

    async updateStatus(id:string,
        data:{
            status:string;
            runtime?:number;
            memory?:number;
        }
    ){
        return prisma.submission.update({
            where:{id},
            data
        })
    }
}