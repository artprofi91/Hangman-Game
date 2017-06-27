var wins = 0;
var placeholderArray = [];
var prevPlaceholderArray = [];
var wordPlaceholder = [];
var lettersGuessed = [];
var word = [];
var wordPlaceholderString = "";
var userInput = "";
var correctGuessCount = 0;
var guessesLeft = 15;

// object of Simpsons Hangman words
var SimpsonsWords = {
    word1: ["H", "O", "M", "E", "R"],
    word2: ["K", "R", "U", "S", "T", "Y"],
    word3: ["F", "L", "A", "N", "D", "E", "R", "S"],
    word4: ["B", "A", "R", "N", "E", "Y"],
    word5: ["W", "I", "L", "L", "I", "E"],
    word6: ["S", "M", "I", "T", "H", "E", "R", "S"],
    word7: ["B", "U", "R", "N", "S"],
    word8: ["S", "K", "I", "N", "N", "E", "R"],
    word9: ["W", "I", "G", "G", "U", "M"],
    word10: ["M", "I", "L", "H", "O", "U", "S", "E"]
};

// array of SIMPSONS Hangman words created from object
var wordArray = [SimpsonsWords.word1,
                SimpsonsWords.word2,
                SimpsonsWords.word3, 
                SimpsonsWords.word4,
                SimpsonsWords.word5,
                SimpsonsWords.word6,
                SimpsonsWords.word7,
                SimpsonsWords.word8,
                SimpsonsWords.word9,
                SimpsonsWords.word10];

// object of Simpsons Hangman pictures
var SimpsonsPictures = {
    picture1: ["assets/images/1.png"],
    picture2: ["assets/images/2.png"],
    picture3: ["assets/images/3.png"],
    picture4: ["assets/images/4.png"],
    picture5: ["assets/images/5.png"],
    picture6: ["assets/images/6.png"],
    picture7: ["assets/images/7.png"],
    picture8: ["assets/images/8.png"],
    picture9: ["assets/images/9.png"],
    picture10: ["assets/images/10.png"]
};

// array of SIMPSONS Hangman pictures created from object
var pictureArray = [SimpsonsPictures.picture1,
                    SimpsonsPictures.picture2,
                    SimpsonsPictures.picture3,
                    SimpsonsPictures.picture4,
                    SimpsonsPictures.picture5,
                    SimpsonsPictures.picture6,
                    SimpsonsPictures.picture7,
                    SimpsonsPictures.picture8,
                    SimpsonsPictures.picture9,
                    SimpsonsPictures.picture10];


// object of Simpsons Hangman songs
var SimpsonsSongs = {
    song1: ["assets/music/1.mp3"],
    song2: ["assets/music/2.wav"],
    song3: ["assets/music/3.wav"],
    song4: ["assets/music/4.mp3"],
    song5: ["assets/music/5.wav"],
    song6: ["assets/music/6.mp3"],
    song7: ["assets/music/7.wav"],
    song8: ["assets/music/8.mp3"],
    song9: ["assets/music/9.mp3"],
    song10: ["assets/music/10.wav"]
};


// array of SIMPSONS Hangman songs created from object
var songArray = [SimpsonsSongs.song1,
                    SimpsonsSongs.song2,
                    SimpsonsSongs.song3,
                    SimpsonsSongs.song4,
                    SimpsonsSongs.song5,
                    SimpsonsSongs.song6,
                    SimpsonsSongs.song7,
                    SimpsonsSongs.song8,
                    SimpsonsSongs.song9,
                    SimpsonsSongs.song10];
// start game
createWord(wordArray);

// game steps
document.onkeyup = function(event) {
    console.log('This is the key entered', event.key);
    var keyPress;
    // you can type only letters
    if(event.keyCode > 64 && event.keyCode < 91) {
        keyPress = event.keyCode;

        // convert userinput to Uppercase
        userInput = String.fromCharCode(keyPress).toUpperCase();
        console.log(userInput + " should match the key entered");

        // track user input
        trackLetterGuesses(userInput);

        // stop audio
        pauseAudio();

        // create world on user input
        buildWord(userInput);

    }
};


// Simpsons word Array
function createWord(wordArray) {
    word = wordArray[Math.floor(Math.random()*wordArray.length)];
    // see our word in console
    console.log(word);

    //create placeholder for word
    createWordPlaceholder(word);
    return word;
};

// create placeholder for word
function createWordPlaceholder(word) {  
    var wordPlaceholder = [];

    // fill with x
    for (i = 0; i < word.length; i++) {
        wordPlaceholder.push("x");
    }

    // convert array to string
    wordPlaceholderString = wordPlaceholder.join(" ");

    // display word placeholder
    document.getElementById('word-placeholder').textContent = wordPlaceholderString;
    return wordPlaceholder;
};

// trak user guesses
function trackLetterGuesses(userInput) {

    // Check if letter already guessed. Don't track letters more than once
    for (i = 0; i < lettersGuessed.length; i++) {
        if (userInput == lettersGuessed[i]) {
            return;
        };
    }

    // push correct letter
    lettersGuessed.push(userInput);
    console.log("LettersGuessed array item: " + lettersGuessed[0]);
    
    // letters to string
    var lettersGuessedString = lettersGuessed.join(",");
    document.getElementById('letters-guessed').innerHTML = lettersGuessedString;

    // each guess decrement by 1 
    guessesLeft--;

    // show guesses left
    document.getElementById('guess-count').innerHTML = guessesLeft;
    console.log('Guesses left' + guessesLeft);

    
    // game restart = no guesses
    if (guessesLeft == 0) {
        
        restartGame();
        playLose();
        document.getElementById ('simpsons-image').src = 'assets/images/simpsons-star.png';
        
    }

    return lettersGuessedString;
};

// builds hangman world from user guesses letters
function buildWord(userInput) {

    // placeholder array to x 
    if (prevPlaceholderArray.length == 0) {
        placeholderArray = createWordPlaceholder(word);

    // see letters and x
    } else {
        placeholderArray = prevPlaceholderArray;

    }

    // replace x with letter
    for (var i = 0; i < word.length; i++) {
      console.log('Word is ' + word);
      if (userInput == word[i]) {
        console.log(userInput + " is in word at " + i);

        placeholderArray[i] = userInput;

      }
    }

    prevPlaceholderArray = placeholderArray;

    // placeholder to string
    placeholder = placeholderArray.join(" ");
    document.getElementById('word-placeholder').innerHTML = placeholder;

    console.log("Placeholder Array length is " + placeholderArray.length);
    console.log("Placeholder split is " + placeholder.split(","));
    console.log("Word join is " + word.join(" "));
    
    // user win when placeholder matches word
    if (placeholder.split(',') == word.join(" ")) {
        wins++;
        pictureSoundChanger();
        document.getElementById('win-count').innerHTML = wins;
        restartGame();
    };
   

}
function playAudio() { 
    // stop autoplay music
    var vid = document.getElementById("music"); 
    vid.play(); 
}


function pauseAudio() { 
    // stop autoplay music
    var vid = document.getElementById("music"); 
    vid.pause(); 
}

function playLose() { 
    // play music when you lose
    var vid = document.getElementById("music-wrong"); 
    vid.play(); 
}


// restart game
function restartGame(wordPlaceholder) {
    
    // add new word
    createWord(wordArray);

    //empty user input + xxxx
    userInput = "";
    prevPlaceholderArray = [];
    placeholderArray = [];

    // reset remain guesses
    guessesLeft = 15;

    // reset guess count
    correctGuessCount = 0;
    document.getElementById('guess-count').innerHTML = guessesLeft;

    // reset list of guessed letters
    lettersGuessed = [];
    document.getElementById('letters-guessed').innerHTML = lettersGuessed;
    
}
//change pictures and sounds
function pictureSoundChanger(){
    for(var j=0; j<wordArray.length; j++){
        if(placeholder.split(',') == wordArray[j].join(" ")){
            document.getElementById ('simpsons-image').src = pictureArray[j];
            document.getElementById ("music").src = songArray[j];
        }
    }
}




