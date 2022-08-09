import { Link } from "react-router-dom"
import {useAuthContext} from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
const NavBar = () => {
    const { logout } = useLogout();
    const {user} = useAuthContext();
    const handleLogout = () => {
        logout();
    }
    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>
                        Grocery Pal
                    </h1>
                </Link>
                <nav>
                    {user && (
                    <div>
                        <span>{user.email}</span>
                        <button onClick={handleLogout}>Sign out</button>
                    </div>
                    )}
                    {!user && (
                    <div>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">  Signup</Link>
                    </div>
                    )}
                </nav>
            </div>
        </header>
    )
};
export default NavBar;