import {Input} from "./ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {Button} from "./ui/button";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import * as Yup from "yup";
import Error from "./error";
import {addTaskApi} from "@/db/apiAuth";
import {BeatLoader} from "react-spinners";
import useFetch from "@/hooks/use-fetch";
import {UrlState} from "@/context";

const TaskForm = () => {

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // const {loading, error, fn: fnLogin, data} = useFetch(login, formData);
  const {loading, error, fn: fnLogin, data} = useFetch(addTaskApi, formData);
  // addTaskApi
  
  const handleLogin = async () => {
    setErrors([]);
    try {
      const schema = Yup.object().shape({
        title: Yup.string()
          .required("Title is required"),
        description: Yup.string()
          .min(6, "Description must be at least 6 characters")
          .required("Description is required"),
      });

      await schema.validate(formData, {abortEarly: false});
      await fnLogin();
      navigate('/')
    } catch (e) {
      const newErrors = {};

      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }
  };

  return (
    <Card>
      <CardHeader>
        {/* <CardTitle>Login</CardTitle> */}
        <CardDescription>
          Please provide some details about your task
        </CardDescription>
        {error && <Error message={error.message} />}
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Input
            name="title"
            type="title"
            placeholder="Enter title"
            onChange={handleInputChange}
          />
        </div>
        {errors.title && <Error message={errors.title} />}
        <div className="space-y-1">
          <Input
            name="description"
            type="description"
            placeholder="Enter description"
            onChange={handleInputChange}
          />
        </div>
        {errors.description && <Error message={errors.description} />}
      </CardContent>
      <CardFooter>
        <div className=" flex items-center justify-center w-full gap-2">
        <Button onClick={handleLogin}>
          {loading ? <BeatLoader size={10} color="#36d7b7" /> : "Submit"}
        </Button>
        <Button onClick={()=>navigate('/')} variant="outline">
          {loading ? <BeatLoader size={10} color="#36d7b7" /> : "Discard"}
        </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TaskForm;
