import { useEffect } from "react";
import GroceryDetails from "../components/GroceryDetails.js";
import GroceryForm from "../components/GroceryForm.js";
import useGroceryContext from "../hooks/useGroceriesContext.js";
import {useAuthContext} from "../hooks/useAuthContext.js";
const Home = () => {
    const {groceries, dispatch} = useGroceryContext();
    const {user} = useAuthContext();
    useEffect(() => {
        const fetchGroceries = async () => {
            const response = await fetch('/api/grocery', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();
            if (response.ok) {
                dispatch({type: "SET_GROCERIES", payload: json})
            }
        }
        if (user) {
        fetchGroceries();
        }
    }, [dispatch, user])
    return (
        <div className="home">
            <div className="groceries">
                {groceries && (
                    groceries.map((grocery) => {
                   return <GroceryDetails key={grocery._id} grocery={grocery} />
                    }))} 
            </div>
            <GroceryForm/>
        </div>
    )
};
export default Home;