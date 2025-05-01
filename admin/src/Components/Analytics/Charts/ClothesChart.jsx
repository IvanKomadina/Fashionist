import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ClothesChart = ({ tshirtCount, hoodieCount, pantsCount, jacketCount, clothesCount }) => {
  // Prepare the data for the pie chart
  const data = {
    labels: ['T-shirts', 'Hoodies', 'Pants', 'Jackets'],
    datasets: [
      {
        data: [
          (tshirtCount / clothesCount) * 100,
          (hoodieCount / clothesCount) * 100,
          (pantsCount / clothesCount) * 100,
          (jacketCount / clothesCount) * 100,
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.raw !== null) {
              label += `${context.raw.toFixed(2)}%`;
            }
            return label;
          },
        },
      },
    },
  };

  return <Pie data={data} options={options} />;
};

export default ClothesChart;