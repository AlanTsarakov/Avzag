//comprehension button click animation

let buttonClick = () => {
    document.querySelector('#speaker-inner').classList.toggle('clicked');
    setTimeout(() => document.querySelector('#speaker-inner').classList.toggle('clicked'), 200);
}


//create challenge read comprehension dynamically
let challengeReadComprehension = (question) => {
    localStorage.setItem('challenge', question.type);

    document.querySelector('.mid-row').innerHTML = '';

    let challengeReadComprehension = document.createElement('div');
    challengeReadComprehension.classList.add('challenge-read-comprehension');

    let challengeSection = document.createElement('div');
    challengeSection.classList.add('challenge-section');

    let challengeHeader = document.createElement('div');
    challengeHeader.classList.add('challenge-header');

    let h1 = document.createElement('h1');
    let span = document.createElement('span');
    span.textContent = 'Прочти и ответь';
    h1.appendChild(span);
    challengeHeader.appendChild(h1);

    let assistContent = document.createElement('div');
    assistContent.classList.add('assist-content');

    let soundQuestionComprehension = document.createElement('div');
    soundQuestionComprehension.classList.add('sound-question-comprehension');
    let audio = new Audio(question.tts);

    let speakerOuter = document.createElement('div');
    speakerOuter.classList.add('speaker-outer');
    speakerOuter.addEventListener("click", function () {
        buttonClick();
        console.log(question.tts);
        audio.play();
    });


    let speakerInner = document.createElement('div');
    speakerInner.classList.add('speaker-inner');
    speakerInner.id = 'speaker-inner';
    speakerOuter.appendChild(speakerInner);
    let speakerImg = document.createElement("img");
    speakerImg.style.height = "20px";
    speakerImg.style.width = "20px";
    speakerImg.src = "../assets/svg/volume.svg";
    speakerInner.appendChild(speakerImg);

    let comprehensionQuestion = document.createElement('div');
    comprehensionQuestion.classList.add('comprehension-question');
    comprehensionQuestion.textContent = question.passage;

    soundQuestionComprehension.appendChild(speakerOuter);
    soundQuestionComprehension.appendChild(comprehensionQuestion);

    let readComprehensionPrompt = document.createElement('div');
    readComprehensionPrompt.classList.add('read-comprehension-prompt');
    readComprehensionPrompt.textContent = question.promt;

    soundQuestionComprehension.appendChild(speakerOuter);
    soundQuestionComprehension.appendChild(comprehensionQuestion);
    assistContent.appendChild(soundQuestionComprehension);
    assistContent.appendChild(readComprehensionPrompt);
    challengeSection.appendChild(challengeHeader);
    challengeSection.appendChild(assistContent);
    challengeReadComprehension.appendChild(challengeSection);

    let midRow = document.querySelector('.mid-row');
    midRow.appendChild(challengeReadComprehension);

    let choices = question.choices;

    //set index and solution to localStorage

    localStorage.setItem('correctIndex', question.correctIndex + 1);
    localStorage.setItem('solution', question.choices[question.correctIndex].text);

    let outerOptionsCounter = 1;
    let optionCounter = 1;
    choices.forEach(choice => {
        let outerOptionsDiv = document.createElement("div");
        outerOptionsDiv.className = "outer-options-div";
        outerOptionsDiv.id = "outer-options-div-" + optionCounter;
        //audio for tts
        let audio = new Audio(choice.tts);
        audio.preload = 'auto';

        // Create option div
        let optionDiv = document.createElement("div");
        optionDiv.className = "option-div";
        optionDiv.id = optionCounter.toString();
        optionDiv.addEventListener("click", function () {
            audio.play();
            selectOptionButton(this.id);
            console.log(question.tts);
            
        });

        // Create option number 
        let optionNoSpan = document.createElement("span");
        optionNoSpan.className = "option-no";
        optionNoSpan.id = "option-no-" + optionCounter;
        optionNoSpan.textContent = optionCounter;

        // Create option name 
        let optionNameSpan = document.createElement("span");
        optionNameSpan.className = "option-name";
        optionNameSpan.id = "option-name-" + optionCounter;
        optionNameSpan.textContent = choice.text

        optionDiv.appendChild(optionNoSpan);
        optionDiv.appendChild(optionNameSpan);

        outerOptionsDiv.appendChild(optionDiv);

        assistContent.appendChild(outerOptionsDiv);

        // Increment counters for unique IDs
        outerOptionsCounter++;
        optionCounter++;
    });
}
