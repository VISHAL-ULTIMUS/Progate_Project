const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// create our questions
let questions = [
    {
        question : "What does HTML stand for?",
        imgSrc : "https://www.techjockey.com/blog/wp-content/uploads/2019/10/HTML-Editor-Online_feature.png",
        choiceA : " HYPER TEXT MARKUP LANGUAGE",
        choiceB : "HOME TOOL MARKUP LANGUAGE",
        choiceC : "HYPERLINK AND TEXT MARKUP LANGUAGE",
        correct : "A"
    },{
        question : "Choose the correct HTML element for the largest heading:?",
        imgSrc : "https://cdn2.iconfinder.com/data/icons/seo-web-2-3/128/Vigor_Heading-tag-html-h-seo-page-512.png",
        choiceA : "heading tag",
        choiceB : "h1 tag",
        choiceC : "h6 tag",
        correct : "B"
    },{
        question : "What does CSS stand for??",
        imgSrc : "https://www.freecodecamp.org/news/content/images/size/w2000/2019/10/css.png",
        choiceA : "Colourful Stylesheets ",
        choiceB : "Creative StyleSheets",
        choiceC : "Cascading StyleSheets",
        correct : "C"
    },{
        question : "Which character is used to indicate the end of the line??",
        imgSrc : "https://www.elegantthemes.com/blog/wp-content/uploads/2019/04/000-Basic-HTML-Codes.jpg",
        choiceA : " < ",
        choiceB : " / ",
        choiceC : " $ ",
        correct : "B"
    },{
        question : "INPUT tag is?",
        imgSrc : "https://www.computerhope.com/jargon/m/markup-language.jpg",
        choiceA : " empty tag ",
        choiceB : " format tag ",
        choiceC : " None of them ",
        correct : "A"
    }
    ,{
        question : "Markup tags tell the web browser?",
        imgSrc : "http://2.bp.blogspot.com/_sDOe5HxTdMk/TTUnBCaq3wI/AAAAAAAAB7E/XxEdbu_551M/s1600/opera11DateTimePickersOnInitialLoad.png",
        choiceA : "How to organise the page? ",
        choiceB : " How to display the page?",
        choiceC : " None of them ",
        correct : "B"
    }    ,{
        question : "www is based on which model?",
        imgSrc : "https://miro.medium.com/max/800/0*-eOXppaWzuaJOYI3.png",
        choiceA : "Client-server ",
        choiceB : " Local-server",
        choiceC : " 3-tier",
        correct : "A"
    }      ,{
        question : "HTML is a subset of?",
        imgSrc : "https://www.scriptol.com/programming/images/html.jpg",
        choiceA : "SGMT ",
        choiceB : "SGMD",
        choiceC : " SGML",
        correct : "C"
        
    }     
    ,{
        question : "  A much better approach to establish the base URL is to use?",
        imgSrc : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/180px-HTML5_logo_and_wordmark.svg.png",
        choiceA : "HEAD element ",
        choiceB : "BASE element ",
        choiceC : " Both of them ",
        correct : "B"
    }       
    ,{
        question : "  Any part of the graphic that is not included in another hot zone is considered to be part of?",
        imgSrc : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/180px-HTML5_logo_and_wordmark.svg.png",
        choiceA : "default ",
        choiceB : "point",
        choiceC : "rect ",
        correct : "A"
    }         
    ,{
        question : "  The map definition file is generally stored in ?",
        imgSrc : "https://www.techjockey.com/blog/wp-content/uploads/2019/10/HTML-Editor-Online_feature.png",
        choiceA : "BIN ",
        choiceB : "CGI-BIN",
        choiceC : "BOTH OF THEM ",
        correct : "B"
    }          
    ,{
        question : "  Symbol used at the beginning of the HREF text is?",
        imgSrc : "https://cdn.mos.cms.futurecdn.net/hFm4iWXhbw4c4rdcMH8tUD-650-80.jpg",
        choiceA : "#` ",
        choiceB : "&",
        choiceC : "$ ",
        correct : "A"
    }  
    ,{
        question : " JavaScript is an ________ language. ",
        imgSrc : "https://www.tutorialrepublic.com/lib/images/javascript-illustration.png",
        choiceA : "Complied ",
        choiceB : "Interpreted",
        choiceC : "Both ",
        correct : "B"
    }      

];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}


function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);
    
    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "https://cdn.pixabay.com/photo/2019/02/19/19/45/thumbs-up-4007573_1280.png" :
              (scorePerCent >= 60) ? "https://cdn4.iconfinder.com/data/icons/smiley-1-1/32/81-512.png" :
              (scorePerCent >= 40) ? "http://clipart-library.com/images/BcgE5k4xi.png" :
              (scorePerCent >= 20) ? "https://i.pinimg.com/236x/59/68/d1/5968d1391eb9fa1a5c369f208f37e147.jpg.png" :
              
    
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}

