import { useState } from "react"
import useAuthContext from "../hooks/useAuthContext";
import useGroceryContext from "../hooks/useGroceriesContext";

const GroceryForm = () => {
    const[name, setName] = useState('');
    const[quantity, setQuantity] = useState('');
    const[tags, setTags] = useState('');
    const[calories, setCalories] = useState('');
    const[notes, setNotes] = useState('');
    const[error, setError] = useState('');
    const {dispatch} = useGroceryContext();
    const {user} = useAuthContext();
    const handleSubmit = async(e) => {
        e.preventDefault();
        if (!user) {
            setError("Please log in");
            return;
        }
        const grocery = {name, quantity, tags, calories, notes};

        const response = await fetch("https://grocery-pal.herokuapp.com/api/grocery", {
            method: "POST",
            body: JSON.stringify(grocery),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        });
        const json = await response.json();
        if (!response.ok) setError(json.error) 
        else {
            setName('');
            setTags('');
            setCalories('');
            setNotes('');
            setQuantity('');
            setError(null);
            dispatch({type: "ADD_GROCERY", payload: json})
        }
    }
    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add something to your shopping list</h3>
            <label><span style={{color: 'red'}}>*</span>Name:</label>
            <input
            type="text"
            placeholder="e.g. bread, beef, etc.."
            onChange={(e) => setName(e.target.value)}
            value={name} 
            />
            <label>Quantity:</label>
            <input
            type="number"
            placeholder="default: 1"
            onChange={(e) => setQuantity(e.target.value)}
            value={quantity} 
            />
            <label>tags:</label>
            <input
            type="text"
            placeholder="e.g. pastries, meats, etc.."
            onChange={(e) => setTags(e.target.value)}
            value={tags} 
            />
            <label>calories:</label>
            <input
            type="number"
            placeholder="to keep your diet in check ;)..."
            onChange={(e) => setCalories(e.target.value)}
            value={calories} 
            />
            <label>notes:</label>
            <input
            type="text"
            placeholder='e.g. Get XYZ brand'
            onChange={(e) => setNotes(e.target.value)}
            value={notes} 
            />
            <div style={{fontSize:"smaller", color:"gray", marginBottom:"20px"}}>* denotes a required field</div>
            <button>Add Grocery Item</button>
            {error && <div className="error">An error has occurred: {error}</div>}
        </form>
    )
}
export default GroceryForm;