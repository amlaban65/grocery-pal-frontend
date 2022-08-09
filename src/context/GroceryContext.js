import { createContext, useReducer } from "react";
export const GroceryContext = createContext();
export const groceriesReducer = (state, action) => {
    switch(action.type) {
        case 'SET_GROCERIES':
            return {
                groceries: action.payload
            }
        case 'ADD_GROCERY':
            //checks if grocery already existts
            const check = state.groceries.some(grocery => 
                grocery._id === action.payload._id);
            if (check) {
                state.groceries = state.groceries.filter((grocery) => 
                grocery._id != action.payload._id);
            }
            return {
                groceries: [action.payload, ...state.groceries]
            }
        case 'DELETE_GROCERY':
            return {
                groceries: state.groceries.filter((grocery) => 
                    grocery._id != action.payload._id)
            }
        default:
            return state
    }
};
export const GroceryContextProvider = ({ children }) =>  {
    const[state, dispatch] = useReducer(groceriesReducer, {
        groceries: null
    });
    return (
    <GroceryContext.Provider value = {{...state, dispatch}}>
        { children }
    </GroceryContext.Provider>
    );
}