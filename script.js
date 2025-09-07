'use strict'
// 1行目に記載している 'use strict' は削除しないでください

let num = window.prompt("カード合わせゲームです！\n小さな偶数で枚数を指定してください！", "4 or 8 or 16 or 24");
let cards = [];
//console.log(num);
if (num <= 4 || num === "4 or 8 or 16 or 24") {
   //console.log("4までエリア通過");
   cards = [
      "1","2",
      "1","2",
   ];
} else if (num <= 6) {
   cards = [
      "A","3","5",
      "A","3","5",
   ];    
} else if (num <= 8) {
   cards = [
      "A","3","4","5",
      "A","3","4","5",
   ];
} else if (num <= 10) {
   cards = [
      "A","3","4","5","6",
      "A","3","4","5","6",
   ];
} else if (num <= 12) {
   cards = [
      "A","3","4","5","6","7",
      "A","3","4","5","6","7",
   ];
} else if (num <= 14) {
   cards = [
      "A","3","4","5","6","7","8",
      "A","3","4","5","6","7","8",
   ];
} else if (num <= 16) {
   cards = [
      "A","7","8","9","10","J","Q","K",
      "A","7","8","9","10","J","Q","K",
   ];
} else if (num <= 18) {
   cards = [
      "A","6","7","8","9","10","J","Q","K",
      "A","6","7","8","9","10","J","Q","K",
   ];
} else if (num <= 20) {
   cards = [
      "A","5","6","7","8","9","10","J","Q","K",
      "A","5","6","7","8","9","10","J","Q","K",
   ];
} else if (num <= 22) {
   cards = [
      "A","2","5","6","7","8","9","10","J","Q","K",
      "A","2","5","6","7","8","9","10","J","Q","K",
   ];
} else if (num <= 24) {
   cards = [
      "A","3","4","5","6","7","8","9","10","J","Q","K",
      "A","3","4","5","6","7","8","9","10","J","Q","K",
   ];
} else {
   cards = [
      "1","2",
      "1","2",
   ];
}
//console.log("1_orgCards：" + cards);

//シャッフルする
// Fisher-Yatesアルゴリズム: 配列を効率的にシャッフルする方法

// for (let i=cards.length-1; i>0; i--){
//    const j = Math.floor(Math.random() * (i + 1));
//    [cards[i], cards[j]] = [cards[j], cards[i]];
// }

for (let i=cards.length-1; i>0; i--){
   let r = rand(0,i);
   //[cards[i], cards[j]] = [cards[j], cards[i]];
   let tmp = cards[i];
   cards[i] = cards[r];
   cards[r] = tmp;
}
//console.log("2_fixCards：" + cards);

let field = document.getElementById("field");

for (let i=0; i<cards.length; i++){
   let elm = document.createElement("div");
   elm.className = "card";
   elm.innerHTML = ""; //cards[i];
   elm.index = i;
   elm.onclick = click;
   field.appendChild(elm);
}

let first = null; //明示的に「空」にする
let second = null;
let timer = null;

let count = 0;
let hanten = 0;
let clock = document.getElementById("clock");
let timer2 = setInterval( function() {
    clock.innerText = "　経過時間〔秒〕：" +(++count)}, 700 );


// ページをリロードする
function reload(){
   location.reload();
}

//min～maxまでで整数乱数を作る
function rand(min, max){
   return Math.floor(Math.random()*(max-min+1))+min;
}

//クリックされた時
function click(em){
   if (timer){
      clearTimeout(timer);
      judge();
   }
   let elm = em.target;
   //elm.style.visibility = "hidden";
   //let i = elm.index:
   elm.innerHTML = cards[ elm.index ];

   if (!first){
      first = elm;
   } else if (first.index === elm.index){
      return;
   } else {
      second = elm;
      timer = setTimeout( judge, 700);
   }
}

//ジャッジする
function judge (){
   if (first.innerHTML === second.innerHTML ){
      first.style.visibility = "hidden";
      second.style.visibility = "hidden";
      hanten += 2;
      if ( hanten === cards.length ){
         clearInterval(timer2);
      }
   } else {
      first.innerHTML = "";
      second.innerHTML = "";
   }
   first = null; //明示的に「空」にする
   second = null;
   timer = null;
}
