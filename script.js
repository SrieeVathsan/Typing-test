let type_content = document.querySelector('.type_content p');
let input = document.getElementById('typeValue');
let resetBtn = document.getElementById('resetBtn');
let soundBtn = document.querySelector('.sound input');
let letterIndex = 0;
let mistakes = 0;
let isTyping = 0;
let time;
let t_left = document.querySelector('.t-left');
let error = document.querySelector('.error');
let wpm = document.querySelector('.wpm');
let cpm = document.querySelector('.cpm');
let maxTime = 60;
let timeleft = maxTime;

let correctType = new Audio('type.mp3');
let IncorrectType = new Audio('wrong.mp3');

// Function to pause the sound files
const playSound = () => {
    correctType.pause();
    IncorrectType.pause();
}

// Sound button event listener to stop sounds when toggled
soundBtn.addEventListener('click', () => {
    playSound();
});

// Define the loadPera function to load a random paragraph from the article array
const loadPera = () => {
    let random_Pera = Math.floor(Math.random() * article.length);
    type_content.innerHTML = "";
    // Split each character and wrap it in a span
    article[random_Pera].split('').forEach(element => {
        let realData = `<span>${element}</span>`;
        type_content.innerHTML += realData;
    });

    // Mark the first letter as active
    type_content.querySelectorAll('span')[0].classList.add('active');

    // When the document or the text container is clicked, focus on the input
    document.addEventListener('click', () => {
        input.focus();
    });
    type_content.addEventListener('click', () => {
        input.focus();
    });
};

// Initialize the paragraph
loadPera();

// Event listener for the input field to handle typing
input.addEventListener('input', (e) => {
    let char = type_content.querySelectorAll('span');
    // Get the character at the current index from the user's input
    let inputValue = e.target.value.split('')[letterIndex];

    // Start the timer on first key press
    if (!isTyping) {
        time = setInterval(timeSetup, 1000);
        isTyping = true;
    }

    // Check if we're still within the paragraph length minus one
    if (letterIndex < char.length - 1) {
        if (inputValue == null) {
            // Handle backspace: if there's no input value at this index
            if (letterIndex > 0) {
                letterIndex--;
                if (char[letterIndex].classList.contains('incorrect')) {
                    mistakes--;
                }
                char[letterIndex].classList.remove('correct', 'incorrect');
            }
        } else {
            // Compare the current input character to the expected character
            if (char[letterIndex].innerText == inputValue) {
                char[letterIndex].classList.add('correct');
                correctType.play();
            } else {
                char[letterIndex].classList.add('incorrect');
                mistakes++;
                IncorrectType.play();
            }
            letterIndex++;
        }

        // Update the active letter highlighting
        char.forEach(element => {
            element.classList.remove('active');
        });
        if(letterIndex < char.length){
          char[letterIndex].classList.add('active');
        }

        // Update the mistakes and CPM display
        error.innerText = `Mistakes : ${mistakes}`;
        cpm.innerText = `CPM : ${letterIndex - mistakes}`;
    } else {
        clearInterval(time);
        input.value = "";
    }
});

// Timer function to update time and calculate WPM
const timeSetup = () => {
    if (timeleft > 0) {
        timeleft--;
        t_left.innerText = `Time-Left : ${timeleft}S`;
        let wpmTab = Math.round(((letterIndex - mistakes) / 5) / ((maxTime - timeleft) / 60));
        wpm.innerText = `WPM : ${wpmTab}`;
    } else {
        clearInterval(time);
        input.value = "";
    }
};

// Optional reset functionality
resetBtn.addEventListener('click', () => {
    // Reset all counters and variables
    letterIndex = 0;
    mistakes = 0;
    isTyping = 0;
    timeleft = maxTime;
    input.value = "";
    clearInterval(time);
    // Reset displays
    t_left.innerText = `Time-Left : ${timeleft}S`;
    error.innerText = `Mistakes : ${mistakes}`;
    cpm.innerText = `CPM : 0`;
    wpm.innerText = `WPM : 0`;
    // Load a new paragraph
    loadPera();
});