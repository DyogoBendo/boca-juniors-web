import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import bocaJuniorsAPI from "../../shared/boca-juniors-api";
import { ExerciseGroup } from "../../types/ExerciseGroup";
import { Link } from "react-router-dom";
import { Button, Container, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useUser } from "../../context/auth";

async function fetchData() {
  const response = await bocaJuniorsAPI.get("/exercise-group");

  return response.data;
}

export default function ExerciseGroupTable() {
  const [exerciseGroups, setExerciseGroups] = useState<ExerciseGroup[]>([]);
  const {user, setUser} = useUser()

  useEffect(() => {
    const fetchDataAndSetData = async () => {
      console.log("trying to fetch data...");
      try {
        const data = await fetchData(); // Fetch data
        setExerciseGroups(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataAndSetData();
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
                  <TableCell>Nome</TableCell>
                  <TableCell align="right">Aberto</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {exerciseGroups.map((exerciseGroup) => (
                  <TableRow
                    key={exerciseGroup.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    component={Link}
                    to={`/exercise-group/${exerciseGroup.id}`}
                  >
                    <TableCell component="th" scope="row">
                      {exerciseGroup.name}
                    </TableCell>
                    <TableCell align="right">
                      {exerciseGroup.open ? (
                        <CheckBoxIcon />
                      ) : (
                        <CheckBoxOutlineBlankIcon />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {
            user === "admin" ? 
            <Link to={"/exercise-group/create"}>
              <Button variant="contained" color="primary">
                Adicionar Grupo de Exercícios
              </Button>
            </Link> : <></>
          }
        </Stack>
      </Container>
    </>
  );
}
