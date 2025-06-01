import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function SalesPieChart({ data }) {
  const chartData = {
    labels: data.map(item => item.product),
    datasets: [
      {
        label: 'Sales by Product',
        data: data.map(item => item.total),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        borderColor: ['#FFFFFF'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow chart to stretch to container height
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Sales by Product', font: { size: 18 } },
    },
  };

  return <Pie data={chartData} options={options} />;
}

export default SalesPieChart;