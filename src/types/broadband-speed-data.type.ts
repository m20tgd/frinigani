export type TimeRange = "day" | "week" | "30";

type BroadbandSpeedData = {
  download_speed: number,
  location: string,
  provider: string,
  time: number,
  upload_speed: number
}

export default BroadbandSpeedData