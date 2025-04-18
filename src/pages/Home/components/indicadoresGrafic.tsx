import ReactApexChart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts';

interface Props {
    series: ApexOptions["series"]
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

function IndicadoresGrafic({ series }:Props) {

  return (
    <ReactApexChart
          options={optionsArea}
          series={series}
          type="area"
          height={550}
        />
  )
}

export default IndicadoresGrafic