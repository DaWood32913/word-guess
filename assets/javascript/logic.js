// The game object
var wordGuessGame ={

      // Object of all words that can be chosen, along with info such as their picture and a song clip.
  wordsToPick: {
    genesis: {
      picture: "genesis.jpg",
      song: "Illegal Alien",
      preview: "https://p.scdn.co/mp3-preview/b29a2b925b9654e0efaaff37504fd234307e0ad8"
    },
    madonna: {
      picture: "madonna.jpg",
      song: "Material Girl",
      preview: "https://p.scdn.co/mp3-preview/5ff7f7b7d2af1a747da275bed3c49054c01b5b1c"
    },
    toto: {
      picture: "toto.jpg",
      song: "Rosanna",
      preview: "https://p.scdn.co/mp3-preview/7cef811eaeb7c7b98245750e73d9d68e9008f317"
    },
    queen: {
      picture: "queen.jpg",
      song: "Princes of the Universe",
      preview: "https://p.scdn.co/mp3-preview/b84f24300476f3d3f20056d2388cc51db2e3891f"
    },
    u2: {
      picture: "u2.jpg",
      song: "With or Without You",
      preview: "https://p.scdn.co/mp3-preview/28365dff1890075c1371628371cd0e5bbff9a3a3"
    },
    metallica: {
      picture: "metallica.jpg",
      song: "Master of Puppets",
      preview: "https://p.scdn.co/mp3-preview/60e6f8dab43f176dd9fb5e795d4e6459bad52e9e"
    },
    journey: {
      picture: "journey.jpg",
      song: "Don't Stop Believin'",
      preview: "https://p.scdn.co/mp3-preview/21b9abd3cd2eea634e17a917196fdd5ba2e82670"
    },
    inxs: {
      picture: "inxs.jpg",
      song: "Need You Tonight",
      preview: "https://p.scdn.co/mp3-preview/61b17a335d5afc1c4086b1b08e2400f0da147977"
    },
    poison: {
      picture: "poison.jpg",
      song: "Fallen Angel",
      preview: "https://p.scdn.co/mp3-preview/0365ad1f152f1834b42b857c4625191cebf9f987"
    },
    rush: {
      picture: "rush.jpg",
      song: "Limelight",
      preview: "https://p.scdn.co/mp3-preview/154987dfb07f2fc5ed7aa4d76b80c5dc08ff4d6b"
    },
    blondie: {
      picture: "blondie.jpg",
      song: "Call Me",
      preview: "https://p.scdn.co/mp3-preview/ed5a443bc86176135ebca8a114f66f4d814d4c90"
    }
  },

  // Variables setting initial state of game
  wordInPlay: null,
  lettersOfTheWord: [],
  matchedLetters:[],
  guessedLetters:[],
  guessesLeft: 0,
  totalGuesses: 0,
  letterGuessed: null,
  wins: 0,

  //setupGame method is called on when page 1st loads
  setupGame: function() {
      //Here we pick random words
      var objKeys = Object.keys(this.wordsToPick);
      this.wordInPlay = objKeys[Math.floor(Math.random() * objKeys.length)];

      //split up chosen words into dashes
      this.lettersOfTheWord = this.wordInPlay.split("");
      
      //Builds the blank word into dashes that haven't been guessed yet
      this.rebuildWordView();

      //this function sets the number of guesses remaining for user and renders to html
      this.processUpdateTotalGuesses();
  },

  //Function that updates page when a letter is guessed
  updatePage: function(letter) {

    //if user has no remaining guesses, the game restarts
    if (this.guessesLeft === 0) {
        this.restartGame();
    }

    //otherwise
    else {

        //handles incorrect guesses
        this.updateGuesses(letter);

        //handles correct guesses
        this.updateMatchedLetters(letter);

        //Rebuild the view of the word. Guessed letters are revealed, non-guessed letters have a "_".
        this.rebuildWordView();

        //If user wins, restart game
        if (this.updateWins() === true) {
            this.restartGame();
        }
     }
  },

  //This function dictates what happens when the user makes a new incorrect guess
  updateGuesses: function(letter) {
    
    //if letter is not in the guessedLetters array, and the letter is not in the lettersOfTheWord array
    if ((this.guessedLetters.indexOf(letter) === -1) && (this.lettersOfTheWord.indexOf(letter) ===-1)){

        //Add the letter to the guessedLetters array
        this.guessedLetters.push(letter);

        //Decrease guesses by 1.
        this.guessesLeft--;

        //updates guesses remaining and guesses letters on the page.
        document.querySelector("#guesses-remaining").innerHTML = this.guessesLeft;
        document.querySelector("#guessed-letters").innerHTML = this.guessedLetters.join(", ");
    }
  },

  //This function sets the initial guesses the user gets
  processUpdateTotalGuesses: function() {
    //The user will get 5 more guesses than are letters to guess
    this.totalGuesses = this.lettersOfTheWord.length + 5;
    this.guessesLeft = this.totalGuesses;

    //Render the guesses left to page.
    document.querySelector("#guesses-remaining").innerHTML = this.guessesLeft;
  },

  // This function governs what happens when user makes a correct guess
  updateMatchedLetters: function(letter) {
    //Loop through letters of the solution
    for (var i = 0; i < this.lettersOfTheWord.length; i++) {
       // If the guessed letter is in the solution, and we haven't guessed it already..
       if ((letter === this.lettersOfTheWord[i]) && (this.matchedLetters.indexOf(letter) === -1)) {
        // Push the newly guessed letter into the matchedLetters array.
        this.matchedLetters.push(letter);
      }
    }
  },

}