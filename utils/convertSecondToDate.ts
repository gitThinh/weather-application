const converSecondToDate = (time?: number) => {
  const {t} = useI18n();

  const date = time ? new Date(time * 1000) : new Date();
  // const variable
  const daysOfWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const monthsOfYear = [
    "jan", "feb", "mar", "apr", "may", "jun",
    "jul", "aug", "sep", "oct", "nov", "dec"
  ];

  // timer
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  // day month
  const day = date.getDate().toString().padStart(2, "0");
  const month = t(`month.${monthsOfYear[date.getMonth()]}`);
  const year = date.getFullYear();
  const dayOfWeek = t(`day.${daysOfWeek[date.getDay()]}`);

  // string type "HH:MM"
  const timeString = `${hours}:${minutes}`;

  const getDayMonth = (haveYear = false) => {
    return haveYear
      ? `${dayOfWeek}, ${day} ${month} ${year}`
      : `${dayOfWeek}, ${day} ${month}`;
  };
  
  const getDayNumber = () => {
    return `${day}/${date.getMonth()}`;
  };

  return {
    date: date,
    formattedTime: timeString,
    getDayMonth,
    getDayNumber,
  };
};

export default converSecondToDate;
