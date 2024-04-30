import { Stack, StackProps, TextField, styled } from "@mui/material";

export const FormFieldContainer = styled(Stack)<StackProps>(({theme}) => ({
    marginTop: theme.spacing(1),
    flexDirection: 'row',
    justifyContent: 'space-between'

}))

export const ExerciseGroupTextField = styled(TextField)<StackProps>(({theme}) => ({
    width: '80%'
}))