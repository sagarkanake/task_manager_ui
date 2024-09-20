
import useFetch from "@/hooks/use-fetch";
import {Avatar, AvatarFallback, AvatarImage} from "@radix-ui/react-avatar";
import {Link, useNavigate} from "react-router-dom";
import {BarLoader} from "react-spinners";
import {Button} from "./ui/button";
import {UrlState} from "@/context";

const Header = () => {
  


  return (
    <>
      <nav className="py-4 flex justify-between items-center">
        <Link to="/">
          <img src="/logo4.jpeg" className="h-16" alt="Trimrr Logo" />
        </Link>
       
      </nav>
      {/* {loading && <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />} */}
    </>
  );
};

export default Header;
