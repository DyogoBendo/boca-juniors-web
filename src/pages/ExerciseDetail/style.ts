import { Stack, StackProps, styled } from "@mui/material";

export const ExerciseTestCaseContainer = styled(Stack)<StackProps>(({theme}) => ({
    flexDirection: "row",
    justifyContent: "center",
    width: '100%',
    padding: theme.spacing(3),
}))


export const ExerciseTestCaseDataContainer = styled(Stack)<StackProps>(({theme}) => ({
    border: '1px solid #000',
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    width: "100%"
}))

export const ContentContainer = styled(Stack)<StackProps>(({theme}) => ({
    margin: theme.spacing(3),
}))

export const ExerciseContainer = styled(Stack)<StackProps>(({theme}) => ({
    margin: theme.spacing(3),
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '100%'
}))