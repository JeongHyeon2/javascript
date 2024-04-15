function addText() {
  let x = document.getElementsByTagName("LI");
  document.getElementById("demo").innerHTML = x[1].innerHTML;
}
function menuTemp() {
  const iceMenu = document.getElementsByClassName("ice-menu");
  for (let i in [...iceMenu]) {
    iceMenu[i].style.color = "blue";
  }
  const hotMenu = document.getElementsByClassName("hot-menu");

  for (let i in [...hotMenu]) {
    hotMenu[i].style.color = "red";
  }
}
function removeMenu() {
  document.getElementById("demo").innerHTML = null;
}
function fontSizeUp() {
  const lis = document.querySelectorAll(".menu-box #menu-ul li");
  lis.forEach((x) => (x.style.fontSize = "30px"));
}

function popupSelected() {
  let demo = document.getElementsByClassName("select-textbox")[0];
  const lis = document.querySelectorAll(".menu-box #menu-ul li");
  let selectedNum = demo.value;

  if (selectedNum < 1 || selectedNum > lis.length) {
    alert("입력이 올바르지 않습니다.");
  } else {
    alert(getMenuName(selectedNum));
  }
}
function getMenuName(selectedNum) {
  let ul = document.getElementById("menu-ul");
  let str = null;
  if (selectedNum == 1) {
    str = ul.firstElementChild.innerHTML;
  } else if (selectedNum == 2) {
    str = ul.firstElementChild.nextElementSibling.innerHTML;
  } else if (selectedNum == 3) {
    str = ul.lastElementChild.innerHTML;
  }
  return str;
}
const posts = [
  { id: 1, title: "title1", content: "content1", like: 5 },
  { id: 2, title: "title2", content: "content2", like: 5 },
  { id: 3, title: "title3", content: "content3", like: 5 },
  { id: 4, title: "title4", content: "content4", like: 5 },
];

const selectedId = 2;
const newPosts = posts.map((item) =>
  item.id === selectedId ? { ...item, like: item.like + 1 } : item
);
console.log(newPosts);
