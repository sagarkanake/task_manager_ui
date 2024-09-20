import TaskForm from "@/components/taskForm";
import {UrlState} from "@/context";
import {useNavigate, useSearchParams} from "react-router-dom";

function AddTask() {
  let [searchParams] = useSearchParams();


  return (
    <div className="mt-14 flex flex-col items-center gap-10">
      <h1 className="text-5xl font-extrabold">
        Add Task
      </h1>
      
          <TaskForm />
        
    </div>
  );
}

export default AddTask;
