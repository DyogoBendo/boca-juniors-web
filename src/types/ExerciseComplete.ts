import { Example } from "./Example";
import { TestCase } from "./TestCase";

export interface ExerciseComplete{
    id: number;
    title: string;
    description: string;
    tag: string;
    difficulty: string;
    sourceCode: string;
    testCases: TestCase[];
}