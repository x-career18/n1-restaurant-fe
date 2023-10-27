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
    restaurantId,
    tableId,
    status,
    image,
    tableName,
}) => {
    return {
        restaurantId,
        tableId,
        status,
        image,
        tableName,
    }
}

export default createTable;