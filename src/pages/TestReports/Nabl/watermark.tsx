import logo from './images/logo.jpeg'

type PageSize = {
    width: number;
    height: number;
};

type WatermarkProps = {
    currentPage: number;
    pageSize: PageSize;
};

const createWaterMark = ({ currentPage, pageSize }: WatermarkProps) => {
    return {
        image: logo,
        width: 300,
        height: 250,
        absolutePosition: {
            x: pageSize.width / 2 - 150,
            y: pageSize.height / 2 - 150,
        },
        opacity: 0.1,
    };
};

export default createWaterMark;
