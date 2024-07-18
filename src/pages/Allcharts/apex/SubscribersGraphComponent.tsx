import React, { useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import getChartColorsArray from "../../../Components/Common/ChartDynamicColor";

import { CountGraph } from "pages/BD/types";

const SubscribersGraphComponent = ({
  dataColors,
  data,
}: {
  dataColors: any;
  data: CountGraph[];
}) => {
  const apaexlineChartColors = getChartColorsArray(dataColors);

  // const selectedProperties = createSelector(
  //   (state: EcoActionBD) => state.bd,
  //   (bd) => ({
  //     loading: bd.loading,
  //     subscribersGraph: bd.subscribersGraph,
  //   })
  // );

  // const { subscribersGraph, loading }: any = useSelector(selectedProperties);

  // const dispatch: any = useDispatch();

  // useEffect(() => {
  //   dispatch(getGraphSubscribers());
  // }, [dispatch]);

  console.log(data);

  const values = data.map((each) => each.count);
  const labels = data.map((each) => each.label);

  const series = [
    // { name: "Total", data: [26, 24, 32, 360, 33, 31, 33, 0, 0, 0, 0] },
    { name: "Total", data: values },

    // { name: "Low - 2018", data: [14, 11, 16, 12, 17, 13, 12] },
  ];
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
      // {
      //   name: "Low - 2018",
      //   data: [14, 11, 16, 12, 17, 13, 12],
      // },
    ],
    title: {
      text: "Subscribers",
      align: "left",
      style: {
        fontWeight: "500",
      },
    },
    grid: {
      row: {
        colors: ["transparent", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.2,
      },
      borderColor: "#f1f1f1",
    },
    markers: {
      style: "inverted",
      size: 6,
    },
    xaxis: {
      // categories: [
      //   "Jan",
      //   "Feb",
      //   "Mar",
      //   "Apr",
      //   "May",
      //   "Jun",
      //   "Jul",
      //   "Aug",
      //   "Sep",
      //   "Oct",
      //   "Nov",
      //   "Dec",
      // ],
      categories: labels,
      title: {
        text: "Month",
      },
    },
    yaxis: {
      title: {
        text: "Subscribers",
      },
      // min: 5,
      // max: 40,
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
      {/* {loading && <Spinners />} */}
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

export default SubscribersGraphComponent;
