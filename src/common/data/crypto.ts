//import Images
import avatar2 from "../../assets/images/users/avatar-2.jpg";
import avatar3 from "../../assets/images/users/avatar-3.jpg";
import avatar8 from "../../assets/images/users/avatar-8.jpg";
import avatar5 from "../../assets/images/users/avatar-5.jpg";
import avatar1 from "../../assets/images/users/avatar-1.jpg";
import blog1 from "../../assets/images/crypto/blog/img-1.jpg";
import blog2 from "../../assets/images/crypto/blog/img-2.jpg";
import blog3 from "../../assets/images/crypto/blog/img-3.jpg";

const wallet = {
  id: "#SK0234",
  userName: "Henry Wells",
  email: "henrywells@abc.com",
  availableBalance: "$ 9148.23",
  lastMonthDifference: "+ $ 248.35",
  lastMonthDifferencePercent: "+ 1.3 %",
  send: "$ 654.42",
  receive: "$ 1054.32",
  withdraw: "$ 824.34",
  series: [
    {
      type: "area",
      name: "BTC",
      data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47],
    },
    {
      type: "area",
      name: "ETH",
      data: [28, 41, 52, 42, 13, 18, 29, 18, 36, 51, 55, 35],
    },
    {
      type: "line",
      name: "LTC",
      data: [45, 52, 38, 24, 33, 65, 45, 75, 54, 18, 28, 10],
    },
  ],
  options: {
    chart: { toolbar: { show: !1 } },
    dataLabels: { enabled: !1 },
    stroke: { curve: "smooth", width: 2, dashArray: [0, 0, 3] },
    fill: { type: "solid", opacity: [0.15, 0.05, 1] },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    colors: ["#f1b44c", "#556ee6", "#50a5f1"],
  },
  walletHistory: [
    {
      id: "#SK3215",
      date: "03 Mar, 2020",
      type: "Buy",
      currency: "Bitcoin",
      amount: "1.00952 BTC",
      amountinUSD: "$ 9067.62",
    },
    {
      id: "#SK3216",
      date: "04 Mar, 2020",
      type: "Sell",
      currency: "Ethereum",
      amount: "0.00413 ETH",
      amountinUSD: "$ 2123.01",
    },
    {
      id: "#SK3217",
      date: "04 Mar, 2020",
      type: "Buy",
      currency: "Bitcoin",
      amount: "1.00952 BTC",
      amountinUSD: "$ 9067.62",
    },
    {
      id: "#SK3218",
      date: "03 Mar, 2020",
      type: "Buy",
      currency: "Bitcoin",
      amount: "1.00952 BTC",
      amountinUSD: "$ 9067.62",
    },
    {
      id: "#SK3219",
      date: "03 Mar, 2020",
      type: "Buy",
      currency: "Bitcoin",
      amount: "1.00952 BTC",
      amountinUSD: "$ 9067.62",
    },
    {
      id: "#SK3220",
      date: "03 Mar, 2020",
      type: "Buy",
      currency: "Bitcoin",
      amount: "1.00952 BTC",
      amountinUSD: "$ 9067.62",
    },
    {
      id: "#SK3221",
      date: "03 Mar, 2020",
      type: "Buy",
      currency: "Bitcoin",
      amount: "1.00952 BTC",
      amountinUSD: "$ 9067.62",
    },
    {
      id: "#SK3222",
      date: "03 Mar, 2020",
      type: "Buy",
      currency: "Bitcoin",
      amount: "1.00952 BTC",
      amountinUSD: "$ 9067.62",
    },
    {
      id: "#SK3223",
      date: "03 Mar, 2020",
      type: "Buy",
      currency: "Bitcoin",
      amount: "1.00952 BTC",
      amountinUSD: "$ 9067.62",
    },
    {
      id: "#SK3224",
      date: "03 Mar, 2020",
      type: "Buy",
      currency: "Bitcoin",
      amount: "1.00952 BTC",
      amountinUSD: "$ 9067.62",
    },
    {
      id: "#SK3225",
      date: "03 Mar, 2020",
      type: "Buy",
      currency: "Bitcoin",
      amount: "1.00952 BTC",
      amountinUSD: "$ 9067.62",
    },
    {
      id: "#SK3226",
      date: "03 Mar, 2020",
      type: "Buy",
      currency: "Bitcoin",
      amount: "1.00952 BTC",
      amountinUSD: "$ 9067.62",
    },
  ],
};

const cryptoOrders = [
  {
    date: "03 Mar, 2020",
    type: "Buy",
    coin: "Bitcoin",
    value: "1.00952 BTC",
    valueinUSD: "$ 9067.62",
    status: "completed",
  },
  {
    date: "04 Mar, 2020",
    type: "Sell",
    coin: "Ethereum",
    value: "0.00413 ETH	",
    valueinUSD: "$ 2123.01",
    status: "completed",
  },
  {
    date: "04 Mar, 2020",
    type: "Buy",
    coin: "Bitcoin",
    value: "0.00321 BTC	",
    valueinUSD: "$ 1802.62",
    status: "pending",
  },
  {
    date: "05 Mar, 2020",
    type: "Buy",
    coin: "Litecoin",
    value: "0.00224 LTC",
    valueinUSD: "$ 1773.01",
    status: "completed",
  },
  {
    date: "06 Mar, 2020",
    type: "Buy",
    coin: "Ethereum",
    value: "Ethereum",
    valueinUSD: "$ 9423.73",
    status: "failed",
  },
  {
    date: "07 Mar, 2020",
    type: "Buy",
    coin: "Bitcoin",
    value: "1.00952 BTC",
    valueinUSD: "$ 9067.62",
    status: "completed",
  },
  {
    date: "07 Mar, 2020",
    type: "Sell",
    coin: "Ethereum",
    value: "0.00413 ETH	",
    valueinUSD: "$ 2123.01",
    status: "completed",
  },
  {
    date: "08 Mar, 2020",
    type: "Buy",
    coin: "Bitcoin",
    value: "0.00321 BTC	",
    valueinUSD: "$ 1802.62",
    status: "pending",
  },
  {
    date: "09 Mar, 2020",
    type: "Buy",
    coin: "Litecoin",
    value: "0.00224 LTC",
    valueinUSD: "$ 1773.01",
    status: "completed",
  },
  {
    date: "10 Mar, 2020",
    type: "Buy",
    coin: "Ethereum",
    value: "Ethereum",
    valueinUSD: "$ 9423.73",
    status: "pending",
  },
  {
    date: "10 Mar, 2020",
    type: "Buy",
    coin: "Bitcoin",
    value: "1.00952 BTC",
    valueinUSD: "$ 9067.62",
    status: "completed",
  },
  {
    date: "11 Mar, 2020",
    type: "Sell",
    coin: "Ethereum",
    value: "0.00413 ETH	",
    valueinUSD: "$ 2123.01",
    status: "completed",
  },
  {
    date: "12 Mar, 2020",
    type: "Buy",
    coin: "Bitcoin",
    value: "0.00321 BTC	",
    valueinUSD: "$ 1802.62",
    status: "pending",
  },
  {
    date: "13 Mar, 2020",
    type: "Buy",
    coin: "Litecoin",
    value: "0.00224 LTC",
    valueinUSD: "$ 1773.01",
    status: "completed",
  },
  {
    date: "14 Mar, 2020",
    type: "Buy",
    coin: "Ethereum",
    value: "Ethereum",
    valueinUSD: "$ 9423.73",
    status: "failed",
  },
  {
    date: "15 Mar, 2020",
    type: "Buy",
    coin: "Litecoin",
    value: "0.00224 LTC",
    valueinUSD: "$ 1773.01",
    status: "completed",
  },
];

const productData = [
  {
    id: 1,
    idno: "#SK3215",
    pdate: "03 Mar, 2020",
    type: "Buy",
    coin: "Bitcoin",
    amount: "1.00952 BTC",
    valueInUsd: "$ 9067.62",
  },
  {
    id: 2,
    idno: "#SK3216",
    pdate: "04 Mar, 2020",
    type: "Sell",
    coin: "Ethereum",
    amount: "0.00413 ETH",
    valueInUsd: "$ 2123.01",
  },
  {
    id: 3,
    idno: "#SK3217",
    pdate: "04 Mar, 2020",
    type: "Buy",
    coin: "Bitcoin",
    amount: "0.00321 BTC",
    valueInUsd: "$ 1802.621",
  },
  {
    id: 4,
    idno: "#SK3218",
    pdate: "05 Mar, 2020",
    type: "Buy",
    coin: "Litecoin",
    amount: "0.00224 LTC",
    valueInUsd: "$ 1773.01",
  },
  {
    id: 5,
    idno: "#SK3219",
    pdate: "06 Mar, 2020",
    type: "Buy",
    coin: "Ethereum",
    amount: "1.04321 ETH",
    valueInUsd: "$ 9423.73",
  },
  {
    id: 6,
    idno: "#SK3220",
    pdate: "07 Mar, 2020",
    type: "Sell",
    coin: "Bitcoin",
    amount: "0.00413 LTC",
    valueInUsd: "$ 2123.01",
  },
  {
    id: 7,
    idno: "#SK3221",
    pdate: "07 Mar, 2020",
    type: "Buy",
    coin: "Bitcoin",
    amount: "1.00952 BTC",
    valueInUsd: "$ 9067.62",
  },
  {
    id: 8,
    idno: "#SK3222",
    pdate: "08 Mar, 2020",
    type: "Sell",
    coin: "Ethereum",
    amount: "0.00413 ETH",
    valueInUsd: "$ 2123.01",
  },
  {
    id: 9,
    idno: "#SK3223",
    pdate: "09 Mar, 2020",
    type: "Sell",
    coin: "Litecoin",
    amount: "1.00952 LTC",
    valueInUsd: "$ 9067.62",
  },
  {
    id: 10,
    idno: "#SK3224",
    pdate: "10 Mar, 2020",
    type: "Buy",
    coin: "Ethereum",
    amount: "0.00413 ETH",
    valueInUsd: "$ 2123.01",
  },
  {
    id: 11,
    idno: "#SK3225",
    pdate: "11 Mar, 2020",
    type: "Buy",
    coin: "Bitcoin",
    amount: "1.00952 BTC",
    valueInUsd: "$ 9067.62",
  },
  {
    id: 12,
    idno: "#SK3226",
    pdate: "12 Mar, 2020",
    type: "Sell",
    coin: "Ethereum",
    amount: "0.00413 ETH",
    valueInUsd: "$ 2123.01",
  },
];

const wallets = [
  {
    id: 1,
    icon: "bitcoin",
    text: "warning",
    wallet: "Bitcoin",
    coine: "1.02356 BTC",
    price: "9148",
  },
  {
    id: 2,
    icon: "ethereum",
    text: "primary",
    wallet: "Ethereum",
    coine: "0.04121 ETH",
    price: "4721",
  },
  {
    id: 3,
    icon: "litecoin",
    text: "info",
    wallet: "litecoin",
    coine: "0.00356 BTC",
    price: "4721",
  },
];

const cryptoOrderData = [
  {
    id: 1,
    pdate: "03 Mar, 2020",
    type: "Buy",
    coin: "Bitcoin",
    value: "1.00952 BTC",
    valueInUsd: "$ 9067.62",
    status: "Completed",
  },
  {
    id: 2,
    pdate: "04 Mar, 2020",
    type: "Sell",
    coin: "Ethereum",
    value: "0.00413 ETH",
    valueInUsd: "$ 2123.01",
    status: "Completed",
  },
  {
    id: 3,
    pdate: "04 Mar, 2020",
    type: "Buy",
    coin: "Bitcoin",
    value: "0.00321 BTC",
    valueInUsd: "$ 1802.62",
    status: "Pending",
  },
  {
    id: 4,
    pdate: "05 Mar, 2020",
    type: "Buy",
    coin: "Litecoin",
    value: "0.00224 LTC",
    valueInUsd: "$ 1773.01",
    status: "Completed",
  },
  {
    id: 5,
    pdate: "06 Mar, 2020",
    type: "Buy",
    coin: "Ethereum",
    value: "1.04321 ETH",
    valueInUsd: "$ 9423.73",
    status: "Failed",
  },
  {
    id: 6,
    pdate: "07 Mar, 2020",
    type: "Sell",
    coin: "Bitcoin",
    value: "0.00413 ETH",
    valueInUsd: "$ 2123.01",
    status: "Completed",
  },
  {
    id: 7,
    pdate: "07 Mar, 2020",
    type: "Buy",
    coin: "Bitcoin",
    value: "1.00952 BTC",
    valueInUsd: "$ 9067.62",
    status: "Pending",
  },
  {
    id: 8,
    pdate: "08 Mar, 2020",
    type: "Sell",
    coin: "Ethereum",
    value: "0.00413 ETH",
    valueInUsd: "$ 2123.01",
    status: "Completed",
  },
  {
    id: 9,
    pdate: "09 Mar, 2020",
    type: "Sell",
    coin: "Litecoin",
    value: "1.00952 LTC",
    valueInUsd: "$ 9067.62",
    status: "Completed",
  },
  {
    id: 10,
    pdate: "10 Mar, 2020",
    type: "Buy",
    coin: "Ethereum",
    value: "0.00413 ETH",
    valueInUsd: "$ 2123.01",
    status: "Pending",
  },
  {
    id: 11,
    pdate: "11 Mar, 2020",
    type: "Buy",
    coin: "Ethereum",
    value: "1.04321 ETH",
    valueInUsd: "$ 9423.73",
    status: "Completed",
  },
  {
    id: 12,
    pdate: "12 Mar, 2020",
    type: "Sell",
    coin: "Bitcoin",
    value: "0.00413 ETH",
    valueInUsd: "$ 2123.01",
    status: "Completed",
  },
  {
    id: 13,
    pdate: "03 Mar, 2020",
    type: "Buy",
    coin: "Bitcoin",
    value: "1.00952 BTC",
    valueInUsd: "$ 9067.62",
    status: "Completed",
  },
  {
    id: 14,
    pdate: "04 Mar, 2020",
    type: "Sell",
    coin: "Ethereum",
    value: "0.00413 ETH",
    valueInUsd: "$ 2123.01",
    status: "Completed",
  },
  {
    id: 15,
    pdate: "04 Mar, 2020",
    type: "Buy",
    coin: "Bitcoin",
    value: "0.00321 BTC",
    valueInUsd: "$ 1802.62",
    status: "Pending",
  },
  {
    id: 16,
    pdate: "05 Mar, 2020",
    type: "Buy",
    coin: "Litecoin",
    value: "0.00224 LTC",
    valueInUsd: "$ 1773.01",
    status: "Completed",
  },
  {
    id: 17,
    pdate: "06 Mar, 2020",
    type: "Buy",
    coin: "Ethereum",
    value: "1.04321 ETH",
    valueInUsd: "$ 9423.73",
    status: "Failed",
  },
  {
    id: 18,
    pdate: "07 Mar, 2020",
    type: "Sell",
    coin: "Bitcoin",
    value: "0.00413 ETH",
    valueInUsd: "$ 2123.01",
    status: "Completed",
  },
  {
    id: 19,
    pdate: "07 Mar, 2020",
    type: "Buy",
    coin: "Bitcoin",
    value: "1.00952 BTC",
    valueInUsd: "$ 9067.62",
    status: "Pending",
  },
  {
    id: 20,
    pdate: "08 Mar, 2020",
    type: "Sell",
    coin: "Ethereum",
    value: "0.00413 ETH",
    valueInUsd: "$ 2123.01",
    status: "Completed",
  },
  {
    id: 21,
    pdate: "09 Mar, 2020",
    type: "Sell",
    coin: "Litecoin",
    value: "1.00952 LTC",
    valueInUsd: "$ 9067.62",
    status: "Completed",
  },
  {
    id: 22,
    pdate: "10 Mar, 2020",
    type: "Buy",
    coin: "Ethereum",
    value: "0.00413 ETH",
    valueInUsd: "$ 2123.01",
    status: "Pending",
  },
  {
    id: 23,
    pdate: "11 Mar, 2020",
    type: "Buy",
    coin: "Ethereum",
    value: "1.04321 ETH",
    valueInUsd: "$ 9423.73",
    status: "Completed",
  },
  {
    id: 24,
    pdate: "12 Mar, 2020",
    type: "Sell",
    coin: "Bitcoin",
    value: "0.00413 ETH",
    valueInUsd: "$ 2123.01",
    status: "Completed",
  },
];

const icoLandingTeam = [
  {
    id: 1,
    img: avatar2,
    author: "Mark Hurley",
    post: "CEO & Lead",
  },
  {
    id: 2,
    img: avatar3,
    author: "Calvin Smith",
    post: "Blockchain developer",
  },
  {
    id: 3,
    img: avatar8,
    author: "Vickie Sample",
    post: "Designer",
  },
  {
    id: 4,
    img: avatar5,
    author: "Alma Farley",
    post: "App developer",
  },
  {
    id: 6,
    img: avatar1,
    author: "Amy Hood",
    post: "Designer",
  },
];

const blogs = [
  {
    imgUrl: blog1,
    tag: "Popular",
    date: "800+ Projects",
    title: "STRUCTURAL HEALTH MONITORING",
    desc: "Ensure the longevity and safety of your structures through our advanced Structural Health Monitoring services. We use cutting-edge technology to detect and assess st",
  },
  {
    imgUrl: blog2,
    tag: "Cryptocurrency",
    date: "12 Feb, 2020",
    title: "Aenean ut eros et nisl",
    desc: "Everyone realizes why a new common language would be desirable",
  },
  {
    imgUrl: blog3,
    tag: "Cryptocurrency",
    date: "06 Jan, 2020",
    title: "In turpis, pellentesque posuere",
    desc: "To an English person, it will seem like simplified English, as a skeptical Cambridge",
  },
];

const orderbookData = [
  {
    column1: "0.0412",
    column2: "0.0412",
    column3: "256.18",
    column4: "0.0201",
    column5: "0.0201",
    column6: "124.98",
  },
  {
    column1: "0.0301",
    column2: "0.0301",
    column3: "187.16",
    column4: "0.0165",
    column5: "0.0165",
    column6: "102.60",
  },
  {
    column1: "0.0523",
    column2: "0.0523",
    column3: "325.21",
    column4: "0.0348",
    column5: "0.0348",
    column6: "216.39",
  },
  {
    column1: "0.0432",
    column2: "0.0432",
    column3: "268.62",
    column4: "0.0321",
    column5: "0.0321",
    column6: "199.60",
  },
  {
    column1: "0.0246",
    column2: "0.0246",
    column3: "152.96",
    column4: "0.0403",
    column5: "0.0403",
    column6: "250.59",
  },
];

const cryptoDeposits = [
  {
    id: 1,
    name: "Bitcoin",
    symbol: "BTC",
    annualYield: "4.05 %",
    amount: "0.00745 BTC",
    color: "warning",
    icon: "mdi mdi-bitcoin",
  },
  {
    id: 2,
    name: "Ethereum",
    symbol: "ETH",
    annualYield: "5.08 %",
    amount: "0.0056 ETH",
    color: "primary",
    icon: "mdi mdi-ethereum",
  },
  {
    id: 3,
    name: "Litecoin",
    symbol: "LTC",
    annualYield: "4.12 %",
    amount: "0.00245 LTC",
    color: "info",
    icon: "mdi mdi-litecoin",
  },
];

const cryptoHowitwork = [
  {
    id: 1,
    title: "Register account",
    icon: "bx bx-user-plus",
    description:
      "New common language will be more simple and regular than the existing.",
  },
  {
    id: 2,
    title: "Select Deposit",
    icon: "bx bx-copy-alt",
    description:
      "To achieve this, it would be necessary to have uniform grammar.",
  },
  {
    id: 3,
    title: "Get Earnings",
    icon: "bx bx-cloud-download",
    description:
      "New common language will be more simple and regular than the existing.",
  },
];

const cryptoMyAssets = [
  {
    id: 1,
    icon: "mdi mdi-bitcoin",
    color: "warning",
    title: "BTC",
    investRate: "1.2601",
    investPrice: "6225.74",
    price: "7525.47",
    loansRate: "0.1512",
    loansPrice: "742.32",
    totalRate: "4.2562",
    totalPrice: "6425.42",
  },
  {
    id: 2,
    icon: "mdi mdi-ethereum",
    color: "primary",
    title: "ETH",
    investRate: "0.0814",
    investPrice: "3256.29",
    price: "4235.78",
    loansRate: "0.0253",
    loansPrice: "675.04",
    totalRate: "0.0921",
    totalPrice: "4536.24",
  },
  {
    id: 3,
    icon: "mdi mdi-litecoin",
    color: "info",
    title: "LTC",
    investRate: "0.0682",
    investPrice: "2936.14",
    price: "3726.06",
    loansRate: "0.0234",
    loansPrice: "523.17",
    totalRate: "0.0823",
    totalPrice: "3254.23",
  },
  {
    id: 4,
    icon: "mdi mdi-bitcoin",
    color: "warning",
    title: "BTC",
    investRate: "1.2601",
    investPrice: "6225.74",
    price: "7525.47",
    loansRate: "0.1512",
    loansPrice: "742.32",
    totalRate: "4.2562",
    totalPrice: "6425.42",
  },
  {
    id: 5,
    icon: "mdi mdi-ethereum",
    color: "primary",
    title: "ETH",
    investRate: "0.0814",
    investPrice: "3256.29",
    price: "4235.78",
    loansRate: "0.0253",
    loansPrice: "675.04",
    totalRate: "0.0921",
    totalPrice: "4536.24",
  },
];

export {
  wallet,
  cryptoOrders,
  productData,
  cryptoOrderData,
  icoLandingTeam,
  blogs,
  wallets,
  orderbookData,
  cryptoDeposits,
  cryptoHowitwork,
  cryptoMyAssets,
};
