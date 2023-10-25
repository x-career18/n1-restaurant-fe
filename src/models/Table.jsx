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
}) => {
    return {
        restaurantName,
        tableId,
        totalCountTable,
        checkinTime,
        status,
    }
}

export default createTable;