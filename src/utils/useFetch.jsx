import { useEffect, useState } from "react";

export const useFetch = (url, token = null) => {
    const [isLoading, setIsLoading] = useState(false);
    const [apiData, setApiData] = useState(null);
    const [serverError, setServerError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            // On définit les entêtes
            const headers = {
                "Content-Type": "application/json",
            };
            if(token)
                headers.Authorization = `Bearer ${token}`;

            try {
                const resp = await fetch(url, {
                    headers
                });
                const data = await resp?.json();

                setApiData(data);
                setIsLoading(false);
            } catch (error) {
                setServerError(error);
                setIsLoading(false);
            }
        };

        if(apiData == null)
            fetchData();

    }, [url])

    return { isLoading, setIsLoading, apiData, setApiData, serverError };

}

export default useFetch;