import React, { useState } from 'react'

const useLogin = (url) => {
    const [loading, setLoading] = useState(null);
    const [error, setError]= useState(null);

    const login = async(obj)=>{
        setLoading(true);
        setError(null);
        try{
            const res = await fetch(url,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)
            });
            const user = await res.json();
            if(!res.ok){
                setError(user.error);
                setLoading(false);
                return error;
            }
            sessionStorage.setItem("user", JSON.stringify(user));
            setLoading(false);


        }catch(err){
            console.error("failed login", err);

        }
    }
  return {login, error, loading};
}

export default useLogin