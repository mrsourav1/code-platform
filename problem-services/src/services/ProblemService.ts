import { R2Storage } from "../infra/R2Storge.js";
import { ProblemRepository } from "../repositories/ProblemRepository.js";

export class ProblemService {
    private repo = new ProblemRepository();
    private storage = new R2Storage();

    async createProblem(body: any) {
        const { slug, title, difficulty } = body;

        const exists = await this.repo.findBySlug(slug);

        if (exists) {
            throw new Error("Problem already Exist");
        }
        return this.repo.create({
            slug,
            difficulty,
            title
        })
    }

    async attachContent(
        slug: string,
        files: {
            statement: Buffer;
            example: Buffer;
            constraints?: Buffer | undefined;
        }
    ) {
        console.log("this is file",files)
        const contentPath = await this.storage.uploadProblemContent(slug,files)
        return this.repo.updateContent(slug, {
            statementUrl: `${contentPath}/statement.md`,
            exampleUrl: `${contentPath}/example.md`,
            constraintsUrl: `${contentPath}/constraints.md`,
        });
    }

    async getProblem(slug: string) {
        return this.repo.findBySlug(slug);
    }

}