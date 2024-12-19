import { useMemo } from 'react'
import { Predictions } from '../../../models/utils/Predictions'
import ReactApexChart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts';

interface Props {
    predictions: Predictions[]
}

const optionsArea: ApexOptions = {
    chart: {
      type: "area",
      width: '100px',
      id: "actions",
      toolbar: {
        autoSelected: "pan",
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
        enabled: false
    },
    markers: {
        size: 0
    },
    stroke: {
        curve: 'smooth'
    },
    fill: {
        type: 'gradient',
        gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.5,
            opacityTo: 0,
            stops: [0, 90, 100]
        },
    },
    xaxis: {
      type: "datetime",
    },
  };

function PredictionGrafic({ predictions }:Props) {
    const series: ApexAxisChartSeries = useMemo(() => {
        const formatMaxData = predictions.map((item) => {
            return {
                x: item.timestamp,
                y: item.high,
            };
        })
        const formatLowData = predictions.map((item) => {
            return {
                x: item.timestamp,
                y: item.low,
            };
        })
        return [
            { 
                name: 'High',
                color: 'green',
                data: formatMaxData
            },
            {
                name: 'Low',
                color: 'red',
                data: formatLowData
            }
        ];
      }, [predictions]);

  return (
    <ReactApexChart
          options={optionsArea}
          series={series}
          type="area"
          height={550}
        />
  )
}

export default PredictionGrafic