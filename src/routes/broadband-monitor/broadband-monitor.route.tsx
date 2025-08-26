import { useEffect } from "react";

const BroadbandMonitor = () => {

    const fetchData = async () => {
        const response = await fetch('/.netlify/functions/query-broadband-data');
        const data = await response.json();
        console.log(data);
    }

    useEffect(() => {
        document.title = "Broadband Monitor";
    }, []);

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <h1>Broadband Monitor</h1>
        </div>
    );
}

export default BroadbandMonitor;