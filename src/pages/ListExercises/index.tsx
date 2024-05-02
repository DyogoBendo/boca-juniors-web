import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import bocaJuniorsAPI from "../../shared/boca-juniors-api";
import { Exercise } from "../../types/Exercise";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Container, Stack } from "@mui/material";
import Header from "../../components/Header";
import { useUser } from "../../context/auth";

async function listExercise() {
  const response = await bocaJuniorsAPI.get("/exercise");

  return response.data;
}
export default function ExerciseTable() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const {user, setUser} = useUser()

  useEffect(() => {
    listExercise().then((exercises) => setExercises(exercises));
  }, []);

  return (
    <>
    <Header/>
    <Container>
      <Stack alignItems={"center"}>
        <TableContainer
          component={Paper}
          style={{ marginTop: "24px", marginBottom: "24px" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Título</TableCell>
                <TableCell align="center">Tag</TableCell>
                <TableCell align="right">Dificuldade</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {exercises.map((exercise) => (
                <TableRow
                  key={exercise.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  component={Link}
                  to={`/exercise/${exercise.id}`}
                >
                  <TableCell component="th" scope="row">
                    {exercise.title}
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    {exercise.tag}
                  </TableCell>
                  <TableCell align="right" component="th" scope="row">
                    {exercise.difficulty}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {
          user === "admin" ?
          (<Link to={"/exercise/create"}>
            <Button variant="contained" color="primary">
              Adicionar Exercícios
            </Button>
          </Link>) : <></>
        }
      </Stack>
    </Container>
    </>
  );
}
