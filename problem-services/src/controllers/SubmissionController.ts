import type { Request, Response } from "express";
import { SubmissionService } from "../services/SubmissionService.js";


export class SubmissionController{
    private service = new SubmissionService();
    
    async submit(req:Request,res:Response){
        const { problemId,language,sourceCode } = req.body;

        if(!problemId || !language || !sourceCode){
            return res.status(400).json("Something is missing")
        }

        const submission = await this.service.submit({problemId,language,sourceCode})
        res.json({
            submission:submission.id,
            status:submission.status
        })

        // const submission = await 
    }

    async getStatus(req:Request,res:Response){
        let submission
        if(req.params.id){
             submission = await this.service.getById(req.params.id);
        }
        if(!submission){
            return res.status(404).json("Submission not found");
        }
        res.json(submission)
    }
}