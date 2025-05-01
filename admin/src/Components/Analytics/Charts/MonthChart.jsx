import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const MonthChart = ({ earningsByMonth }) => {
    // prepare the data for the chart
    const labels = earningsByMonth.map(earning => earning._id); // _id is the month
    const data = {
      labels,
      datasets: [
        {
          label: 'Earnings (€)',
          data: earningsByMonth.map(earning => earning.total),
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
  
    const options = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }
              if (context.parsed.y !== null) {
                label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR' }).format(context.parsed.y);
              }
              return label;
            },
          },
        },
      },
    };
  
    return <Bar data={data} options={options} />;
  };
  
  export default MonthChart;