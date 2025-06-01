import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function SalesBarChart({ data }) {
  const chartData = {
    labels: data.map(item => item.month),
    datasets: [
      {
        label: 'Monthly Sales',
        data: data.map(item => item.total),
        backgroundColor: '#4BC0C0',
        borderColor: '#36A2EB',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow chart to stretch to container height
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Monthly Sales', font: { size: 18 } },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Sales ($)', font: { size: 14 } },
      },
      x: {
        title: { display: true, text: 'Month', font: { size: 14 } },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}

export default SalesBarChart;