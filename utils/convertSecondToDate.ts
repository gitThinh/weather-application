const converSecondToDate = (time?: number) => {
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
  const month = monthsOfYear[date.getMonth()];
  const year = date.getFullYear();
  const dayOfWeek = daysOfWeek[date.getDay()];

  // string type "HH:MM"
  const timeString = `${hours}:${minutes}`;

  const getDayNumber = () => {
    return `${day}/${date.getMonth() + 1}`;
  };

  return {
    day,
    month,
    dayOfWeek,
    date: date,
    formattedTime: timeString,
    getDayNumber,
  };
};

export default converSecondToDate;
