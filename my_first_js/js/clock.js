const clock = document.querySelector("h2#clock");
clock.innerText = "lalalala";

function getDate(){
    const date = new Date();
    // padStart, padEnd -> a의 길이에 모자란 만큼 b값으로 채움
    const hours = String(date.getHours()).padStart(2,"0");
    const minutes = String(date.getMinutes()).padStart(2,"0");
    const seconds = String(date.getSeconds()).padStart(2,"0");
    clock.innerText = `${hours}:${minutes}:${seconds}`;
}

// setInterval -> 매 n초마다 함수 실행
//setTimeout(sayHello,5000)  timeout -> n초 후 함수 한 번 실행

getDate();
setInterval(getDate,1000);

