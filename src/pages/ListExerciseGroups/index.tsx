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
import { Button, Container, Icon, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useUser } from "../../context/auth";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

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
        const tmp = user !== "admin" ? data.filter((exerciseGroup: { open: boolean; }) => exerciseGroup.open) : data
        setExerciseGroups(tmp);
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
                  {user === "admin" && (<TableCell align="right">Aberto</TableCell>)}                  
                  <TableCell align="center">Visualizar</TableCell>
                  {user === "admin" && (<TableCell align="center">Editar</TableCell>)}                  
                </TableRow>
              </TableHead>
              <TableBody>
                {exerciseGroups.map((exerciseGroup) => (
                  <TableRow
                    key={exerciseGroup.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}                    
                  >
                    <TableCell component="th" scope="row">
                      {exerciseGroup.name}
                    </TableCell>
                    {user === "admin" && (
                      <TableCell align="right">
                      {exerciseGroup.open ? (
                        <CheckBoxIcon />
                      ) : (
                        <CheckBoxOutlineBlankIcon />
                      )}
                    </TableCell>
                    )}
                    <TableCell align="center" component="th" scope="row" component={Link}
                        to={`/exercise-group/${exerciseGroup.id}`}>
                          <Icon><VisibilityIcon /></Icon>
                        </TableCell>
                        {user === "admin" && (<TableCell align="center" component={Link}
                        to={`/exercise-group/edit/${exerciseGroup.id}`}><Icon><EditIcon /></Icon></TableCell>)}
                  
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
