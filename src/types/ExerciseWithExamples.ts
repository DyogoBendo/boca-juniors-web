import { Example } from "./Example";

export interface ExerciseWithExamples{
    id: number;
    title: string;
    description: string;
    tag: string;
    difficulty: string;
    examples: Example[];
}