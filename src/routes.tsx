import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ExerciseTable from "./pages/ListExercises";
import LoginForm from "./pages/Login";
import { useUser } from "./context/auth";
import ExerciseForm from "./pages/CreateExercise";
import ExerciseDetail from "./pages/ExerciseDetail";
import ExerciseGroupTable from "./pages/ListExerciseGroups";
import ExerciseGroupForm from "./pages/CreateExerciseGroup";
import ExerciseGroupDetail from "./pages/ExerciseGroupDetail";
import SubmissionTable from "./pages/ListSubmission";
import SubmissionDetail from "./pages/SubmissionDetail";
import ExerciseGroupEditForm from "./pages/EditExerciseGroup";
import ExerciseEditForm from "./pages/EditExercise";
import UserSubmission from "./pages/UserSubmissions";

export default function AppRouter() {
  const {user, setUser} = useUser()
  console.log("usuario atual", user)
  return (
    <main className="container">
      <Router>
        <Routes>
          <Route path="/">
            <Route index element={!user ? <LoginForm /> : <Navigate to="/exercise-group" replace />} />
            <Route path="login" element={!user ? <LoginForm /> : <Navigate to="/exercise-group" replace />} />
          </Route>
          <Route path="/exercise/">
            <Route index element={user ? <ExerciseTable /> : <Navigate to="/" replace />} />
            <Route path="create" element={user ? user === "admin" ? <ExerciseForm /> : <ExerciseGroupTable/> : <Navigate to="/" replace />} />
            <Route path="edit/:id" element={user ? user === "admin" ? <ExerciseEditForm /> : <ExerciseGroupTable/> : <Navigate to="/" replace />} />
            <Route path=":id" element={user ? <ExerciseDetail /> : <Navigate to="/" replace />} />
          </Route>
          <Route path="/exercise-group/">
            <Route index element={user ? <ExerciseGroupTable /> : <Navigate to="/" replace />} />
            <Route path="create" element={user ? user === "admin" ? <ExerciseGroupForm /> : <ExerciseGroupTable/> : <Navigate to="/" replace />} />
            <Route path="edit/:id" element={user ? user === "admin" ? <ExerciseGroupEditForm /> : <ExerciseGroupTable/> : <Navigate to="/" replace />} />
            <Route path=":id" element={user ? <ExerciseGroupDetail /> : <Navigate to="/" replace />} />
          </Route>
          <Route path="/submission/">
            <Route index element={user ? <SubmissionTable /> : <Navigate to="/" replace />} />            
            <Route path=":id" element={user ? <SubmissionDetail /> : <Navigate to="/" replace />} />
            <Route path="user/:username/exercise/:exerciseId" element={user ? <UserSubmission /> : <Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Router>
    </main>
  );
}
