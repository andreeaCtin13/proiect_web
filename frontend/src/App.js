import logo from "./logo.svg";
import "./App.css";
import Button from "./components/General/Button";
import LandingPage from "./pages/LandingPage";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";
import CurrentStatusPage from "./pages/Student/CurrentStatusPage";
import CustomSidebar from "./components/Student/CustomSidebar";
import TeachersMarket from "./pages/Student/TeachersMarket";
import AcceptedStudents from "./pages/Teacher/AcceptedStudents";
import SelectSessionsPage from "./pages/Teacher/SelectSessionsPage";
import SessionsView from "./pages/Teacher/SessionsView";
import StudentsRequests from "./pages/Teacher/StudentsRequests";

const Layout = () => {
  return (
    <>
      <CustomSidebar></CustomSidebar>
      <Outlet></Outlet>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage></LandingPage>,
  },
  {
    path: "/user",
    element: <Layout></Layout>,
    children: [
      {
        path: "/user/current-status",
        element: <CurrentStatusPage></CurrentStatusPage>,
      },
      {
        path: "/user/teachers",
        element: <TeachersMarket></TeachersMarket>,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/teacher",
    children: [
      {
        path: "/teacher/accepted-students",
        element: <AcceptedStudents></AcceptedStudents>,
      },
      {
        path: "/teacher/select-sessions",
        element: <SelectSessionsPage></SelectSessionsPage>,
      },
      {
        path: "/teacher/sessions",
        element: <SessionsView></SessionsView>,
      },
      {
        path: "/teacher/students-requests",
        element: <StudentsRequests></StudentsRequests>,
      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
