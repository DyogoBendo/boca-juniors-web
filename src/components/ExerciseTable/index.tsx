import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import bocaJuniorsAPI from '../../shared/boca-juniors-api';
import { Exercise } from '../../types/Exercise';
import { Link } from 'react-router-dom';


async function listExercise(){
    const response = await bocaJuniorsAPI.get('/exercise')

    return response.data
}


const rows: Exercise[] = await listExercise()
console.log("rows", rows)

export default function ExerciseTable() {
  return (
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
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              component={Link}
              to={`/exercise/${row.id}`}
            >
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align='center' component="th" scope="row">
                {row.tag}
              </TableCell>
              <TableCell align='center' component="th" scope="row">
                {row.difficulty}
              </TableCell>                            
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}