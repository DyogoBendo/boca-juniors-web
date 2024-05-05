import { Exercise } from "./Exercise";

export enum SubmissionStatus {
    AC = "AC",
    WA = "WA",
    COMPILATION_ERROR = "COMPILATION_ERROR",
    TLE = "TLE",
    MLE = "MLE",
    SLE = "SLE",
    RE = "RE",
    SG = "SG",
    XX = "XX",
    WTF = "WTF",
    IQ = "IQ"
}

export interface Submission{
    id: number;
    exercise: Exercise;
    username: string;
    sourceCode: string;
    status: SubmissionStatus;
}

export function getStatusDescription(status: SubmissionStatus): string {
    console.log("status", status)
    console.log(typeof(status))
    switch (status) {
        case SubmissionStatus.AC:
            return "Aceito";
        case SubmissionStatus.WA:
            return "Incorreto";
        case SubmissionStatus.COMPILATION_ERROR:
            return "Erro de Compilação";
        case SubmissionStatus.TLE:
            return "Tempo Limite Excedido";
        case SubmissionStatus.MLE:
            return "Memória Limite Excedida";
        case SubmissionStatus.SLE:
            return "Tamanho Limite Excedido";
        case SubmissionStatus.RE:
            return "Erro de Execução";
        case SubmissionStatus.SG:
            return "Programa Sinalizado para Finalizar";
        case SubmissionStatus.XX:
            return "Erro Interno";
        case SubmissionStatus.WTF:
            return "Não Implementado";
        case SubmissionStatus.IQ:
            return "Na fila";
        default:
            return "";
    }
}
