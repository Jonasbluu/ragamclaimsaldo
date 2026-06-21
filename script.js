const hadiah=["20.000","30.000","40.000","50.000","20.000","30.000","40.000","FREE CHIP"];

const warna=[
"#ffd700",
"#ff7b00",
"#00d9ff",
"#8b2cff",
"#ffd700",
"#ff7b00",
"#00d9ff",
"#8b2cff"
];

const API_URL="https://script.google.com/macros/s/AKfycbwWeTFlnWoa6h1ksr_iifJcuBbkfHMD8-SqwRTNRUW8sN0FMX68c627TKb8p-Mr4Kxt/exec";

const cv=document.getElementById("wheel");
const ctx=cv.getContext("2d");

function draw(){
let c=200,r=190;

for(let i=0;i<hadiah.length;i++){

let a=i*2*Math.PI/hadiah.length;
let b=(i+1)*2*Math.PI/hadiah.length;

ctx.beginPath();
ctx.moveTo(c,c);
ctx.arc(c,c,r,a,b);
ctx.fillStyle=warna[i];
ctx.fill();

ctx.save();
ctx.translate(c,c);
ctx.rotate(a+(b-a)/2);

ctx.fillStyle="#fff";
ctx.font="bold 22px Arial";
ctx.textAlign="center";
ctx.fillText(hadiah[i],130,5);

ctx.restore();
}

ctx.beginPath();
ctx.arc(c,c,18,0,Math.PI*2);
ctx.fillStyle="gold";
ctx.fill();
}

draw();

function pop(t){
msg.innerText=t;
popup.style.display="flex";
}

let rot=0;

spinBtn.onclick=async ()=>{

let id=userid.value.trim();

if(!id){
pop("ISI USER ID DAHULU");
return;
}

spinBtn.disabled=true;

let win=Math.floor(Math.random()*hadiah.length);

const sectorSize=360/hadiah.length;
let angle=(win*sectorSize)+(sectorSize/2);

rot+=3600-angle-90;

cv.style.transform=`rotate(${rot}deg)`;

setTimeout(()=>{

let hasil=hadiah[win];

spinBtn.innerHTML="CLAIM "+hasil;

pop("SELAMAT! KAMU MENDAPATKAN "+hasil);

spinBtn.disabled=false;

spinBtn.onclick=()=>{
window.location.href="https://ragam4d03.com/";
};

fetch(API_URL,{
method:"POST",
body:JSON.stringify({
userid:id,
hadiah:hasil
})
})
.then(r=>r.json())
.then(data=>{
if(data.status==="used"){
pop("USER ID SUDAH PERNAH MELAKUKAN SPIN");
}
})
.catch(console.error);

},2500);

};

const namaRandom=[
"RAGAM01","SLOT88","GACOR99","VIP777",
"JACKPOT85","MAXWIN929","BOSKU17",
"RAJA123","SULTAN88","HOKI55",
"CUAN159","BIGWIN99","DEWA87",
"LION684","KING45","SENOPATI",
"udacan147","peng222","Ondonjp",
"salammjp1","Xsimer11","kopral30",
"ikok99","brovipx500","Cucujeus20",
"gacorbos5","hebat22","Davidpras"
];

const hadiahRandom=[
"Rp 20.000",
"Rp 30.000",
"Rp 40.000",
"Rp 50.000",
"FREE CHIP"
];

function randomClaim(){

const list=document.getElementById("recentList");

let nama=namaRandom[Math.floor(Math.random()*namaRandom.length)];
let hadiah=hadiahRandom[Math.floor(Math.random()*hadiahRandom.length)];

const item=document.createElement("div");

item.className="recent-item";

item.innerHTML=`
<span>${nama}</span>
<span>${hadiah}</span>
`;

list.prepend(item);

if(list.children.length>8){
list.removeChild(list.lastElementChild);
}
}

for(let i=0;i<6;i++){
randomClaim();
}

setInterval(randomClaim,
Math.floor(Math.random()*1000)+2000
);
