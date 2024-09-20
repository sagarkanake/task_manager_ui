import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import AddTask from "./taskTableTools";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { BarLoader } from "react-spinners";
const TaskTable = () => {
  const [longUrl, setLongUrl] = useState("");
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const handleShorten = (e) => {
    e.preventDefault();
    if (longUrl) navigate(`/auth?createNew=${longUrl}`);
  };

  useEffect(() => {
    // Fetch data from API when component mounts
    const fetchTasks = async () => {
      try {
        const response = await fetch("https://demo0676561.mockable.io/tasks"); // Replace with your actual API URL
        const data = await response.json();
        setTasks(data); // Store fetched data in state
        setLoading(false)
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setLoading(false)
      }
    };

    fetchTasks(); // Call the function to fetch tasks
  }, []);
  return (

    <div className="flex flex-col items-center">
       {loading && <BarLoader className="mb-4" width={"100%"} color="#36d7b7" /> }
      <AddTask />
       <Card className=' w-full '>
      <Table>
        <TableCaption>A list of your recent tasks.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">#Id</TableHead>
            <TableHead>Task</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
        {tasks.map((task, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{task.id}</TableCell>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell className="text-right">{task.status}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      </Card>


    </div>
  );
};

export default TaskTable;
