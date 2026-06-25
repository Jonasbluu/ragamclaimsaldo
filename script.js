/* ========================= */
/* CONFIG */
/* ========================= */

const WEBAPP_URL =
"ISI_URL_WEBAPP_APPS_SCRIPT_DISINI";

/* ========================= */
/* ELEMEN */
/* ========================= */

const envelope =
document.getElementById("envelope");

const popup =
document.getElementById("popup");

const reward =
document.getElementById("reward");

const claimBtn =
document.getElementById("claimBtn");

const usedPopup =
document.getElementById("usedPopup");

/* ========================= */
/* USER ID DARI URL */
/* ========================= */

const userid =
new URLSearchParams(
window.location.search
).get("id");

/* ========================= */
/* HADIAH */
/* ========================= */

const hadiahList = [

"Rp18.000",
"Rp28.000",
"Rp38.000",
"Rp58.000",
"Rp88.000",
"Rp188.000"

];

let hadiahTerpilih = "";
let userSudahClaim = false;

/* ========================= */
/* CEK USER */
/* ========================= */

async function checkUser(){

try{

const res = await fetch(
WEBAPP_URL,
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({

userid:userid,
action:"check"

})
}
);

const data = await res.json();

if(data.status === "used"){

userSudahClaim = true;

usedPopup.style.display = "flex";

envelope.style.opacity = ".5";
envelope.style.pointerEvents = "none";

}

}catch(err){

console.log(err);

}

}

/* ========================= */
/* RANDOM HADIAH */
/* ========================= */

function randomHadiah(){

const index =
Math.floor(
Math.random() *
hadiahList.length
);

return hadiahList[index];

}

/* ========================= */
/* BUKA SURAT */
/* ========================= */

envelope.addEventListener(
"click",
()=>{

if(userSudahClaim) return;

hadiahTerpilih =
randomHadiah();

reward.innerText =
hadiahTerpilih;

popup.classList.add("show");

/* nanti confetti disini */

}
);

/* ========================= */
/* CLAIM */
/* ========================= */

claimBtn.addEventListener(
"click",
async ()=>{

claimBtn.disabled = true;

try{

const res = await fetch(
WEBAPP_URL,
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({

userid:userid,
hadiah:hadiahTerpilih,
action:"save"

})
}
);

const data = await res.json();

if(data.status === "saved"){

alert(
"SELAMAT! HADIAH BERHASIL DIKLAIM"
);

userSudahClaim = true;

claimBtn.innerText =
"BERHASIL DIKLAIM";

}

else if(
data.status === "used"
){

alert(
"USER SUDAH PERNAH CLAIM"
);

}

}
catch(err){

console.log(err);

alert(
"Gagal menghubungi server"
);

}

}
);

/* ========================= */
/* START */
/* ========================= */

checkUser();
