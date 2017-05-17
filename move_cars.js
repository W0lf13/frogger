/* 
 * Filename: move_cars.js
 * Author: Wolf
 * Date: 2017/05/12
 * Defintion: All js logic for the game
 */

// jQuery call, fires when document ready
jQuery(document).ready(function () {

    // add cars to the area
    addCar();
    addCar();
    addCar();

    // fires off the function that moves all cars
    runCars();

    // add a car to the playableArea
    function addCar() {
        var newCar = document.createElement('div');

        newCar.id = 'car' + parseInt($('.car').length + 1);
        newCar.className = 'car';

        document.getElementById('playableArea').appendChild(newCar);

        // change the left position after created (after css rules pulled in)
        newCar.style.left = 0 - + $('.car').width();
    }

    // fires off the mechanism to move all cars
    function runCars() {

        // for each car class
        $('.car').each(function (i) {

            // move each car, within its own loop
            moveThisCar($(this));
        });
    }

    // move the specific car that is parsed in
    function moveThisCar(elem) {

        // check weather or not the car is on the left of the screen (needs to be moved or not)
        var moveLeft = 0;
        var ranNum = Math.floor(Math.random() * 4000) + 1500;

        if (parseInt(elem.css("left")) == 0 - elem.width()) {
            moveLeft = $("#playableArea").width();
        }
        else {
            moveLeft = 0 - elem.width();
        }

        // moves the car left to right, at a randomly generated speed
        elem.animate({
            left: moveLeft,
            queue: false,
        }, {
                duration: ranNum,

                // for each step of the animation, chekc to see if there is collision between the player, and this car
                step: function () {
                    testCollision($('#player').position(), $('#player'), elem.position(), elem);
                },
                // once the element has completed its movement cycle, re-call func to move this specific car again
                complete: function () {
                    // rotate the div (car) 180 deg
                    if (elem.css('transform') == 'none') {
                        elem.css({ 'transform': 'rotate(180deg)' });
                    }
                    else {
                        elem.css({ 'transform': '' });
                    }

                    // move the div to the other side of the screen
                    moveThisCar(elem);
                }
            });
    }// end function moveThisCar(elem) {

    // arrow keys used to control player movement
    var playerDiv = document.getElementById('player');
    document.onkeydown = function (evt) {
        evt = evt || window.event;

        if (evt.keyCode == 37) {
            var currentPos = playerDiv.offsetLeft;
            $('#player').css('left', (parseInt(currentPos) - 10) + 'px');
        }
        else if (evt.keyCode == 38) {
            var currentPos = playerDiv.offsetTop;
            $('#player').css('top', (parseInt(currentPos) - 10) + 'px');
        }
        else if (evt.keyCode == 39) {
            var currentPos = playerDiv.offsetLeft;
            $('#player').css('left', (parseInt(currentPos) + 10) + 'px');
        }
        else if (evt.keyCode == 40) {
            var currentPos = playerDiv.offsetTop;
            $('#player').css('top', (parseInt(currentPos) + 10) + 'px');
        }
    }

    // check for collision between player and any cars
    function testCollision(position1, size1, position2, size2) {

        var car = size2;

        if (((position1.left + size1.width()) > position2.left) &&
            ((position1.top + size1.height()) > position2.top) &&
            ((position2.left + size2.width()) > position1.left) &&
            ((position2.top + size2.height()) > position1.top)) {

            //// DETERMIN WHAT THE BEST COURSE OF ACTIONS WILL BE HERE, FOR NOW, REMOVED
            // stop all cars from moving
            /*
            $('.car').each(function (i) {
                $(this).stop(true, false);
            });
            */

            // indicate to the user that they died
            $('#playableArea').css('background', 'rgba(228, 10, 10, 0.44)');
            setTimeout(function () {
                $('#playableArea').css('background', '');
            }, 700);

            $('#player').css('top', '0px');/// resets player for now, for testing
            ////console.log('grats, you reached level xxx);

        }
    }
});

