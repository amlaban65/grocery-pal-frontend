import useGroceryContext from "../hooks/useGroceriesContext";
import 'material-symbols';
import useAuthContext from "../hooks/useAuthContext";

const GroceryDetails = ({ grocery }) => {
    const {dispatch} = useGroceryContext();
    const {user} = useAuthContext();
    const handleClick = async () => {
        if (!user) return;
        const response = await fetch("https://grocery-pal.herokuapp.com/api/grocery/"+ grocery._id,
        {method: "DELETE",
    headers: {
        'Authorization': `Bearer ${user.token}`
    }})
        const json = await response.json();
        if (response.ok)  dispatch({type: "DELETE_GROCERY", payload: json});
    }
    return (
        <div className="grocery-details">
            <h3>{grocery.name}</h3>
            <p><strong>Quantity: {grocery.quantity || 1}</strong></p>
            {grocery.calories && <p>calories: {grocery.calories}</p>}
            {grocery.notes && <p className="notes" style={{fontSize: 'smaller', color: 'gray'}}>notes: {grocery.notes}</p>}
            {grocery.tags &&  
           grocery.tags.map((tag, index) =>{ 
               if (index == grocery.tags.length - 1) return ( <p style={{ color: 'gray', textAlign: 'center'}}>{tag}</p>);
               else return ( <p style={{ color: 'gray', textAlign: 'center'}}>{tag}, </p>);
            })}
             <span class="material-symbols-outlined delete" onClick={handleClick}> 
            delete
            </span>
            <span class="material-symbols-outlined check" onClick={handleClick}> 
            check
            </span>
        </div>
    )
}
export default GroceryDetails;