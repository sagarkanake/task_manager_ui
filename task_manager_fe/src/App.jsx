import "./App.css";
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import UrlProvider from "./context";

import AppLayout from "./layouts/app-layout";
import TaskTable from "./pages/taskTable";
import AddTask from "./pages/addTask";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <TaskTable />,
      },
      {
        path: "/addTask",
        element: <AddTask />,
      },
      
     
    ],
  },
]);

function App() {
  return (
    <UrlProvider>
      <RouterProvider router={router} />
    </UrlProvider>
  );
}

export default App;
