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

