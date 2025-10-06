import {useState} from 'react'

const useSignup = (url) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] =useState(null);

    const signup = async(obj)=>{
        setLoading(true);
        setError(null);
        try{
        const res = await fetch(url, {
            method : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(obj)
        });

        const user = await res.json();
        if(!res.ok){
            console.log(user.error)
            setError(user.error);
            setLoading(false);
            return error;
        }
        sessionStorage.setItem("user",JSON.stringify(user));
        setLoading(false);
    
        }catch(err){
            console.error("error creating user", err);
        }
    }
  return {signup, loading, error};
}

export default useSignup