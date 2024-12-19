import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useMemo } from "react";
import { ResultAlpaca } from "../../../models/utils/ResultAlpaca";
interface Props {
  data: ResultAlpaca[];
}

const optionsBelas: ApexOptions = {
  chart: {
    type: "candlestick",
    width: '100%',
    id: "actions",
    toolbar: {
      autoSelected: "pan",
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },
  plotOptions: {
    candlestick: {
      colors: {
        upward: "#31b752",
        downward: "#cc2634",
      },
    },
  },
  xaxis: {
    type: "datetime",
  },
};

const opctionsVolumenGenerate = (lastDate: Date): ApexOptions => {
    const minDate = new Date(lastDate)
    minDate.setDate(lastDate.getDate() - 10)
    return {
        chart: {
            type: 'bar',
            height: 160,
            brush: {
                enabled: true,
                target: 'candles',
            },
            selection: {
                enabled: true,
                xaxis: {
                    min: minDate.getTime(),
                    max: lastDate.getTime(),
                },
                fill: {
                    color: '#ccc',
                    opacity: 0.4
                },
                stroke: {
                    color: '#0D47A1',
                }
            }
        },
        dataLabels: {
            enabled: false
        },
        plotOptions: {
            bar: {
                columnWidth: '80%',
                colors: {
                    ranges: [{
                        from: -1000,
                        to: 0,
                        color: '#F15B46'
                    }, {
                        from: 1,
                        to: 10000,
                        color: '#FEB019'
                    }],
                },
            }
        },
        stroke: {
            width: 0
        },
        xaxis: {
            type: 'datetime',
            axisBorder: {
                offsetX: 13
            }
        },
        yaxis: {
            labels: {
                show: false
            }
        }
    }
}

function FinancialGrafic({ data }: Props) {
  const series: ApexAxisChartSeries = useMemo(() => {
    const formatData = data.map((item) => {
        return {
            x: item.timestamp,
            y: [item.open, item.high, item.low, item.close],
        };
    })
    return [{ data: formatData }];
  }, [data]);

  const optionsVolumen: ApexOptions = useMemo(() => {
    return opctionsVolumenGenerate(data[data.length - 1].timestamp)
  }, [data])

  const seriesVolumen: ApexAxisChartSeries = useMemo(() => {
      const formatVolumeData = data.map((item) => {
          return {
              x: item.timestamp,
              y: item.volume,
          };
      })
      return [
          {
              name: 'Volume',
              data: formatVolumeData
          }
      ]
  }, [data])

  return (
    <div style={{
    }} >
        <ReactApexChart
          options={optionsBelas}
          series={series}
          type="candlestick"
          width='100%'
          height={550}
        />
      <div>
        <ReactApexChart
          options={optionsVolumen}
          series={seriesVolumen}
          type='bar'
        />
      </div>
    </div>
  );
}

export default FinancialGrafic;
