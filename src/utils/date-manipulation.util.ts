export const getMonthAndYearString = (date: Date): string => {
    const [_weekday, month, _day, year] = date.toDateString().split(' ');
    return `${month} ${year}`
}