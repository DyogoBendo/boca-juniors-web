import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GroupExerciseTable from './components/ExerciseGroupTable';
import ExerciseForm from './components/ExerciseForm';
import ExerciseTable from './components/ExerciseTable';
import ExerciseDetail from './components/ExerciseDetail';
import ExerciseGroupForm from './components/ExerciseGroupForm';
import ExerciseGroupTable from './components/ExerciseGroupTable';
import ExerciseGroupDetail from './components/ExerciseGroupDetail';

export default function AppRouter() {
  return (
    <main className='container'>
      <Router>        
        <Routes>
          <Route path='/'>
            <Route index element={< GroupExerciseTable/>} />
            <Route path='create-exercise-group' element={<ExerciseGroupForm />} />
            <Route path='create-exercise' element={<ExerciseForm />} />
            <Route path='list-exercise' element={<ExerciseTable />} />
            <Route path='list-exercise-group/:id' element={<ExerciseGroupDetail />} />
            <Route path='list-exercise-group' element={<ExerciseGroupTable />} />
            <Route path='list-exercise/:id' element={<ExerciseDetail />} />
          </Route>
        </Routes>        
      </Router>
    </main>
  );
}