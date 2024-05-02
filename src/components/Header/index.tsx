import { AppBar, Box, Icon, Stack, Toolbar, Typography } from "@mui/material"
import { StyledLink, StyledToolbar } from "./style"
import LogoutIcon from '@mui/icons-material/Logout';
import { useUser } from "../../context/auth";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
    const {user, setUser} = useUser()
    const navigate = useNavigate(); 

    const handleLogout = () => {
        setUser(null)
        navigate('/')
    }

    return(
    <AppBar position="static" color="inherit">
      <StyledToolbar>
        <Typography variant="h6">
          Boca Juniors
        </Typography>
        <Stack flexDirection={"row"}>
            <StyledLink to="/exercise-group">
                <Typography variant="body1" >Listas</Typography>
            </StyledLink>
            <StyledLink to="/exercise" >
                <Typography variant="body1" >Exercícios</Typography>
            </StyledLink>   
            <StyledLink to="/submission" >
                <Typography variant="body1" >Submissões</Typography>
            </StyledLink>        
            <Icon onClick={handleLogout} sx={{cursor: "pointer"}}>
                <LogoutIcon/>
            </Icon>
        </Stack>
      </StyledToolbar>
    </AppBar>
    )
}

export default Header