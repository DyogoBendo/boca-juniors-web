import { Exercise } from "./Exercise";

export interface Submission{
    id: number;
    exercise: Exercise;
    username: string;
    sourceCode: string;
    accepted: boolean;
}