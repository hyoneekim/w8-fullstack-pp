import { useNavigate } from "react-router-dom";

const Navbar = ({isAuth, setIsAuth}) => {
  const navigate = useNavigate();
  const handleClick = async(e)=> {
    setIsAuth(false);
    sessionStorage.removeItem("user");
    navigate("/")

  }
  return (
    <nav className="navbar">
      <h1>Properties</h1>
      <a href="/">Home</a>
      <div className="links">
  
        {isAuth?
        <div>
        <a href="/add-property">Add Property</a>
        <button onClick={handleClick}>Log Out</button>
        </div>:<div>
          <a href="/sign-up">Sign Up</a>
          <a href="/log-in">Log In</a>
        </div>
      }</div>
    </nav>
  );
}
 
export default Navbar;