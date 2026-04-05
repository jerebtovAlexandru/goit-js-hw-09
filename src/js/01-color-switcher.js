
const  refs = {
bodyRef:document.querySelector ('body'),
btnStartRef:document.querySelector('button[data-start]'),
btnStopRef:document.querySelector('button[data-stop]')
}
let stateIsActive = false;
refs.btnStartRef.addEventListener('click', onStart);
refs.btnStopRef.addEventListener('click' ,  onStop);
 
 

 function onChangeColor () {
    const color = getRandomHexColor();
   refs.bodyRef.style.backgroundColor =`${color}`; 
 };

  function onStart () {
    if(stateIsActive){
    return
    }
    if(stateIsActive  === false){
timerId = setInterval (onChangeColor,
    1000 );
    }
    stateIsActive = true;
  };

  function onStop () {
    clearInterval(timerId);
    stateIsActive = false;
    refs.bodyRef.removeAttribute('style');
  };


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
};