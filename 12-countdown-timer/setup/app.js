const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const oneDay = 24*60*60*1000;
const oneHour = 60*60*1000;
const oneMinute = 60*1000;
const giveaway = document.querySelector('.giveaway');
const deadline = document.querySelector('.deadline');
const items = document.querySelectorAll('.deadline-format h4');
let futureYear = new Date();
futureYear = futureYear.getFullYear() + 1;
let futureDate = new Date(futureYear,4,24,1,30,0);

const year = futureDate.getFullYear();
const hour = futureDate.getHours();
const minute = futureDate.getMinutes();
const month = months[futureDate.getMonth()];
const day = weekdays[futureDate.getDay()];
const date = futureDate.getDate();
giveaway.textContent = `giveaway ends on ${day} ${month} ${date} ${year}, ${hour}:${minute}am`;

function getRemainingTime(){
  const today = new Date().getTime();
  future = futureDate.getTime();
  difference = future - today;
  let days = difference/oneDay;
  days = Math.floor(days);
  let hours = (difference % oneDay)/oneHour;
  hours = Math.floor(hours);
  let minutes = Math.floor((difference%oneHour)/oneMinute);
  let seconds = Math.floor((difference%oneMinute)/1000);
  const values = [days, hours, minutes, seconds];
  items.forEach((item, index) => {
    item.innerHTML = format(values[index]);
  });
  if (difference<0){
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class='expired'>sorry, this giveaway has expired.</h4>`
  };
};

function format(item){
  if(item < 10 && item > 0){
    return item = `0${item}`
  }
  if(item < 0){
    return item = "00"
  }
  return item
}

let countdown = setInterval(getRemainingTime,1000);
getRemainingTime();




