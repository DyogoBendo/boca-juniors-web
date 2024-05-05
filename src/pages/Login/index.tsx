import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Container, Box, Stack } from "@mui/material";
import bocaJuniorsAPI from "../../shared/boca-juniors-api";
import { LoginContainer } from "./style";
import { useUser } from "../../context/auth";
import { Navigate, useNavigate } from "react-router-dom";
const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate(); 
  const {user, setUser} = useUser()

  const formStyle = {
    height: "100%"
  }

  useEffect(() => {
    // Save the current body background color
    const originalBackgroundColor = document.body.style.backgroundColor;

    // Set the new background color
    document.body.style.backgroundColor = "#e0e0e0";

    // Clean up the effect by resetting the body background color
    return () => {
      document.body.style.backgroundColor = originalBackgroundColor;
    };
  }, []); // Run only once when the component mounts

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form Data:", formData);
    try{
        const response = await bocaJuniorsAPI.post("/user/login", formData);
        setUser(formData.username)
        if(response.data.password) alert(`ATENÇÃO! Essa é a sua senha: ${response.data.password}\nAnote-a para realizar login futuramente`)
        navigate("/exercise-group/")
    } catch{
        alert("Usuário ou senha incorretos")
    }    
  };

  return (
    <LoginContainer>      
      <Stack bgcolor={"white"}  border={1} borderRadius={5} p={2} boxShadow={"0px 0px 10px 0px rgba(0,0,0,0.1)"}>
        <form style={formStyle}  onSubmit={handleSubmit} >
          <Stack height={"100%"} justifyContent={"space-between"}>
            <Stack alignSelf={"flex-start"}>
            <Typography color={"#1a5191"} variant="h5" marginTop={"24px"} align="center">
              LOGIN
            </Typography>
            <Box padding={"16px"}>
              <Box marginBottom={"16px"}>
                <Typography variant="body2">
                  
                </Typography>        
                <Typography variant="body2">
                     
                </Typography>        
              </Box>
              <Typography variant="body2">      
              </Typography>
            </Box>
            <TextField
              name="username"
              label="Nome do usuário"
              value={formData.username}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputProps={{"color": "info"}}           
              helperText="Exemplo: 'João da Silva Santos' utilize 'joao.santos'."
            />
            <TextField
              name="password"
              label="Senha"
              type="password"
              multiline
              value={formData.password}
              onChange={handleChange}
              fullWidth
              margin="normal"              
              helperText="Caso seja seu primeiro login, não é necessário informar nenhuma senha."
            />
            </Stack>

            <Box width={"100%"} alignSelf={"flex-end"} marginTop={"48px"}>
              <Button type="submit" variant="contained" style={{ backgroundColor: '#f3be45', color: 'white' }} fullWidth>
                Entrar
              </Button>
            </Box>
          </Stack>
        </form>
      </Stack>
    </LoginContainer>
  );
};

export default LoginForm;
