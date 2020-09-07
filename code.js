//Realtid
const timeP = document.querySelector("#realTime");
const chatT = document.querySelector("#chatTime");
// skapar interval med uppdatering av tiden
// varje minut
function updateTime() {
  nIntervId = setInterval(realTime, 1000 * 1);
}

//kollar tiden och sätter den i statusbaren
function realTime() {
  var nD = new Date();
  var h = nD.getHours();
  var m = nD.getMinutes();
  if (h < 10) {
    h = "0" + h;
  }
  if (m < 10) {
    m = "0" + m;
  }
  var time = h + ":" + m;
  timeP.textContent = time;
}
//Väntar till ett element har "end" class och isåfall visas valmöjligheterna
//och storleken på smsrutan ändras
function onStartOB() {
  var optionPick = document.querySelector(".option-picker");
  var chatbox = document.querySelector(".iphone-chat");
  var cp = document.querySelector("#cp");
  if (optionPick.style.display == "none" && cp) {
    addOB();
  } else {
    removeOB();
  }
}

//Visar valen
function addOB() {
  var optionPick = document.querySelector(".option-picker");
  var chatbox = document.querySelector(".iphone-chat");
  optionPick.style.display = "block";
  chatbox.style.height = "75%";
}

//Tar bort valen
function removeOB() {
  var optionPick = document.querySelector(".option-picker");
  var chatbox = document.querySelector(".iphone-chat");
  optionPick.style.display = "none";
  chatbox.style.height = "97%";
}

//Tar bort checkpoint
function removeCheckPoint(val) {
  document.querySelector("#cp").removeAttribute("id");
  removeOB();
}

var val1 = document.querySelector("#a");
val1.addEventListener("click", removeCheckPoint);
var val2 = document.querySelector("#b");
val2.addEventListener("click", removeCheckPoint);
var val3 = document.querySelector("#c");
val3.addEventListener("click", removeCheckPoint);

realTime();
updateTime();
onStartOB();
