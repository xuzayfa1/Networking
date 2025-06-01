import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function RevenueLineChart({ data }) {
  const chartData = {
    labels: data.map(item => item.date),
    datasets: [
      {
        label: 'Daily Revenue',
        data: data.map(item => item.total),
        fill: false,
        borderColor: '#FF6384',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow chart to stretch to container height
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Daily Revenue (Last 30 Days)', font: { size: 18 } },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Revenue ($)', font: { size: 14 } },
      },
      x: {
        title: { display: true, text: 'Date', font: { size: 14 } },
      },
    },
  };

  return <Line data={chartData} options={options} />;
}

export default RevenueLineChart;