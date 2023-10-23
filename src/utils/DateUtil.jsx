const getDate = ({ date, expired = 0 }) => {
    return `${date.$y}-${date.$M + 1}-${date.$D}T${date.$H}:${date.$m + expired}:${date.$s}Z`;
}

export { getDate };