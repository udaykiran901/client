import logo from './images/logo.jpeg'

const createHeader = () => {
    return {
        columns: [
            {
                image: logo,
                width: 70,
                margin: [2, 2, 2, 2],
            },
            {
                stack: [
                    {
                        text: "KDM ENGINEERS (INDIA) PRIVATE LIMITED",
                        alignment: "right",
                        fontSize: 21,
                        margin: [2, 2, 2, 2],
                        color: "#2596be",
                    },
                    {
                        text: "Complete Civil Engineering solutions",
                        alignment: "right",
                        fontSize: 10,
                        color: "red",
                        margin: [2, 2, 2, 2],
                    },
                ],
            },
        ],
        margin: [40, 10, 40, 10],
    };
};

export default createHeader;
