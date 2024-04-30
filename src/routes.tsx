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
          <Route path='/exercise/'>
            <Route index element={<ExerciseTable />} />
            <Route path='create' element={<ExerciseForm />} />
            <Route path=':id' element={<ExerciseDetail />} />
          </Route>
          <Route path='/exercise-group/'>
            <Route index element={< GroupExerciseTable/>} />
            <Route path='create' element={<ExerciseGroupForm />} />
            <Route path=':id' element={<ExerciseGroupDetail />} />
          </Route>
        </Routes>        
      </Router>
    </main>
  );
}