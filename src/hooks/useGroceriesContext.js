import { GroceryContext } from "../context/GroceryContext";
import { useContext } from "react";

export const useGroceryContext = () => {
    const context = useContext(GroceryContext);

    if (!context) {
        throw Error("context must be used in a context provider");
    }
    return context;
}

export default useGroceryContext;