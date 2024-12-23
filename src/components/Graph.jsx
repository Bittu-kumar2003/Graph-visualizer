import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Graph = ({ labels, data, title, color }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (labels && data && labels.length === data.length) {
      const newChartData = {
        labels: labels,
        datasets: [
          {
            label: title,
            data: data,
            borderColor: color,
            backgroundColor: `${color}80`, // Lighten the color
            borderWidth: 3, // Increase line thickness
            tension: 0.4, // Smooth line curve
          },
        ],
      };
      setChartData(newChartData);
    }
  }, [labels, data, title, color]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)', // Light grid lines for Y-axis
        },
        ticks: {
          beginAtZero: true,
        },
      },
    },
  };

  if (!chartData) {
    return <p>Loading chart...</p>; // Show loading message while the chart data is being processed
  }

  return <Line data={chartData} options={chartOptions} />;
};

export default Graph;




// import { Line } from 'react-chartjs-2';

// const Graph = ({ labels, data, title, color }) => {
//   const chartData = {
//     labels: labels,
//     datasets: [
//       {
//         label: title,
//         data: data,
//         borderColor: color,
//         backgroundColor: color + '80', // Lighten the color
//         borderWidth: 3, // Increase line thickness
//         tension: 0.4, // Smooth line curve
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       x: {
//         grid: {
//           display: false,
//         },
//       },
//       y: {
//         grid: {
//           color: 'rgba(0, 0, 0, 0.1)', // Light grid lines for Y-axis
//         },
//         ticks: {
//           beginAtZero: true,
//         },
//       },
//     },
//   };

//   return <Line data={chartData} options={chartOptions} />;
// };

// export default Graph;




// import React from "react";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const Graph = ({ data }) => {
//   const chartData = {
//     labels: data.map((item) => item.label), // X-axis labels
//     datasets: [
//       {
//         label: "Sample Data",
//         data: data.map((item) => item.value), // Y-axis values
//         borderColor: "rgba(75, 192, 192, 1)",
//         backgroundColor: "rgba(75, 192, 192, 0.2)",
//         borderWidth: 2,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "top",
//       },
//     },
//   };

//   return <Line data={chartData} options={options} />;
// };

// export default Graph;
