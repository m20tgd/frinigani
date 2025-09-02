import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeSeriesScale,
  ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";

import BroadbandSpeedData, { TimeRange } from "../../types/broadband-speed-data.type";

import { dayInMs } from "../../consts/time.const";

import "chartjs-adapter-date-fns";

ChartJS.register(
  CategoryScale,
  TimeSeriesScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin
);

type BroadbandChartProps = {
  data: Array<BroadbandSpeedData>,
  targetDateString: string,
  timeRange: TimeRange
}

const BroadbandChart: React.FC<BroadbandChartProps> = ({ data, targetDateString, timeRange }) => {

  const chartData = {
    datasets: [
      {
        label: "Download Speed",
        data: data.map(d => ({ x: d.time, y: d.download_speed })),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 1)",
        borderWidth: 3
      },
      {
        label: "Upload Speed",
        data: data.map(d => ({ x: d.time, y: d.upload_speed })),
        borderColor: "#f63500",
        backgroundColor: "#f63500",
        borderWidth: 3
      }
    ],
  };
  const { suggestedMin, suggestedMax } = getSuggestedMinMaxForTimeRange(timeRange, targetDateString);
  const unit = timeRange === "day" ? "hour" : "day";

  const options: ChartOptions<"line"> = {
    responsive: true,
    elements: {
      point: {
        radius: 0,
      },
    },
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          pointStyle: "line",
          font: {
            size: 16,
          },
        }
      },
      tooltip: {
        intersect: false, // If true, only show tooltip when cursor intersects an item
        callbacks: {
          title: function(context) {
            console.log(context)
            const date = new Date(context[0].parsed.x);
            return date.toLocaleDateString("en-GB", {
              hour: "2-digit",
              minute: "2-digit"
            });
          }
        }
      },
    },
    scales: {
      x: {
        type: "time",
        suggestedMax: suggestedMax,
        suggestedMin: suggestedMin,
        time: {
          unit: unit,
          minUnit: "minute",
          displayFormats: {
            hour: "HH:mm",
            minute: "HH:mm"
          }
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Speed (Mbps)",
          font: {
            size: 16,
          },
        },
      }
    }
  };

  return <Line data={chartData} options={options} />;
};

const getSuggestedMinMaxForTimeRange = (timeRange: TimeRange, targetDateString: string): {suggestedMin: number, suggestedMax: number} => {
    const targetDate = new Date(targetDateString);
    let suggestedMin: number;
    let suggestedMax: number;

    switch (timeRange) {
        case "week":
            suggestedMin = targetDate.setHours(0,0,0,0) - 7 * dayInMs;
            suggestedMax = targetDate.setHours(24, 0, 0, 0);
            break;
        case "30":
            const today = new Date();
            suggestedMin = today.setHours(0,0,0,0) - 31 * dayInMs;
            suggestedMax = today.setHours(24, 0, 0, 0);
            break;
        case "day":
        default:
            suggestedMin = targetDate.setHours(0, 0, 0, 0);
            suggestedMax = targetDate.setHours(24, 0, 0, 0);
            break;
    }

    return { suggestedMin, suggestedMax};
}

export default BroadbandChart;
