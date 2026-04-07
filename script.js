const startBtn = document.getElementById('startBtn');
const quiz = document.getElementById('quiz');
const resultDiv = document.getElementById('result');

let currentQuestion = 0;
let score = 0;

const questions = [
    {q:"What position does Harry play in Quidditch?", options:["Beater","Chaser","Seeker","Keeper"], answer:2},
    {q:"Who is the Half-Blood Prince?", options:["Sirius Black","Severus Snape","Tom Riddle","Albus Dumbledore"], answer:1},
    {q:"What does the spell 'Alohomora' do?", options:["Unlocks doors","Lights up wand","Levitate objects","Disarms opponent"], answer:0},
    {q:"What creature guards the entrance to the Gryffindor common room?", options:["Troll","Portrait of the Fat Lady","Goblin","House-elf"], answer:1},
    {q:"What type of dragon does Harry face in the first Triwizard Tournament task?", options:["Hungarian Horntail","Chinese Fireball","Swedish Short-Snout","Ukrainian Ironbelly"], answer:0},
    {q:"Who gives Harry his first-ever Nimbus 2000 broomstick?", options:["Hagrid","Dumbledore","McGonagall","Sirius Black"], answer:0},
    {q:"Who killed Dumbledore?", options:["Bellatrix Lestrange","Severus Snape","Voldemort","Draco Malfoy"], answer:1},
    {q:"What does the spell 'Expecto Patronum' do?", options:["Unlock doors","Conjures a Patronus","Freezes enemies","Moves objects"], answer:1},
    {q:"What is the core of Harry's wand?", options:["Dragon heartstring","Phoenix feather","Unicorn hair","Thestral tail hair"], answer:1},
    {q:"What magical object shows your deepest desire?", options:["Mirror of Erised","Invisibility Cloak","Marauder’s Map","Time-Turner"], answer:0}
];

startBtn.addEventListener('click', () => {
    startBtn.style.display = 'none';
    showQuestion();
});

function showQuestion(){
    const qObj = questions[currentQuestion];
    quiz.style.display = 'block';
    quiz.innerHTML = `
        <h2>Question ${currentQuestion+1} of ${questions.length}</h2>
        <p>${qObj.q}</p>
        ${qObj.options.map((opt,i)=>`<button class="answerBtn" data-index="${i}">${opt}</button>`).join('')}
        <button id="nextBtn" style="display:none; margin-top:20px;">Next</button>
    `;

    const answerButtons = document.querySelectorAll('.answerBtn');
    const nextBtn = document.getElementById('nextBtn');

    answerButtons.forEach(btn=>{
        btn.addEventListener('click', ()=>{
            const chosen = parseInt(btn.getAttribute('data-index'));
            if(chosen === qObj.answer){
                btn.classList.add('bounce');
                score++;
            } else {
                btn.classList.add('shake');
            }
            answerButtons.forEach(b=>b.disabled=true);
            nextBtn.style.display = 'block';
        });
    });

    nextBtn.addEventListener('click', ()=>{
        currentQuestion++;
        if(currentQuestion < questions.length){
            showQuestion();
        } else {
            showResult();
        }
    });
}

function showResult(){
    quiz.style.display = 'none';
    resultDiv.innerHTML = `
        <h2>Your HP Fan Score: ${score} / ${questions.length}</h2>
        <canvas id="scorePie" width="200" height="200"></canvas>
    `;
    drawPieChart(score, questions.length);
}

// Pie chart function
function drawPieChart(score, total){
    const canvas = document.getElementById('scorePie');
    const ctx = canvas.getContext('2d');
    const percentage = score/total;
    // Draw background circle
    ctx.beginPath();
    ctx.arc(100,100,90,0,2*Math.PI);
    ctx.fillStyle = "#ecf0f1";
    ctx.fill();
    // Draw score slice
    ctx.beginPath();
    ctx.moveTo(100,100);
    ctx.arc(100,100,90,-0.5*Math.PI, (-0.5+2*percentage)*Math.PI);
    ctx.fillStyle = "#f1c40f";
    ctx.fill();
}