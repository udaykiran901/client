import React from "react";
import ReactEcharts from "echarts-for-react";
import getChartColorsArray from "../../../Components/Common/ChartDynamicColor";

const Pie = ({ dataColors, data }: any) => {
  const PieEChartColors = getChartColorsArray(dataColors);

  const options = {
    toolbox: {
      show: false,
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    legend: {
      orient: "vertical",
      left: "left",
      data: ["CHEMICAL", "PHYSICAL"],
      textStyle: {
        color: ["#8791af"],
      },
    },
    color: PieEChartColors,
    series: [
      {
        name: "Total Params",
        type: "pie",
        radius: "60%",
        center: ["50%", "60%"],
        data: [...data],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };
  return (
    <React.Fragment>
      <p>Discipline Wise Statistics</p>
      <ReactEcharts style={{ height: "400px" }} option={options} />
    </React.Fragment>
  );
};
export default Pie;
