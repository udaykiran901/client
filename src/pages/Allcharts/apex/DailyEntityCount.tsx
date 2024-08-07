import React from "react";
import ReactApexChart from "react-apexcharts";
import getChartColorsArray from "../../../Components/Common/ChartDynamicColor";
import { DailyGraphAllTntities } from "pages/BD/types";

const DailyEntityCount = ({ data, dataColors }: any) => {
  const dailyCountAllEntities: DailyGraphAllTntities[] = data;

  const apaexlineChartColors = getChartColorsArray(dataColors);

  const xaxis = dailyCountAllEntities.map(
    (eachDay: DailyGraphAllTntities) => eachDay.label
  );

  const subscribers = dailyCountAllEntities.map(
    (eachDay: DailyGraphAllTntities) => eachDay.subscribers
  );
  const orders = dailyCountAllEntities.map(
    (eachDay: DailyGraphAllTntities) => eachDay.orders
  );
  const callbacks = dailyCountAllEntities.map(
    (eachDay: DailyGraphAllTntities) => eachDay.callBacks
  );

  const users = dailyCountAllEntities.map(
    (eachDay: DailyGraphAllTntities) => eachDay.users
  );
  const customers = dailyCountAllEntities.map(
    (eachDay: DailyGraphAllTntities) => eachDay.customers
  );

  const series = [
    { name: "Subscribers", data: subscribers },
    { name: "Orders", data: orders },
    { name: "Call backs Requests", data: callbacks },
    { name: "Customers", data: customers },
    { name: "Users", data: users },
  ];

  console.log(series, " this is seirs");

  const options: any = {
    chart: {
      height: 380,
      type: "line",
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
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
      { name: "Subscribers", data: subscribers },
      { name: "Orders", data: orders },
      { name: "Call backs", data: callbacks },
    ],
    title: {
      text: "Period",
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
      categories: xaxis,
      title: {
        text: "",
      },
    },
    yaxis: {
      title: {
        text: "No. of Records",
      },
      min: 0,
      max: 20,
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
    <ReactApexChart
      options={options}
      series={series}
      type="line"
      height="600"
      className="apex-charts"
    />
  );
};

export default DailyEntityCount;
