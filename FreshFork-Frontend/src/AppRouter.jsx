import { Routes, Route } from "react-router-dom";
import AddRecipeComponent from './MainComponents/AddRecipeComponent';
import SearchRecipesComponent from './MainComponents/SearchRecipesComponent';
import UserRecipesComponent from './MainComponents/UserRecipesComponent'; // Import the new component
import LandingPage from "./LandingPage";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

export default function AppRoutes() {
  return (
    <Routes>
      <Route index element={<LandingPage />} />
      <Route path="/explore" element={<SearchRecipesComponent />} />
      <Route path="/add" element={<AddRecipeComponent />} />
      <Route path="/user-recipes" element={<UserRecipesComponent />} /> {/* Add the new route */}
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignupForm />} />
    </Routes>
  );
}
