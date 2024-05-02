import { Container, ContainerProps, Stack, StackProps, styled } from "@mui/material";

export const LoginContainer = styled(Container)<ContainerProps>(({theme}) => ({        
    width: "35%",
    marginTop: theme.spacing(30),
}))