import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat)

const getDate = ({ date, expired = 0 }) => {
    return `${date.$y}-${date.$M + 1}-${date.$D}T${date.$H}:${date.$m + expired}:${date.$s}Z`;
}

const pasreStringtoData = (dateString) => {
    return dayjs(dateString).format("HH:mm:ss DD-MM-YYYY");
}

export { getDate, pasreStringtoData };