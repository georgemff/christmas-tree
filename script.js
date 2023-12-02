
const colors = {
    1: "#fc0000",
    2: "#40ff00",
    3: "#002fff",
    4: " #b700ff"
}

function createChildPines() {
    let pines = document.querySelectorAll('.pine');

    for (let i = 0; i < pines.length; i++) {
        let pine = pines[i];
        for (let j = 1; j < 10; j++) {
            let el = document.createElement('span');
            el.classList.add('pine_' + j)
            pine.appendChild(el)
        }
    }
}

function createPines() {
    let branches = document.querySelectorAll('.branch');
    for (let i = 0; i < branches.length; i++) {
        for (let j = 0; j < i + 1; j++) {
            let pine = document.createElement('div');
            pine.classList.add('pine');
            branches[i].appendChild(pine)
        }
    }

    createChildPines();
}

function createBranches() {
    let tree = document.querySelector('.tree');

    for (let i = 0; i < 20; i++) {
        let branch = document.createElement('div');
        branch.classList.add('branch');
        tree.appendChild(branch)
    }

    createPines();
}

function treeLightning() {
    setInterval(() => {
        let randomColor_1 = randomIntFromInterval(1, 4);
        let randomColor_2 = randomIntFromInterval(1, 4);
        let randomPine_1 = randomIntFromInterval(1, 9);
        let randomPine_2 = randomIntFromInterval(1, 9);
        let pine_1 = document.querySelectorAll('.pine_' + randomPine_1);
        let pine_2 = document.querySelectorAll('.pine_' + randomPine_2);

        for (let i = 0; i < pine_1.length; i++) {
            pine_1[i].classList.add('color_' + randomColor_1);

            setTimeout(() => {
                pine_1[i].classList.remove('color_' + randomColor_1)
            }, 1000)
        }


        for (let i = 0; i < pine_2.length; i++) {
            pine_2[i].classList.add('color_' + randomColor_2);

            setTimeout(() => {
                pine_2[i].classList.remove('color_' + randomColor_2)
            }, 1000)
        }


    }, 1000)
}

function starLightning() {
    setInterval(() => {
        let elementSelectors = ['.top', '.right', '.bottom-right', '.bottom-left', '.left', '.pentagon'];
        let nodeElements = {}
        let randNums = {};
        for (let i = 1; i < 7; i++) {
            randNums['random_' + i] = randomIntFromInterval(1, 4);
        }

        for (let selector of elementSelectors) {
            let elName = selector.includes('-') ? selector.substring(1).replace('-', '_') : selector.substring(1)
            nodeElements[elName] = document.querySelector(selector)
        }

        nodeElements.top.classList.add('border-bottom-color-' + randNums.random_1);
        nodeElements.right.classList.add('border-left-color-' + randNums.random_2);
        nodeElements.bottom_right.classList.add('border-top-color-' + randNums.random_3);
        nodeElements.bottom_left.classList.add('border-top-color-' + randNums.random_4);
        nodeElements.left.classList.add('border-right-color-' + randNums.random_5);
        nodeElements.pentagon.classList.add('pentagon-top-color-' + randNums.random_6)
        nodeElements.pentagon.classList.add('pentagon-bottom-color-' + randNums.random_6)

        setTimeout(() => {
            nodeElements.top.classList.remove('border-bottom-color-' + randNums.random_1);
            nodeElements.right.classList.remove('border-left-color-' + randNums.random_2);
            nodeElements.bottom_right.classList.remove('border-top-color-' + randNums.random_3);
            nodeElements.bottom_left.classList.remove('border-top-color-' + randNums.random_4);
            nodeElements.left.classList.remove('border-right-color-' + randNums.random_5);
            nodeElements.pentagon.classList.remove('pentagon-top-color-' + randNums.random_6)
            nodeElements.pentagon.classList.remove('pentagon-bottom-color-' + randNums.random_6)
        }, 100)
    }, 100)
}


function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getTimeBeforeChristmas() {
    setInterval(() => {
        let date1 = new Date();
        let date2 = new Date(new Date().getFullYear(), 11, 31, 23, 59, 59);
        let diffTime = Math.abs(date2 - date1);

        let total_seconds = Math.floor(diffTime / 1000);
        let total_minutes = Math.floor(total_seconds / 60);
        let total_hours = Math.floor(total_minutes / 60);
        let days = Math.floor(total_hours / 24);


        let seconds = Math.floor(total_seconds % 60);
        let minutes = Math.floor(total_minutes % 60);
        let hours = Math.floor(total_hours % 24);

        let dateEl = document.querySelector('#days');
        let secondsTxt = 'Seconds';
        if (seconds < 10) {
            secondsTxt = 'Second'
        }
        dateEl.innerHTML = days + ' Days ' + hours + ' Hours ' + minutes + ' Minutes ' + seconds + ' ' + secondsTxt + ' ';
    }, 1000)
}

function createmanyStars() {
    let body = document.querySelector('body');
    body.style.position = 'relative';
    for (let i = 0; i < 500; i++) {
        let star = document.createElement('span');
        star.style.position = 'absolute';
        star.style.display = 'inline-block';
        star.style.backgroundColor = '#ffffff'
        star.style.width = '1px';
        star.style.height = '1px';
        let leftPosition = randomIntFromInterval(1, 99);
        let rightPosition = randomIntFromInterval(1, 99);
        star.style.top = leftPosition + '%'
        star.style.left = rightPosition + '%'
        body.appendChild(star)
    }
}

function createFireElements() {
    let fires = {};
    let container = document.querySelector('.container')

    for (let i = 1; i <= 72; i++) {
        fires[i] = document.createElement('span');
        fires[i].classList.add('fires');
        let rand = randomIntFromInterval(1, 4);
        fires[i].style.backgroundColor = colors[rand];
        container.appendChild(fires[i])
    }
    return fires;
}

function fireworks() {
    let fires = createFireElements()

    let maxBottomPosition = randomIntFromInterval(60, 80);
    let bottomPosition = 0;
    let leftPosition = randomIntFromInterval(1, 50);
    let delay = 10;
    let shotInterval = setInterval(() => {
        bottomPosition++;
        delay += 1;

        for (let i in fires) {
            fires[i].style.left = leftPosition + '%';
            fires[i].style.bottom = bottomPosition + '%';
        }

        if (bottomPosition >= maxBottomPosition) {
            clearInterval(shotInterval);
            fireWorkBoom(fires);
        }

    }, delay)
}


function fireWorkBoom(fires) {
    //(x + r cos(2kπ/n), y + r sin(2kπ/n))

    let px = document.querySelector('.fires').offsetLeft,
     py = document.querySelector('.fires').offsetTop;

    let x = px - 5, y = py + 300;
    let r = 1;

    for(let a = 0; a<25; a++) {

        for(let i in fires) {
            x = x + r * Math.cos((2*(i*Math.PI)/72))
            y = y + r * Math.sin((2*(i*Math.PI)/72))
            fires[i].style.left = x + 'px';
            fires[i].style.bottom = y + 'px';
            hide(fires[i], 100*a)
        }
        r+=0.5;
        y-=5.5;
        if(a < 24) {
        fires = createFireElements()

        }
    }

}

function hide(el, d){
    setTimeout(() => {
        el.classList.add('hide-fire');
        setTimeout(() => {
            el.remove();
        }, 2000)
    }, d)
}

!function main() {
    createBranches();
    treeLightning();
    getTimeBeforeChristmas();
    starLightning();
    createmanyStars();
    fireworks()
    setInterval(() => {
            fireworks()
    }, 7000)
}();