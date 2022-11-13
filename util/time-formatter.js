export default function formatTime(time) {
  var milliseconds = parseInt((time % 1000) / 100),
    seconds = parseInt((time / 1000) % 60),
    minutes = parseInt((time / (1000 * 60)) % 60),
    hours = parseInt(time / (1000 * 60 * 60));

  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  return `${hours}:${minutes}:${seconds}.000`;
}
