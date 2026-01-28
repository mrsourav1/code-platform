import { SubmissionRepo } from "../repositories/submissionRepository.js";

export class SubmissionService{
    private repo = new SubmissionRepo();
    async submit(data:{
        problemId:string;
        language:string;
        sourceCode:string
    }){
        const submission = await this.repo.create(data);

        // await pro
        return submission
    }

    async getById(id:string){
        return this.repo.findById(id)
    }
}