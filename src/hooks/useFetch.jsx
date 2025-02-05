import { useState, useEffect } from "react";
import axios from "../api";

const useFetch = (ENDPOINT, TRIGGER) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const response = await axios(ENDPOINT);
                setData(response.data?.payload);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [ENDPOINT, TRIGGER]);
    return [data, loading];
};

export default useFetch;
