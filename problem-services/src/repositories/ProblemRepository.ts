import { prisma } from "../lib/prisma.js";

export class ProblemRepository{
    create(problem:{
        slug:string;
        title:string;
        difficulty:'EASY' | 'MEDIUM' | 'HARD';
    }){
        return prisma.problem.create({
            data:problem
        })
    }

    findBySlug(slug:string){
        return prisma.problem.findUnique({where:{slug}})
    }

    updateContent(
        slug:string,
        data:{
            statementUrl:string,
            exampleUrl?:string,
            constraintsUrl?:string
        }
    ){
        return prisma.problem.update({
            where:{slug},
            data
        })
    }
}