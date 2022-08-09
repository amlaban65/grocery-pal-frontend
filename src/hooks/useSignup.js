
import { useState } from "react";
import {useAuthContext} from "./useAuthContext";

export const useSignup = () => {
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    const { dispatch } = useAuthContext();
    const signup = async (email, password) => {
        setLoading(true);
        setError(null);
        const response = await fetch('/user/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })
        const json = await response.json();
        if (!response.ok) {
            setLoading(false);
            setError(json.error);
        } else {
            localStorage.setItem('user', JSON.stringify(json));
            dispatch({type: 'LOGIN', payload: json});
            setLoading(false);
    }
}
return {signup, loading, error}
}
