import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom'
const TaskTableTools = () => {
    const navigate = useNavigate()

    return (
        <div className="flex  items-center justify-between w-full my-3 ">

            <p className=" font-semibold md:text-xl text-base text-white ">Tasks</p>


            <div>

                <Button type="submit" className="h-full" onClick={()=>{
                    navigate('/addTask')
                }} >
                    Add Task
                </Button>

            </div>
        </div>
    )
}

export default TaskTableTools
