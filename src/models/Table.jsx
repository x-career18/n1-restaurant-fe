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
    tableId,
    image,
    status,
    floor,
    tablenumbe,
    numberSeat,
    shape
}) => {
    return {
        tableId,
        image,
        status,
        floor,
        tablenumbe,
        numberSeat,
        shape
    }
}

export default createTable;