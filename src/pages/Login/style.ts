import { Container, ContainerProps, Stack, StackProps, styled } from "@mui/material";

export const LoginContainer = styled(Container)<ContainerProps>(({theme}) => ({        
    height: "100vh",     
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",    
}))

