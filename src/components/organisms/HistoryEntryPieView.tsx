import { IDataHistoryEntry } from "../../lib/DataHistoryDatabase";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { formatPrice } from "../../lib/helpers";

const COLORS = [
  "#2965CC",
  "#29A634",
  "#D99E0B",
  "#D13913",
  "#8F398F",
  "#00B3A4",
  "#DB2C6F",
  "#9BBF30",
  "#96622D",
  "#7157D9",
];

interface IProps {
  entry: IDataHistoryEntry;
}

const HistoryEntryPieView = ({ entry }: IProps) => {
  const { prices, userData } = entry;
  const series = userData.items.map((i) => Number(i.amount) * (prices[i.fSym]?.[userData.tSym] || 0));
  const options: ApexOptions = {
    chart: {
      animations: {
        speed: 400,
        dynamicAnimation: {
          speed: 200,
        },
      },
    },
    legend: {
      position: "bottom",
      horizontalAlign: "left",
    },
    labels: userData.items.map((i) => i.fSym),
    dataLabels: {
      formatter: (_, { seriesIndex, w }) => w.config.labels[seriesIndex],
    },
    colors: COLORS,
    tooltip: {
      followCursor: false,
      y: {
        formatter: (val) => formatPrice(val, entry.userData.tSym),
      },
    },
    plotOptions: {
      pie: {
        offsetY: 50,
        customScale: 1.5,
      },
    },
  };
  return <Chart options={options} series={series} type="donut" />;
};

export default HistoryEntryPieView;
