const ScreenManager = (function(){
    // object to store the name, DOM element pair of a screen
    let _screens = {};
    // current screen being displayed
    let _currentScreen = null;

    // store screen name, DOM element pair in screens
    function initializeScreens(obj) {
        // obj will have screenName, screenId pair
        for (const [screenName, screenId] of Object.entries(obj)) {
            // if the given screenId exists in the DOM
            if (document.getElementById(screenId)) {
                _screens[screenName] = document.getElementById(screenId);
            } else {
                console.log(`Invalid screenId: ${screenId} does not exist`);
            }
        }
    }

    // the current displayed screen is displayed with a class of 'active'
    // this function removes the class from the last screen and adds it to screen to be shown
    function showScreen(screenName) {
        // if currentScreen is not null (usually only at start)
        if (_currentScreen) {
            _screens[_currentScreen].classList.remove('active');
        }

        // if screenName provided is a valid one and exists in _screens obj
        if (_screens[screenName]) {
            _screens[screenName].classList.add('active');
            _currentScreen = screenName; // update the currentScreen
        } else {
            console.log(`Invalid screenName: ${screenName} does not exist`);
        }
    }

    return {
        initializeScreens,
        showScreen,
    }
})()


// make the different modes available more scalable 
const MODES = {
    COMPUTER: 'computer',
    HUMAN: 'human',
}


class Game {
    constructor() {
        ScreenManager.initializeScreens({
            'start': 'start-game',
            'mode': 'choose-mode',
            'play': 'play-game',
            'level': 'choose-difficulty',
        });
        // mode : whom are you going to play against? computer or player
        this._mode = null;
        // difficulty level
        this._level = null;
    }

    // open the game
    start() {
        ScreenManager.showScreen('start');
    }

    // open the screen where player has to select mode
    selectMode() {
        ScreenManager.showScreen('mode');
    }

    // open screen where player has to choose difficulty
    selectDifficulty() {
        ScreenManager.showScreen('level');
    }

    // play game given mode = mode, and level
    play(mode, level = null) {
        // not a valid mode
        if (mode != MODES.COMPUTER && mode != MODES.HUMAN) {
            console.log(`Invalid mode: ${mode} does not exist`);
            return;
        }
        if (mode == MODES.COMPUTER) {
            // level must be between 1(easy) and 3(hard)
            if (level == null || level < 1 || level > 3) {
                console.log(`Invalid level`);
                return;
            }
            this._level = level;
        }
        this._mode = mode;
        // open screen to play game
        ScreenManager.showScreen('play');
    }   
}


// handle all button clicks
const ButtonEventHandler = (function(){
    function initializeButtons(game) {
        addBtnListener('.start-btn', () => game.selectMode());
        addBtnListener('.computer-btn', () => game.selectDifficulty());
        addBtnListener('.human-btn', () => game.play(MODES.HUMAN));
        addBtnListener('.back-btn', () => game.start());
        document.querySelectorAll('.level-btn').forEach((btn) => {
            btn.addEventListener('click', () => game.play(MODES.COMPUTER, parseInt(btn.id)));
        })
    }

    // add eventListener to button.className with event function as func
    function addBtnListener(className, func) {
        document.querySelector(className).addEventListener('click', func);
    }

    return {
        initializeButtons,
    }
})()


const game = new Game()
game.start();
ButtonEventHandler.initializeButtons(game);