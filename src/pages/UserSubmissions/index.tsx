import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import bocaJuniorsAPI from "../../shared/boca-juniors-api";
import { Exercise } from "../../types/Exercise";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Container, Icon, Stack, Typography } from "@mui/material";
import Header from "../../components/Header";
import { useUser } from "../../context/auth";
import { Submission } from "../../types/Submission";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

export default function UserSubmission() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const { username, exerciseId } = useParams();

  const listSubmissions = async () => {
    const params = {
      username: username,
      exerciseId: exerciseId
    }
    const response = await bocaJuniorsAPI.get("/submission", {
      params: params
    });
  
    return response.data;
  }

  useEffect(() => {
    listSubmissions().then((submissions) => setSubmissions(submissions));
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
                <TableCell>Exercício</TableCell>
                <TableCell align="center">Resultado</TableCell>                
                <TableCell align="right">Usuário</TableCell>                
              </TableRow>
            </TableHead>
            <TableBody>
              {submissions.map((submission) => (
                <TableRow
                  key={submission.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  component={Link}
                  to={`/submission/${submission.id}`}
                >
                  <TableCell component="th" scope="row">
                    {submission.exercise.title}
                  </TableCell>                
                  <TableCell align="center" component="th" scope="row">
                    <Typography>
                    {submission.status}
                    </Typography>
                  </TableCell>
                  <TableCell component="th" scope="row" align="right">
                    {username}
                  </TableCell>   
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Container>
    </>
  );
}
