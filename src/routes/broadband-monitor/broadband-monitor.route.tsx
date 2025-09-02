import { useEffect, useState } from "react";
import BroadbandChart from "../../components/chart-broadband/broadband-chart.component";
import BroadbandSpeedData, { TimeRange } from "../../types/broadband-speed-data.type";

const getLocalDateStringForDate = (date: Date = new Date()) => {
    const midnightInMs = date.setHours(0,0,0,0);
    return new Date(midnightInMs).toString();
}

const BroadbandMonitor = () => {

    const [data, setData] = useState<Array<BroadbandSpeedData>>([]);
    const [targetDateString, setTargetDateString] = useState<string>(getLocalDateStringForDate());
    const [timeRange, setTimeRange] = useState<TimeRange>("day");

    useEffect(() => {
        document.title = "Broadband Monitor";
    }, []);

    const fetchData = async () => {
        const response = await fetch(`/.netlify/functions/query-broadband-data`, {
            method: 'POST',
            body: JSON.stringify({ targetDateString, timeRange })
        });
        const data = await response.json();
        setData(data);
    }

    useEffect(() => {
        fetchData();
    }, [targetDateString, timeRange]);

    const onDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = new Date(event.target.value);
        setTargetDateString(getLocalDateStringForDate(newDate));
    }

    const onTimeRangeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTimeRange(event.target.value as TimeRange);
    }

    return (
        <div className="container">
            <div className="row mt-3">
                <div className="col">
                    <h1>Broadband Speed</h1>
                </div>
                <div className="col">
                    <div className="input-group input-group-sm pt-3 pe-4">
                        <select className="form-select" defaultValue={"day"} onChange={onTimeRangeChange}>
                            <option value="day">Day</option>
                            <option value="week">Week</option>
                            <option value="30">30 Days</option>
                        </select>
                        <input className="form-control" type="date" onChange={onDateChange} defaultValue={new Date().toISOString().split("T")[0]} />
                    </div>
                </div>
            </div>
            <BroadbandChart data={data} targetDateString={targetDateString} timeRange={timeRange} />
        </div>
    );
}

export default BroadbandMonitor;