const planets = [
 {name:"Mercury",type:"Terrestrial planet",distance:"57.9 million km",moons:"0",year:"88 Earth days",color:"linear-gradient(135deg,#d8d0c4,#746d70)",glow:"#a8a29e",description:"The smallest planet, racing around the Sun.",fact:"Mercury has extreme temperature changes because it has almost no atmosphere.",order:"01"},
 {name:"Venus",type:"Terrestrial planet",distance:"108.2 million km",moons:"0",year:"225 Earth days",color:"linear-gradient(135deg,#ffe4a6,#b9683f)",glow:"#f6ad55",description:"A bright world wrapped in thick clouds.",fact:"A day on Venus is longer than its year.",order:"02"},
 {name:"Earth",type:"Terrestrial planet",distance:"149.6 million km",moons:"1",year:"365.25 days",color:"radial-gradient(circle at 30% 25%,#a5f3fc,#2f85e5 48%,#153b82)",glow:"#38bdf8",description:"Our pale blue home, the only world currently known to support life.",fact:"About 71% of Earth's surface is covered by water.",order:"03"},
 {name:"Mars",type:"Terrestrial planet",distance:"227.9 million km",moons:"2",year:"687 Earth days",color:"linear-gradient(135deg,#ffbd8d,#b84b3e 55%,#692d38)",glow:"#fb765e",description:"The Red Planet, a world of rusty deserts and giant volcanoes.",fact:"Mars has two small moons: Phobos and Deimos.",order:"04"},
 {name:"Jupiter",type:"Gas giant",distance:"778.6 million km",moons:"95 known",year:"11.86 Earth years",color:"repeating-linear-gradient(0deg,#e8c9a0 0 7px,#a96e55 8px 12px,#f1ddbb 13px 20px)",glow:"#d7a77c",description:"The giant of our solar system, with swirling clouds and powerful storms.",fact:"Jupiter's Great Red Spot is a giant storm that has raged for centuries.",order:"05"},
 {name:"Saturn",type:"Gas giant",distance:"1.43 billion km",moons:"146 known",year:"29.4 Earth years",color:"repeating-linear-gradient(0deg,#f3e3ad 0 7px,#c6a76d 8px 12px,#e8d7a2 13px 19px)",glow:"#e5c783",description:"A gas giant famous for its spectacular rings of ice and rock.",fact:"Saturn's average density is lower than water's.",order:"06"},
 {name:"Uranus",type:"Ice giant",distance:"2.87 billion km",moons:"28 known",year:"84 Earth years",color:"linear-gradient(135deg,#c6fff4,#5dbbc9 65%,#3d748f)",glow:"#75e5e3",description:"A distant ice giant that spins on its side.",fact:"Uranus rotates on its side, making its seasons very unusual.",order:"07"},
 {name:"Neptune",type:"Ice giant",distance:"4.5 billion km",moons:"16 known",year:"165 Earth years",color:"linear-gradient(135deg,#a6b5ff,#3158d4 55%,#1d286d)",glow:"#6588ff",description:"A deep-blue world with supersonic winds.",fact:"Neptune is the eighth and most distant planet from the Sun.",order:"08"}
];
const grid = document.getElementById("planetGrid");
let selectedPlanet = 2;
function renderPlanets(){
 grid.innerHTML = planets.map((p,i)=>`<button class="planet-card ${i===selectedPlanet?'selected':''}" data-index="${i}" style="--planet:${p.color};--glow:${p.glow}"><div class="planet-mini"></div><h3>${p.name}</h3><p>${p.type}</p><span class="order">${p.order}</span></button>`).join("");
 grid.querySelectorAll(".planet-card").forEach(card=>card.addEventListener("click",()=>selectPlanet(Number(card.dataset.index))));
}
function selectPlanet(i){
 selectedPlanet=i;renderPlanets();const p=planets[i];
 document.getElementById("detailName").textContent=p.name;
 document.getElementById("detailDescription").textContent=p.description;
 document.getElementById("detailFact").textContent=p.fact;
 document.getElementById("detailOrb").style.setProperty("--planet",p.color);
 document.getElementById("detailOrb").style.setProperty("--glow",p.glow);
 document.getElementById("detailStats").innerHTML=`<div><strong>${p.distance}</strong>FROM SUN</div><div><strong>${p.moons}</strong>KNOWN MOONS</div><div><strong>${p.year}</strong>ONE YEAR</div>`;
}
renderPlanets();selectPlanet(2);

const facts=[
"The Sun contains more than 99% of the Solar System's mass.",
"A day on Venus is longer than its year.",
"Sunlight takes about 8 minutes and 20 seconds to reach Earth.",
"Mars has two small moons: Phobos and Deimos.",
"Jupiter's Great Red Spot is a giant storm.",
"Saturn's rings are made mostly of ice and rocky material.",
"Neptune is the eighth planet from the Sun.",
"Uranus rotates on its side compared with most planets."
];
let factIndex=2;
document.getElementById("newFact").addEventListener("click",()=>{factIndex=(factIndex+1)%facts.length;document.getElementById("bigFact").textContent=facts[factIndex];document.getElementById("factIndex").textContent=String(factIndex+1).padStart(2,"0")});

const questions=[
 {q:"Which is the largest planet in our solar system?",a:["Earth","Jupiter","Saturn","Neptune"],correct:1,why:"Jupiter is the largest planet in our solar system."},
 {q:"Which planet is known as the Red Planet?",a:["Venus","Mercury","Mars","Uranus"],correct:2,why:"Iron-rich dust gives Mars its reddish appearance."},
 {q:"Which planet is closest to the Sun?",a:["Mercury","Earth","Venus","Mars"],correct:0,why:"Mercury is the closest planet to the Sun."},
 {q:"What is the name of Earth's natural satellite?",a:["Phobos","Europa","Titan","The Moon"],correct:3,why:"The Moon is Earth's natural satellite."},
 {q:"How many planets are in our solar system?",a:["7","8","9","10"],correct:1,why:"There are eight recognized planets in our solar system."}
];
let qIndex=0,score=0,answered=false;
const $=id=>document.getElementById(id);
function showQuestion(){
 answered=false;const q=questions[qIndex];$("quizProgress").textContent=`QUESTION ${String(qIndex+1).padStart(2,"0")} / ${String(questions.length).padStart(2,"0")}`;$("quizScore").textContent=`SCORE ${score}`;$("progressFill").style.width=`${(qIndex+1)/questions.length*100}%`;$("questionText").textContent=q.q;$("quizFeedback").textContent="";$("quizNext").disabled=true;$("quizNext").innerHTML=qIndex===questions.length-1?'See results <span>→</span>':'Next question <span>→</span>';
 $("answers").innerHTML=q.a.map((a,i)=>`<button class="answer-btn" data-answer="${i}">${String.fromCharCode(65+i)}. ${a}</button>`).join("");
 $("answers").querySelectorAll("button").forEach(b=>b.addEventListener("click",()=>chooseAnswer(Number(b.dataset.answer))));
}
function chooseAnswer(i){
 if(answered)return;answered=true;const q=questions[qIndex];const buttons=[...$("answers").querySelectorAll("button")];buttons.forEach((b,j)=>{b.disabled=true;if(j===q.correct)b.classList.add("correct");if(j===i&&i!==q.correct)b.classList.add("wrong")});
 if(i===q.correct){score++;$("quizFeedback").textContent="Correct! "+q.why;$("quizFeedback").style.color="#65e8b4"}else{$("quizFeedback").textContent="Not quite. "+q.why;$("quizFeedback").style.color="#ff9bb4"}$("quizScore").textContent=`SCORE ${score}`;$("quizNext").disabled=false;
}
$("quizNext").addEventListener("click",()=>{if(!answered)return;if(qIndex<questions.length-1){qIndex++;showQuestion()}else{$("quizProgress").textContent="MISSION COMPLETE";$("progressFill").style.width="100%";$("questionText").textContent=`You scored ${score} out of ${questions.length}!`; $("answers").innerHTML=`<div class="result-message">${score===5?"Outstanding, space explorer!":"Great work, explorer!"} ${score>=4?"You know your cosmos.":"Explore the planet cards and try again."}</div>`;$("quizFeedback").textContent="";$("quizNext").disabled=false;$("quizNext").innerHTML='Play again ↻';$("quizNext").onclick=()=>{qIndex=0;score=0;$("quizNext").onclick=null;showQuestion()}}});
showQuestion();

// Optional synthesized ambience: no audio plays unless the visitor explicitly turns it on.
let audioCtx=null,oscillators=[],soundOn=false;
$("soundToggle").addEventListener("click",()=>{
 soundOn=!soundOn;
 if(soundOn){
  try{audioCtx=audioCtx||new (window.AudioContext||window.webkitAudioContext)();audioCtx.resume();const master=audioCtx.createGain();master.gain.value=.018;master.connect(audioCtx.destination);[55,82.4].forEach((f,i)=>{const o=audioCtx.createOscillator(),g=audioCtx.createGain();o.type=i?"sine":"triangle";o.frequency.value=f;g.gain.value=i?.22:.3;o.connect(g);g.connect(master);o.start();oscillators.push(o)});$("soundToggle").innerHTML="♫ <span>Sound on</span>";}catch(e){soundOn=false;$("soundToggle").innerHTML="♫ <span>Unavailable</span>";}
 }else{oscillators.forEach(o=>{try{o.stop()}catch(e){}});oscillators=[];$("soundToggle").innerHTML="♫ <span>Sound off</span>";}
});
const navLinks=[...document.querySelectorAll(".nav-link")];
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)navLinks.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+e.target.id))}),{rootMargin:"-35% 0px -55% 0px"});
["home","planets","facts","quiz"].forEach(id=>observer.observe(document.getElementById(id)));
