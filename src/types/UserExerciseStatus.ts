import { Exercise } from "./Exercise"

interface UserExerciseStatus {
    [userId_exerciseId: string]: boolean;
}

export interface UsersSubmissionsFromExerciseGroup{
    usernameList: string[]
    exerciseList: Exercise[]
    userExerciseStatus: UserExerciseStatus;
}