import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import bocaJuniorsAPI from "../../shared/boca-juniors-api";
import { Exercise } from "../../types/Exercise";
import { ExerciseWithExamples } from "../../types/ExerciseWithExamples";

export default function ExerciseDetail() {
  const { id } = useParams();
  const [exercise, setExercise] = useState<ExerciseWithExamples>();

  useEffect(() => {
    async function fetchExercise() {
      try {
        const response = await bocaJuniorsAPI.get(`/exercise/${id}`);
        setExercise(response.data);
      } catch (error) {
        console.error("Error fetching exercise:", error);
      }
    }

    if (id) {
      fetchExercise();
    }
  }, [id]);

  return (
    <div>
      {exercise && (
        <div>
          <Typography variant="h1" gutterBottom>
            {exercise.title}
          </Typography>

          <Typography variant="body1" gutterBottom>
            {exercise.description}
          </Typography>

          {exercise.examples.map((example) => (
            <div key={example.input}>
              <Typography variant="body1" gutterBottom>
                {example.input}
              </Typography>
              <br/>

              <Typography variant="body1" gutterBottom>
                {example.output}
              </Typography>
              <br/>              <br/>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
