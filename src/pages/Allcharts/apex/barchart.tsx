import React from "react";
import ReactApexChart from "react-apexcharts";
import getChartColorsArray from "../../../Components/Common/ChartDynamicColor";

const barchart = ({ dataColors, data }: any) => {
  const spineareaChartColors = getChartColorsArray(dataColors);
  const samplesGraph = data;
  const values = samplesGraph.map((eachCount: any) => eachCount.count);
  const labels = samplesGraph.map((eachLabel: any) => eachLabel.name);

  const series = [
    {
      data: values,
    },
  ];
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },

    colors: spineareaChartColors,
    grid: {
      borderColor: "#f1f1f1",
    },
    xaxis: {
      categories: labels,
    },
  };

  return (
    <React.Fragment>
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height="400"
      />
    </React.Fragment>
  );
};

export default barchart;
