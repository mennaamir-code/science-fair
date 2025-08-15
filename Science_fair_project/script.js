
//1//Here this part grabs main HTML elements and sets initial variables
const textmain = document.getElementById('text');
const choicesmain = document.getElementById('choices');
const footermain = document.getElementById('footer');

let visited = { timemachine: false, transport: false, ice: false, robot: false };
let typing = false; //so user can't select buttons while text is appearing (you should read '_')

//2// this part animates text like a game (professional lol), then runs an optional callback

/*
*here i had to search a litle about the setInterval syntax
 *because for , while would be too long (not included in couse, but still easy)
 */
function typeWrite(stringletters, speed = 30, callback) { //adding a callback here was important for telling the program to not just end here and do next given prompts
  typing = true;
  textmain.textContent = ''; //for a fresh start so text doesn't pile up
  let i = 0;
  const timer = setInterval(() => { //types out letter by letter (like an engine)
    textmain.textContent += stringletters.charAt(i);
    i++;
    if (i >= stringletters.length) {
      clearInterval(timer); //stops the engine when user types out all letters (like an off switch)
      typing = false;
      if (callback) callback(); //for safety measures (gotta make sure my callback() function works)
    }
  }, speed);
}

//3//this part clears choices => better display => better life :)
function clearChoices() {
  choicesmain.innerHTML = '';  // removes anything inside the choices area
  footermain.textContent = ''; // clears any text in the footer area
}

//4//this part adds a button choice
function addChoice(text, onClick, className = 'button') {
  const buttonElement = document.createElement('button');
  buttonElement.textContent = text;
  buttonElement.className = className;
  buttonElement.onclick = () => {
    if (typing) return; // ignore clicks on any keys while typing
    onClick();
  };
  choicesmain.appendChild(buttonElement); //please make my button visibe (thanks :) ) 
  return buttonElement;
}
//5// this part updates the footer, and adds professionalism to the buttons
function updateFooter() {
  let count = 0;

  // this part counts how many visited inventions
  for (let key in visited) {
    if (visited[key] === true) {
      count++;
    }
  }

  // this part updates the footer text
  footermain.innerHTML = "Visited " + count + " / 4 inventions.";

  // enables and disables the final button 
  const bestinvbutton = document.getElementById("goFinalbutton");
  if (bestinvbutton) { // .disabled wasn't included in our course so i searched it for added looks
    if (count === 4) {
      bestinvbutton.disabled = false;//makes the button blue again so user can click it
    }
    else {
      bestinvbutton.disabled = true; //makes the button gray so user can'textIdk click it
    }
  }
}


//6// the 4 inventions /////////////////////////////////////////////////

//6.1// intro
function showIntro() {
  clearChoices();
  const intro = `You arrive at the *2025 Science Fair*. Your mission for today is choosing the best innovation!!\n
   ^_^ You're a well known Scientist now with a high academic rank!! ^_^\n\n
   You look at the entrance, a big sign hanged up, noise everywhere :"beep Beep Bop" , and what's that smell...? Interesting you tell yourself....\n
  So, do you want to look around first, or head straight to the inventions?`;
  
  typeWrite(intro, 30, () => {
    addChoice('Look Around', () => showLookAround());
    addChoice('To Inventions', () => showMainHall());
  });
}

/// look around choice
function showLookAround() {
  clearChoices();
  const textIdk = `You take a slow lap, a drone speeds up above your head, a kid with a mini volcano which erupted made a mess everywhere, and a small table that has small dancing lightbulbs.\n
   You overhear whispers: "There's a talking ice cream..." and "They say the time machine actually works!!\n
    "So that's where the smell comes from" you tell yourself`;
  typeWrite(textIdk, 30, () => {
    addChoice('Proceed to the Main Hall', () => showMainHall());
  });
}

///main hall
function showMainHall() {
  clearChoices();
  const textIdk = `Welcome to the Main Hall !!\n
  Pick an invention to try! (The more inventions the more adventures ;)`;
  typeWrite(textIdk, 30, () => {
    addChoiceWithVisited('Time Travel Machine', () => showTimeScene(), 'timemachine');
    addChoiceWithVisited('Transportation Machine', () => showTransportScene(), 'transport');
    addChoiceWithVisited('Talking Ice Cream Machine', () => showIceScene(), 'ice');
    addChoiceWithVisited('Mini Robot', () => showRobotScene(), 'robot');
    addChoice('Choose the Best Invention', () => showFinalScene(), 'button secondary', 'goFinalbutton');
    updateFooter();
  });
}

//helper to add choice and show visited marker in label
function addChoiceWithVisited(label, markk, key) {
  const visitedMark = visited[key] ? ' (Visited)' : '';
  addChoice(label + visitedMark, markk);
}

///Time travel machine

function showTimeScene() {
  clearChoices();
  const textIdk = `Welcome to the Time Travel Machine !!\n\n
  You're greeted by the invertor. He gives You a metal hat and asks you to put it on your head...\n
  "Past or future?" , he asks with a smile. `;
  typeWrite(textIdk, 30, () => {
    addChoice('Past', () => timepast());
    addChoice('Future', () => timeFuture());
    addChoice('Back to Science Fair', () => showMainHall(), 'button secondary');
  });
}

function timepast() {
  clearChoices();
  const textIdk = `!!!! ENTER AT OWN RISK !!!!\n
  (Some memories are better left untouched.....I've warned you.)
  Choose: Day of Birth or Special Memory.`;
  typeWrite(textIdk, 30, () => {
    addChoice('Day of Birth', () => timeBirth());
    addChoice('Special Memory', () => timeSpecialMemory());
    addChoice('Back to Hall', () => showTimeScene(), 'button secondary');
  });
}

function timeBirth() {
  clearChoices();
  // ask user for date of birth
  const dateBirth = prompt('Please enter your date of birth (DD/MM/YYYY):');
  if (!dateBirth) {
    typeWrite('So, you decided not to enter a date. huh?', 30, () => {
      addChoice('Back to Hall', () => showTimeScene(), 'button secondary');
    });
    return;
  }
const txt = "You travel back to " + escapeHtml(dateBirth) + 
". You arrive at a weird place... You feel the cold air and dim light, it started to rain..\n" +
"You see someone knocking at a door and leaving a baby in a crib.. Wait, that's your house!!\n"+
"That baby was you!!!\n"+
"Now you get it... Now you understand it all..These aren’t your real parents...\n" +
"The truth is you were adopted, and no one told you.... Your whole life was a lie.\n"+
"The hat starts vibrating and pulls you back to the present.\n" +  "The inventor says softly: Some journeys change you forever....Right?\n" + 
"You quickly wipe your tear. Yeah.. \n"+
"(What's your next move?)";
  typeWrite(txt, 30, () => {
    visited.timemachine = true; updateFooter();
    addChoice('See Another Memory', () => timeSpecialMemory());
    addChoice('Continue to Next Machine', () => showTransportScene());
    addChoice('Back to Science Fair', () => showMainHall(), 'button secondary');
  });
}

function timeSpecialMemory() {
  clearChoices();
  const date = prompt('Enter the date of your special memory (DD/MM/YYYY):');
  if (!date) {
    typeWrite('So, you decided not to enter a date. huh? (wise choice) ', 30, () => {
      addChoice('Back to Hall', () => showTimeScene(), 'button secondary');
    });
    return;
  }
  const txt = "You travel back to " + escapeHtml(date) + 
  ". You step into a bright hall and take a look around, you recognise this place....\n" +
  "Yes!! Of course!! \n" + 
  "Your first ever science fair...\n" + 
  "There you are, young, proud, showing off your invention so proudly.\n" + 
  "You watch as the judges smile and award you the golden trophy.\n" + 
  "That moment where it all began. You remember every detail of it...How time flies.\n"+
  "You return to the present with a warm smile: That's where it all began....\n\n"+ 
  "(What's your next choice?)";
  typeWrite(txt, 30, () => {
    visited.timemachine = true; updateFooter();
    addChoice('Continue to Next Machine', () => showTransportScene());
    addChoice('Back to Hall', () => showMainHall(), 'button secondary');
  });
}

///Future path 
function timeFuture() {
  clearChoices();
  const txt = "The hat starts to vibrate, You open your eyes and look around you into this strange world, into the year 33025..\n"+
  "As you look around you, you see explosions in the space!! The sky is literally on fire!!\n" + 
"You see floating cities, there aren't even any engines, they're just floating!?\n" +
"Some people caught your attenteion. 'How do they get up to these cities?', you think to yourself.\n"+
"Then you find them disappear into some holes in the ground....A voice suddenly catches your attention from behind you.\n"+
"You follow the robot through markets of light, to find a museum of 'Ancient Technology' where your old phone is an exhibit..\n"
" 'Welcome traveler, A tall robot greets you, We've been expecting you.'\n\n" +
" and a historian tells you your name is remembered for a great invention, but they refuse to spoil it.....\n"
"(chose your next step)"
  typeWrite(txt, 30, () => {
    visited.timemachine = true; updateFooter();
    addChoice('Return to Present', () => showMainHall());
    addChoice('Back to Hall', () => showTimeScene(), 'button secondary');
  });
}

///Transportation machine

function showTransportScene() {
  clearChoices();
  const textIdk = `Welcome to the Transportation Machine !!!\n\n
  A glowing portal frame stands before you. "Where to?" asks the inventor.`;
  typeWrite(textIdk, 30, () => {
    addChoice('Hawaii', () => transportIsland());
    addChoice('Outer Space', () => transportSpace());
    addChoice('Back to Hall', () => showMainHall(), 'button secondary');
  });
}

function transportIsland() {
  clearChoices();
  const txt = `In a flash, you arrive on a sunny beach. Parrots singing around you. Looking down to your hand you find a a coconut that tastes like summer.\n
   You relax in a chair and enjoy the sun and the beautiful turquoise water.\n
   after a few minutes the inventor appears through another portal. "Enjoying?", He said. \n
   you nod. (Time to chose next step buddy :)`;
  typeWrite(txt, 30, () => {
    visited.transport = true; updateFooter();
    addChoice('Back to Hall', () => showMainHall(), 'button secondary');
    addChoice('Try Outer Space', () => transportSpace());
  });
}

function transportSpace() {
  clearChoices();
  const txt = `The portal blinks and you float in zero gravity under a cluster of stars.\n
Alien musicians play instruments made of meteorites.\n
An alien gives you a shimmering rock that sings softly...(a treasure if you ask me!)`;
  typeWrite(txt, 30, () => {
    visited.transport = true; updateFooter();
    addChoice('Back to Hall', () => showMainHall(), 'button secondary');
    addChoice('Try Island', () => transportIsland());
  });
}

///Ice Cream machine
function showIceScene() {
  clearChoices();
  const textIdk = `Welcome to the Talking Ice Cream Machine!!!\n\n
  A cone pops out and says, "Knock knock!"\n
   The inventor winks: "How do you respond?"`;
  typeWrite(textIdk, 30, () => {
    addChoice('Play Along', () => icePlay());
    addChoice('Ask for a Song', () => iceSong());
    addChoice('Back to Hall', () => showMainHall(), 'button secondary');
  });
}

function icePlay() {
  clearChoices();
  const txt = `You: "Who's there?".\n
  Ice cream: "Scoop".\n
  You: "Scoop who?."\n
  Ice cream: "Scoop-er excited to meet you...I almost melted waiting :) "`;
  typeWrite(txt, 30, () => {
    visited.ice = true; updateFooter();
    addChoice('Back to Hall', () => showMainHall(), 'button secondary');
    addChoice('Ask for a Song', () => iceSong());
  });
}

function iceSong() {
  clearChoices();
  const txt = `The cone starts singing:\n
In a waffle house or on the sunny street.\n
Every little lick makes the world complete.\n
Sprinkles are dancing, the waffle says hi.\n
If you don’t eat me fast, I might just cry!`;
  typeWrite(txt, 30, () => {
    visited.ice = true; updateFooter();
    addChoice('Back to Hall', () => showMainHall(), 'button secondary');
    addChoice('Play Along', () => icePlay());
  });
}

//Mini robot machine

function showRobotScene() {
  clearChoices();
  const textIdk = `Welcome to the Mini Robot!!\n\n
  A palm-sized robot with cartoon eyes jumps infront of you.\n
  "Your command, boss!" What will you ask it to do?`;
  typeWrite(textIdk, 30, () => {
    addChoice('Ask it to Dance', () => robotDance());
    addChoice('Ask it to Help', () => robotHelp());
    addChoice('Back to Hall', () => showMainHall(), 'button secondary');
  });
}

function robotDance() {
  clearChoices();
  const txt = `The robot performs a tiny moonwalk, ending with an adorable robotic bow.\n
   you film the performance and everyone smiles. (chose next step buddy:) )`;
  typeWrite(txt, 30, () => {
    visited.robot = true; updateFooter();
    addChoice('Back to Hall', () => showMainHall(), 'button secondary');
  });
}

function robotHelp() {
  clearChoices();
  const txt = `The robot snaps into assistant mode.\n
  It gives you a polite salute and a sticker that says "I helped!"\n
  Then with tiny tools it folds paperclips into a tiny chair and sits on it looking at you carefully.`;
  typeWrite(txt, 30, () => {
    visited.robot = true; updateFooter();
    addChoice('Back to Hall', () => showMainHall(), 'button secondary');
  });
}

///finale

function showFinalScene() {
  clearChoices();
  const textIdk = `The Announcement!! (Choose the Winner)\n
  You look carefully around you holding out a golden medal.....\n
   "Which invention wins the 2025 Science Fair? (Pick carefully!)"`;
  typeWrite(textIdk, 30, () => {
    addChoice('Time Travel Machine', () => showWinner('Time Travel Machine', `The metal hat lights up!! \n People cheer as tiny hologram scenes are projected from inside.\n Mini hourglasses are handed out as souvenirs too!!`));
    addChoice('Transportation Machine', () => showWinner('Transportation Machine', `The portal shimmers.\n People clap for the promise of safe, speedy travel and daydream of beaches and stars....\n Maybe that is the future ;) ? `));
    addChoice('Talking Ice Cream Machine', () => showWinner('Talking Ice Cream Machine', `The cone jumps playfully.\n Children laugh and judges are happy with this fun invention.\n Mini singing cones are given as silly prizes.`));
    addChoice('Mini Robot', () => showWinner('Mini Robot', `The tiny robot waves as the crowd happily and prod\n . Judges praise its clever, cute design and practical help (lol), small but mighty.`));
    addChoice('Back to Main Hall', () => showMainHall(), 'button secondary');
  });
}

function showWinner(name, extra) {
  clearChoices();
const textIdk = "And the Winner is : " + name + "!\n\n" + extra + "\n\nThe inventor Screams Happily\n as you look to them remembering your first science fair too!!";
  typeWrite(textIdk, 30, () => {
    alert("The inventor screams happily! (Good job)");
    addChoice('Play Again', () => restartGame(), 'button secondary');
    addChoice('Exit / Finish', () => showExit(), 'button');
  });
}

//end or play again?

function showExit() {
  clearChoices();
  typeWrite(`Thanks for visiting the 2025 Science Fair! You walk away with strange souvenirs, new ideas, and a head buzzing with plans.`, 30, () => {
    addChoice('Play Again', () => restartGame(), 'button secondary');
  });
}

function restartGame() {
  visited = { timemachine: false, transport: false, ice: false, robot: false };
  updateFooter();
  showIntro();
}

/////////returns value even if user didn't type anything
function escapeHtml(text) { 
  if (!text) return ''; 
  return text; 
}



updateFooter();
showIntro();
