import useAuthContext from "./useAuthContext"
import useGroceryContext from "./useGroceriesContext";

export const useLogout = () => {
    const { dispatch } = useAuthContext();
    const { dispatch: dispatchGroceries } = useGroceryContext()
    const logout = () => {
        localStorage.removeItem('user');
        dispatch({type: 'LOGOUT'});
        dispatchGroceries({ type: 'SET_GROCERIES', payload: null })
    }
    return {logout};
}