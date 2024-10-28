const converSecondToDate = (time?: number) => {
  const date = time ? new Date(time * 1000) : new Date();
  // const variable
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const monthsOfYear = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
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

  const getDayMonth = (haveYear = false) => {
    return haveYear
      ? `${dayOfWeek}, ${day} ${month} ${year}`
      : `${dayOfWeek}, ${day} ${month}`;
  };

  return {
    date: date,
    formattedTime: timeString,
    getDayMonth,
  };
};

export default converSecondToDate;
