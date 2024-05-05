import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import bocaJuniorsAPI from "../../shared/boca-juniors-api";
import { Exercise } from "../../types/Exercise";
import { ExerciseWithExamples } from "../../types/ExerciseWithExamples";
import { Box, Button, Container, Icon, Stack, TextField } from "@mui/material";
import Header from "../../components/Header";
import { useUser } from "../../context/auth";
import { Submission } from "../../types/Submission";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

export default function SubmissionDetail() {
  const { id } = useParams();
  const [submission, setSubmission] = useState<Submission>();
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSubmission() {
      try {
        const response = await bocaJuniorsAPI.get(`/submission/${id}`);
        setSubmission(response.data);
      } catch (error) {
        console.error("Error fetching submision:", error);
      }
    }

    if (id) {
      fetchSubmission();
    }
  }, [id]);

  return (
    <>
      <Header />
      <Container>
        <Stack marginTop={"24px"}>
          {submission && (
            <Stack>
              <Stack
                justifyContent={"space-between"}
                alignItems={"center"}
                flexDirection={"row"}
                border={1}
                padding={"16px"}
                borderRadius={2}
              >
                <Typography variant="h6">
                  {submission.exercise.title}
                </Typography>
                <Typography>
                  {submission.status}
                </Typography>
              </Stack>
              <Stack
                padding={"16px"}
                border={1}
                marginTop={"16px"}
                alignItems={"center"}
              >
                <Typography variant="h6">Código Fonte</Typography>
              </Stack>
              <Stack
                padding={"16px"}
                border={1}
                borderTop={0}
                marginTop={"0"}
              >
                <Typography variant="body1" gutterBottom>
                  {submission.sourceCode}
                </Typography>
              </Stack>
            </Stack>
          )}
        </Stack>
      </Container>
    </>
  );
}
