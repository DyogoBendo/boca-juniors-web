import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import bocaJuniorsAPI from "../../shared/boca-juniors-api";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { ExerciseGroupWithExercises } from "../../types/ExerciseGroupWithExercises";

export default function ExerciseGroupDetail() {
  const { id } = useParams();
  const [exerciseGroup, setExerciseGroup] = useState<ExerciseGroupWithExercises>();

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
    <div>
      {exerciseGroup && (
        <div>
          <Typography variant="h1" gutterBottom>
            {exerciseGroup.name}
          </Typography>

          {exerciseGroup.open ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}

          {exerciseGroup.exerciseList.map((exercise) => (
            <div key={exercise.id}>
              <Typography variant="h2" gutterBottom>
                {exercise.title}
              </Typography>
              <Typography variant="h2" gutterBottom>
                {exercise.tag}
              </Typography>  
              <Typography variant="h2" gutterBottom>
                {exercise.difficulty}
              </Typography>                            
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
