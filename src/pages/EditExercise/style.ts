import styled from "@emotion/styled";
import { TextField, TextFieldProps } from "@mui/material";

export const TestCaseTextField = styled(TextField)<TextFieldProps>(({theme}) => ({    
    marginBottom: "8px",
    width: "100%"
}))
