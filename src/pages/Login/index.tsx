import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
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
      <Box border={1} padding={"16px"} borderRadius={5} p={2}>
        <Typography variant="h5" marginTop={"24px"}>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            name="username"
            label="Nome do usuário - o mesmo usado para o e-mail da unioeste"
            value={formData.username}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="password"
            label="Senha - caso nunca tenha feito login deixa-a em branco"
            type="password"
            multiline
            value={formData.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <Button type="submit" variant="contained" color="primary">
            Entrar
          </Button>
        </form>
      </Box>
    </LoginContainer>
  );
};

export default LoginForm;
