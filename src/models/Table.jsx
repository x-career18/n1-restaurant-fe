// Thể hiện thông tin của bàn ăn

export const Table = {
    tableId: "",
    status: "",
    floor: '1',
    tablenumber: "Bàn số 0",
    numberSeat: "6",
    shape: "Vuông"
};

const createTable = ({
    restaurantName,
    tableId,
    totalCountTable,
    checkinTime,
    status,
    image,
}) => {
    return {
        restaurantName,
        tableId,
        totalCountTable,
        checkinTime,
        status,
        image
    }
}

export default createTable;