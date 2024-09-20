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
import './page.css';
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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog"
// import { Input } from "@/components/ui/input"

import { BarLoader } from "react-spinners";
const TaskTable = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldOpenDialog, setShouldOpenDialog] = useState(false);
  const [taskDetail, setTaskDetail] = useState(null);
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'descending' });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const handleOpen = () => {
    // Check your specific condition here
    setShouldOpenDialog(true); // Set to true if the condition is met
    setIsOpen(true); // Open the dialog
  };

  // Optional: Close dialog and reset condition
  const handleClose = () => {
    setIsOpen(false);
    setShouldOpenDialog(false);
  };
  const handleShorten = (e) => {
    e.preventDefault();
    if (longUrl) navigate(`/auth?createNew=${longUrl}`);
  };
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8001/ws/tasks/');

    // Open WebSocket connection
    socket.onopen = function () {
      console.log('WebSocket is connected.');
    };
    // Handle incoming messages
    socket.onmessage = function (event) {
      const data = JSON.parse(event.data);
      setTasks((prevTasks) => {
        return prevTasks.map(task => {
          if (task.id === data.details && data.status.toLowerCase() == "completed") {
            handleOpen()
            setTaskDetail(task)
            // Update the status of the task that matches the incoming data ID
            return { ...task, status: 'Completed' };
            // Assuming you want to set status to 'completed'
          }
          else if (task.id === data.details && data.status.toLowerCase() == "in_progress") {
            // handleOpen()
            setTaskDetail(task)
            // Update the status of the task that matches the incoming data ID
            return { ...task, status: 'In progress' };
            // Assuming you want to set status to 'completed'
          }
          return task; // Return the task unchanged if it doesn't match
        });
      });
      console.log('Message from server:', data);
    };

    // Handle WebSocket closure
    socket.onclose = function () {
      console.log('WebSocket connection closed');
    };

    // Cleanup WebSocket connection when the component unmounts
    return () => {
      socket.close();
      console.log('WebSocket is being closed');
    };
  }, []);

  const fetchTasks = async (pageNumber) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/tasks?page=${pageNumber}`);
      const data = await response.json();
      setTasks(data.results); // Store paginated tasks
      setTotalPages(Math.ceil(data.count / 10)); // Set total pages (assuming 10 tasks per page)
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch tasks when the component mounts, page changes, or sort configuration changes
    fetchTasks(page, sortConfig.key, sortConfig.direction);
  }, [page, sortConfig]);
  // const sortedTasks = () => {
  //   let sortableTasks = [...tasks];
  //   if (sortConfig.key !== null) {
  //     sortableTasks.sort((a, b) => {
  //       if (a[sortConfig.key] < b[sortConfig.key]) {
  //         return sortConfig.direction === 'ascending' ? -1 : 1;
  //       }
  //       if (a[sortConfig.key] > b[sortConfig.key]) {
  //         return sortConfig.direction === 'ascending' ? 1 : -1;
  //       }
  //       return 0;
  //     });
  //   }
  //   return sortableTasks;
  // };
  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  const sortedTasks = tasks.sort((a, b) => {
    if (sortConfig.key !== null) {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
    }
    return 0;
  });
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const [statusFilter, setStatusFilter] = useState(''); // State to manage the filter

const handleFilterChange = (event) => {
    const selectedStatus = event.target.value;
    setStatusFilter(selectedStatus);
    fetchTasks(page, sortConfig.key, sortConfig.direction === 'ascending' ? 'asc' : 'desc', selectedStatus); // Fetch with filter
};
  return (

    <div className="flex flex-col items-center">
      {loading && <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>

        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Task Status</DialogTitle>
            <DialogDescription>
              <p >Task id <span className=" font-semibold md:text-md text-base text-white " >{taskDetail?.id} </span> is completed </p>
              <p> Task title  : {taskDetail?.title} </p>
              <p> Task description : {taskDetail?.description} </p>
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <AddTask />
      <Card className=' w-full '>
      
        <Table>
          <TableCaption>A list of your recent tasks.</TableCaption>
          <TableHeader className="bg-gray-800 bg-opacity-40">
            {/* <TableRow>
              <TableHead className="w-[100px]">#Id</TableHead>
              <TableHead>Task</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow> */}
            <TableHead className="cursor-pointer" onClick={() => handleSort('id')}>
              #Id {sortConfig.key === 'id' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort('title')}>
              Task {sortConfig.key === 'title' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
            </TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="cursor-pointer text-right" onClick={() => handleSort('status')}>
              Status {sortConfig.key === 'status' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
            </TableHead>
          </TableHeader>
          <TableBody>
            {tasks.map((task, index) => (
              <TableRow key={index} className={`hover:bg-opacity-10 ${task.status.toLowerCase() === 'completed' ? 'hover:bg-green-700' : (task.status.toLowerCase() === 'in progress' || task.status.toLowerCase() === 'in_progress') ? 'hover:bg-yellow-700' : 'hover:bg-red-700'}`}>
                <TableCell className="font-medium">{task.id}</TableCell>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.description}</TableCell>
                {/* <TableCell className="text-right">
                  {task.status}
                  {(task.status.toLowerCase() === 'in progress' || task.status.toLowerCase() === 'in_progress') && <div className="progress-bar" style={{ width: `${50}%` }} />}
                </TableCell> */}
                <TableCell className={`text-right font-semibold 
    ${task.status.toLowerCase() === 'completed' ? 'text-green-600' : ''} 
    ${(task.status.toLowerCase() === 'in_progress' || task.status.toLowerCase() == 'in progress') ? 'text-yellow-600' : ''} 
    ${task.status.toLowerCase() === 'queued' ? 'text-red-600' : ''}`}>
                  <div className="flex flex-col items-center"> {/* Use flex-col to stack items vertically */}
                    <div>{task.status}</div> {/* Message on top */}
                    {(task.status.toLowerCase() === 'in_progress' || task.status.toLowerCase() == 'in progress') && ( // Show blinking dots only if in progress
                      <div className="blinking-dots mt-2"> {/* Add margin-top for spacing */}
                        <div className="blinking-dot"></div>
                        <div className="blinking-dot"></div>
                        <div className="blinking-dot"></div>
                      </div>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <div className=" flex mx-3 my-3">
            <div className="flex justify-center items-center space-x-4 mt-4">
              <Button onClick={handlePreviousPage} disabled={page === 1}>
                Previous
              </Button>
              <span>Page {page} of {totalPages}</span>
              <Button onClick={handleNextPage} disabled={page === totalPages}>
                Next
              </Button>
            </div>
          </div>

        </Table>
      </Card>


    </div>
  );
};

export default TaskTable;
