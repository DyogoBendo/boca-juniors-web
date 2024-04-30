import { Stack, StackProps, styled } from "@mui/material";


export const ExerciseGroupTitleContainer = styled(Stack)<StackProps>(({theme}) => ({
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
}))

export const ExerciseGroupContainer = styled(Stack)<StackProps>(({theme}) => ({
    margin: theme.spacing(3)
}))