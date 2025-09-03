import dotenv from 'dotenv';

import {InfluxDBClient} from '@influxdata/influxdb3-client'

import BroadbandSpeedData, { TimeRange } from '../../src/types/broadband-speed-data.type';

import { dayInMs } from "../../src/consts/time.const";

dotenv.config();

const INFLUXDB_API_URL = process.env.INFLUXDB_API_URL || "";
const INFLUXDB_API_TOKEN = process.env.INFLUXDB_API_TOKEN;

type QueryBody = {
    targetDateString: string;
    timeRange: TimeRange;
}

exports.handler = async (event) => {

    const { targetDateString, timeRange } = JSON.parse(event.body) as QueryBody;
    const localDate = new Date(targetDateString);

    // Get start date
    let startDateString = localDate.toISOString();
    if (timeRange === "week") {
        startDateString = new Date(localDate.getTime() - (7 * dayInMs)).toISOString();
    } else if (timeRange === "30") {
        startDateString = new Date(localDate.getTime() - (30 * dayInMs)).toISOString();
    }
    const endDateString = new Date(localDate.getTime() + dayInMs).toISOString();


    const query = `
        SELECT 
            DATE_BIN(INTERVAL '1 hours', time, '1970-01-01T00:00:00Z') AS time,
            min(CAST(download_speed AS DOUBLE)) AS download_speed,
            min(CAST(upload_speed AS DOUBLE)) AS upload_speed
        FROM broadband
        WHERE time >= '${startDateString}'
        AND time < '${endDateString}'
        GROUP BY 1
        ORDER BY time ASC
    `;


    // Get data from InfluxDB
    const results: BroadbandSpeedData[] = [];
    try {
        const influxDBClient = new InfluxDBClient({ host: INFLUXDB_API_URL, token: INFLUXDB_API_TOKEN });
        const dataGenerator = influxDBClient.query(query, 'broadband')
        for await (const row of dataGenerator) {
            results.push(row as BroadbandSpeedData);
        }
        influxDBClient.close()
    } catch (error) {
        console.error("Error fetching data from InfluxDB:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error })
        };
    }

    //Return data
    return {
        statusCode: 200,
        body: JSON.stringify(results)
    }
}
