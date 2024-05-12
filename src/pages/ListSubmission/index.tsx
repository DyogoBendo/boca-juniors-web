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
import { Button, Container, Icon, Stack, Typography } from "@mui/material";
import Header from "../../components/Header";
import { useUser } from "../../context/auth";
import { Submission, SubmissionStatus, getStatusDescription, getSubmissionColor } from "../../types/Submission";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

export default function SubmissionTable() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const {user, setUser} = useUser()

  const listSubmissions = async () => {
    const params = {
      username: user
    }
    const response = await bocaJuniorsAPI.get("/submission", {
      params: params
    });

    console.log("data", response.data)
  
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
                <TableCell align="right">Resultado</TableCell>                
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
                  <TableCell component="th" scope="row" bgcolor={getSubmissionColor(submission.status)}>
                    {submission.exercise.title}
                  </TableCell>                
                  <TableCell align="right" component="th" scope="row" bgcolor={getSubmissionColor(submission.status)}>                    
                    <Typography bgcolor={getSubmissionColor(submission.status)} align="right">
                      {getStatusDescription(submission.status)}
                    </Typography>
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
