import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import bocaJuniorsAPI from "../../shared/boca-juniors-api";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { ExerciseGroupWithExercises } from "../../types/ExerciseGroupWithExercises";
import {
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

export default function ExerciseGroupDetail() {
  const { id } = useParams();
  const [exerciseGroup, setExerciseGroup] =
    useState<ExerciseGroupWithExercises>();

  useEffect(() => {
    async function fetchExerciseGroup() {
      try {
        const response = await bocaJuniorsAPI.get(`/exercise-group/${id}`);
        setExerciseGroup(response.data);
      } catch (error) {
        console.error("Error fetching exercise Group:", error);
      }
    }

    if (id) {
      fetchExerciseGroup();
    }
  }, [id]);

  return (
    <ExerciseGroupContainer>
      {exerciseGroup && (
        <div>
          <ExerciseGroupTitleContainer>
            <Typography variant="h1" gutterBottom>
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
                </TableRow>
              </TableHead>
              <TableBody>
                {exerciseGroup.exerciseList.map((exercise) => (
                  <TableRow
                    key={exercise.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    component={Link}
                    to={`/list-exercise/${exercise.id}`}
                  >
                    <TableCell component="th" scope="row">
                      {exercise.title}
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      {exercise.tag}
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      {exercise.difficulty}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </ExerciseGroupContainer>
  );
}
