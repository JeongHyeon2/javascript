const quotes = [ {
    "quote": "나 자신에 대한 자신감을 잃으면 온 세상이 나의 적이 된다.",
    "author": "랄프 왈도 에미슨"
},
{
    "quote": "인생에서 가장 슬픈 세 가지. 할 수 없는 것을 억지로 시도하는 것, 사랑하지 않는 사람과 함께하는 것, 그리고 원하지 않는 일을 하게 되는 것.",
    "author": "카우보이의 길"
},
{
    "quote": "인생은 짧고 예술은 길다.",
    "author": "히포크라테스"
},
{
    "quote": "인간은 자신의 생각에 의해 만들어진다.",
    "author": "마르쿠스 아우렐리우스"
},
{
    "quote": "인생에서 가장 중요한 것은 목적을 찾는 것입니다.",
    "author": "알버트 슈바이처"
},
{
    "quote": "인생은 불확실한 것이다. 그러나 그것은 불확실성 때문에 아름답다.",
    "author": "톰 하디"
},
{
    "quote": "인생에서 가장 큰 위험은 위험하지 않은 것입니다.",
    "author": "보잉"
},
{
    "quote": "인생에서 가장 중요한 결정 중 하나는 어떤 태도를 취할 것인가입니다.",
    "author": "찰스 R. 스윙글"
},
{
    "quote": "인생은 당신이 무엇을 만들어 내느냐에 따라서만 가치가 있다.",
    "author": "헨리 데이비드 소로"
},
{
    "quote": "인생에서 가장 중요한 것은 항상 현재 순간입니다.",
    "author": "고든 맥케이"
}]

const quote = document.querySelector("#quote span:first-child");
const author = document.querySelector("#quote span:last-child");

const todayQuote = quotes[Math.floor(Math.random()*quotes.length)];
quote.innerText = todayQuote.quote;
author.innerText = todayQuote.author;
