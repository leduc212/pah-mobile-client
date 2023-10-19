// Condition number to text
export const auctionStatusText = (auctionStatus) => {
    let result = 'Đã kết thúc'
    switch (auctionStatus) {
        case 4:
            result = 'Sắp diễn ra'
            break;
        case 5:
            result = 'Đang diễn ra'
            break;
        case 6:
            result = 'Đã kết thúc'
            break;
        case 7:
            result = 'Đã kết thúc không giá thầu '
            break;
    }
    return result;
}