import type { Request, Response } from "express";
import { ProblemService } from "../services/ProblemService.js";


const service = new ProblemService()

export class ProblemController {
    async create(req: Request, res: Response) {
        const problem = await service.createProblem(req.body);
        res.status(201).json(problem)
    }

    async uploadContent(req: Request, res: Response) {
        const files = req.files as {
            statement: Express.Multer.File[]
            examples: Express.Multer.File[]
            constraints?: Express.Multer.File[]
        };

        if (!files.statement || !files.examples) {
            return res.status(400).json("statement and example files are required");
        }

        if (!req.params.slug) {
            return res.status(400).json("Slug is required");
        }

        const statementBuffer = files.statement[0]?.buffer;
        const exampleBuffer = files.examples[0]?.buffer;
        const constraintsBuffer = files.constraints?.[0]?.buffer;

        console.log("this is constaraint",constraintsBuffer)

        if (!statementBuffer || !exampleBuffer) {
            return res.status(400).json("Invalid uploaded files");
        }

        const updated = await service.attachContent(req.params.slug, {
            statement: statementBuffer,
            example: exampleBuffer,
            constraints: constraintsBuffer,
        });

        res.json(updated);
    }

    async getBySlug(req: Request, res: Response) {
        if (!req.params.slug) {
            return res.status(400).json("Slug is required")
        }
        const problem = await service.getProblem(req.params.slug);
        res.json(problem);
    }
}

