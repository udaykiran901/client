import React from "react";
import ReactApexChart from "react-apexcharts";
import getChartColorsArray from "../../../Components/Common/ChartDynamicColor";

import { CountGraph } from "pages/BD/types";

const CustomerRecordsLast30Count = ({
  dataColors,
  data,
}: {
  dataColors: any;
  data: CountGraph[];
}) => {
  const apaexlineChartColors = getChartColorsArray(dataColors);

  const values = data.map((each) => each.count);
  const labels = data.map((each) => each.label);

  console.log(data, values, labels);

  const series = [{ name: "Total", data: values }];
  const options: any = {
    chart: {
      height: 500,
      type: "line",
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: true,
      },
    },
    colors: apaexlineChartColors,
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: [3, 3],
      curve: "straight",
    },
    series: [
      {
        name: "Total",
        data: values,
      },
    ],
    title: {
      text: "Customers",
      align: "left",
      style: {
        fontWeight: "500",
      },
    },
    grid: {
      row: {
        colors: ["transparent", "transparent"],
        opacity: 0.2,
      },
      borderColor: "#f1f1f1",
    },
    markers: {
      style: "inverted",
      size: 6,
    },
    xaxis: {
      categories: labels,
      title: {
        text: "Date",
      },
    },
    yaxis: {
      title: {
        text: "Customers",
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      floating: true,
      offsetY: -25,
      offsetX: -5,
    },
    responsive: [
      {
        breakpoint: 600,
        options: {
          chart: {
            toolbar: {
              show: false,
            },
          },
          legend: {
            show: false,
          },
        },
      },
    ],
  };

  return (
    <React.Fragment>
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height="380"
        className="apex-charts"
      />
    </React.Fragment>
  );
};

export default CustomerRecordsLast30Count;
