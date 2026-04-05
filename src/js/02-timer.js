import flatpickr from "flatpickr";
import Notiflix from 'notiflix';
import "flatpickr/dist/flatpickr.min.css";
refs = {
    input:document.getElementById('datetime-picker'),
    btnStart:document.querySelector('[data-start]'),
    newDate : Date.now(),
    selectedTime : null,
    seconds: document.querySelector('span[data-seconds]'),
    minutes: document.querySelector('span[data-minutes]'),
    hours: document.querySelector('span[data-hours]'),
    days: document.querySelector('span[data-days]'),
    spanTexts:document.querySelectorAll('.value')
}
refs.btnStart.disabled = true;
refs.btnStart.addEventListener('click' , OnStart);
refs.input.disabled = false;




const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate:Date.now(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
  onChange (selectedDates){

   if(selectedDates[0] < refs.newDate){
    refs.btnStart.disabled = true;
Notiflix.Notify.failure("Please choose a date in the future");
   }else if (selectedDates[0] > refs.newDate){
    refs.btnStart.disabled = false;
    refs.selectedTime = selectedDates[0]

   }
  }
};
const fp = flatpickr(refs.input , options);



 function OnStart (){
    refs.btnStart.disabled = true;
    refs.input.disabled = true;
 

  const timerId = setInterval(() => {
    let  deltaTime = refs.selectedTime - Date.now();
    if(deltaTime < 0){
 clearInterval(timerId);
 refs.spanTexts.forEach(e => {
    e.textContent ='00';
 });
   refs.btnStart.disabled = true;
refs.input.disabled = false;

   return
    }
  const { days, hours, minutes, seconds } = convertMs(deltaTime);
  OnChangeTextContent( { days, hours, minutes, seconds });

 } , 1000);
 }

 function onStop(deltaTime , timerId){

 }

 function OnChangeTextContent ({ days, hours, minutes, seconds }) {
   refs.seconds.textContent = addLeadingZero(seconds);
   refs.minutes.textContent = addLeadingZero(minutes);
   refs.hours.textContent = addLeadingZero(hours);
   refs.days.textContent = addLeadingZero(days);
 }


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}