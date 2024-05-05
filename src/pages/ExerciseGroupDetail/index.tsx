import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import bocaJuniorsAPI from "../../shared/boca-juniors-api";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { ExerciseGroupWithExercises } from "../../types/ExerciseGroupWithExercises";
import {
  Box,
  Container,
  Icon,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { ExerciseGroupContainer, ExerciseGroupTitleContainer } from "./style";
import Header from "../../components/Header";
import { useUser } from "../../context/auth";
import { UsersSubmissionsFromExerciseGroup } from "../../types/UserExerciseStatus";

export default function ExerciseGroupDetail() {
  const { id } = useParams();
  const { user, setUser } = useUser();
  const [exerciseGroup, setExerciseGroup] =
    useState<ExerciseGroupWithExercises>();

  const [
    usersSubmissionsFromExerciseGroup,
    setUsersSubmissionsFromExerciseGroup,
  ] = useState<UsersSubmissionsFromExerciseGroup>();

  useEffect(() => {
    async function fetchExerciseGroup() {
      try {
        const response = await bocaJuniorsAPI.get(`/exercise-group/${id}`);
        setExerciseGroup(response.data);
      } catch (error) {
        console.error("Error fetching exercise Group:", error);
      }
    }
    async function fetchExerciseGroupSubmissions() {
      try {
        const response = await bocaJuniorsAPI.get(
          `/exercise-group/${id}/users-submissions`
        );
        setUsersSubmissionsFromExerciseGroup(response.data);
      } catch (error) {
        console.error("Error fetching exercise Group submissions  :", error);
      }
    }

    if (id) {
      fetchExerciseGroup();
      fetchExerciseGroupSubmissions();
    }
  }, [id]);

  return (
    <>
      <Header />
      <Container>
        <ExerciseGroupContainer>
          {exerciseGroup && (
            <Box>
              <ExerciseGroupTitleContainer>
                <Typography variant="h4" gutterBottom>
                  {exerciseGroup.name}
                </Typography>
              </ExerciseGroupTitleContainer>

              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Título</TableCell>
                      <TableCell align="center">Tag</TableCell>
                      <TableCell align="center">Dificuldade</TableCell>
                      <TableCell align="center">Visualizar</TableCell>
                      {user === "admin" && (<TableCell align="center">Editar</TableCell>)}                      
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {exerciseGroup.exerciseList.map((exercise) => (
                      <TableRow
                        key={exercise.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}                        
                      >
                        <TableCell component="th" scope="row">
                          {`${exercise.id}-${exercise.title}`}
                        </TableCell>
                        <TableCell align="center" component="th" scope="row">
                          {exercise.tag}
                        </TableCell>
                        <TableCell align="center" component="th" scope="row">
                          {exercise.difficulty}
                        </TableCell>
                        <TableCell align="center" component="th" scope="row" component={Link}
                        to={`/exercise/${exercise.id}`}>
                          <Icon><VisibilityIcon /></Icon>
                        </TableCell>
                        {user === "admin" && (<TableCell align="center" component={Link}
                        to={`/exercise/edit/${exercise.id}`}><Icon><EditIcon /></Icon></TableCell>)}                        
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              {user === "admin" && (
                <Stack marginTop={"36px"} >
                  <Typography variant="h5" align="center">
                    Resultados
                  </Typography>                                    
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell></TableCell>
                          {usersSubmissionsFromExerciseGroup?.exerciseList.map(
                            (exercise) => (
                              <TableCell
                                key={exercise.id}
                              >{`${exercise.id}-${exercise.title}`}</TableCell>
                            )
                          )}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {usersSubmissionsFromExerciseGroup?.usernameList.map(
                          (username) => (
                            <TableRow
                              key={username}
                              sx={{
                                "&:last-child td, &:last-child th": { border: 0 },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {username}
                              </TableCell>
                              {usersSubmissionsFromExerciseGroup?.exerciseList.map(
                                (exercise) => (
                                  <TableCell scope="row"
                                    component={Link}
                                    to={usersSubmissionsFromExerciseGroup.userExerciseStatus[`${username},${exercise.id}`] === undefined ? "": `/submission/user/${username}/exercise/${exercise.id}` 
                                    }
                                  >
                                    {usersSubmissionsFromExerciseGroup.userExerciseStatus[`${username},${exercise.id}`] === undefined ? "": 
                                      usersSubmissionsFromExerciseGroup.userExerciseStatus[`${username},${exercise.id}`] ? <CheckIcon /> : <ClearIcon /> 
                                    }
                                  </TableCell>
                                )
                              )}
                            </TableRow>
                          )
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Stack>

              )}
            </Box>
          )}
        </ExerciseGroupContainer>
      </Container>
    </>
  );
}
