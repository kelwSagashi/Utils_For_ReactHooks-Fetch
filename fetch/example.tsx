import { useEffect, useState } from "react";
import { UseAxiosAdapter } from "./Adapters/Axios"
import { UseFetch } from "./Hook";

interface user {
    id: number;
    name: string;
    role: string;
}

const http_client = new UseAxiosAdapter<user>("http://sua/api");
const useFetch = new UseFetch<user>(http_client, {
    endpoint: "/qualquer/rota",
    method: "get",
});


function FetchExample(){
    const [user, setUser] = useState<user>();

    useEffect(() => {
        async function getUser(){
            const {body: user} = await useFetch.useFetch();
            setUser(user);
        }

        getUser();
    }, []);
    
    return (
        <>
        </>
    )
}

export FetchExample;