import dotenv from 'dotenv';

import {InfluxDBClient, Point} from '@influxdata/influxdb3-client'

dotenv.config();

const INFLUXDB_API_URL = process.env.INFLUXDB_API_URL || "";
const INFLUXDB_API_TOKEN = process.env.INFLUXDB_API_TOKEN;

type BroadbandSpeedData = {
  download_speed: number,
  location: string,
  provider: string,
  time: number,
  upload_speed: number
}

const query = `
    SELECT *
    FROM 'broadband'
    WHERE time >= now() - interval '24 hours'
`

exports.handler = async (event) => {

    // Get data from InfluxDB
    const influxDBClient = new InfluxDBClient({ host: INFLUXDB_API_URL, token: INFLUXDB_API_TOKEN });
    const dataGenerator = influxDBClient.query(query, 'broadband')
    const results: BroadbandSpeedData[] = [];
    for await (const row of dataGenerator) {
        results.push(row as BroadbandSpeedData);
    }
    influxDBClient.close()

    //Return data
    return {
        statusCode: 200,
        body: JSON.stringify(results)
    }
}