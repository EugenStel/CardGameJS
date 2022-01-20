let arrClass = ['microbial_mat', 'arrows', 'zig_zag', 'upholstery', 'rainbow_bokeh', 'steps', 'cross', 'madras', 'waves', 'cicada_stripes', 'pyramid', 'chocolate_weave', 'cross_dots', 'honey_comb', 'blueprint_grid', 'tartan'];
const gameArea = document.getElementsByClassName('card_game')[0];
const gameStartButton = document.getElementsByClassName('game_start')[0];

let hasFlippedCard = 0;
let tempCard;
let firstCard;
let secondCard;

let counterClicks = 0;
let wonsCounter = 0;

function createCards() {
    for (let i = 1; i <= 2; i++) {
        arrClass.forEach((elem) => {
            let card;
            let frontSide;
            let backSide;
            const gameAreaActive = document.getElementsByClassName('card_game_active')[0];
            card = document.createElement('div');
            card.classList.add('card');
            gameAreaActive.append(card);
            frontSide = document.createElement('div');
            frontSide.classList.add('card_font');
            card.append(frontSide);
            backSide = document.createElement('div');
            backSide.classList.add('card_back');
            backSide.classList.add(elem);
            card.dataset.name = elem;
            card.append(backSide);
        });
    };
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        let ramdomPos = Math.floor(Math.random() * 32);
        card.style.order = ramdomPos;
    });


    function turnCard() {

        this.classList.add('turn');
        if (hasFlippedCard === 0) {
            firstCard = this;
            hasFlippedCard++;
            return tempCard = firstCard;
        } else {
            secondCard = this;
            hasFlippedCard = 0;
        }


        function handler(e) {
            e.stopPropagation();
            e.preventDefault();
        };


        function checkMatchCards() {
            counterClicks++;
            if (tempCard.dataset.name === secondCard.dataset.name) {
                document.addEventListener("click", handler, true)
                setTimeout(() => {
                    tempCard.style.opacity = 0;
                    secondCard.style.opacity = 0;
                    wonsCounter++;
                    getWonSteps();
                    document.removeEventListener("click", handler, true);
                }, 600);

            } else {
                document.addEventListener("click", handler, true);
                setTimeout(() => {
                    tempCard.classList.remove('turn');
                    secondCard.classList.remove('turn');
                    document.removeEventListener("click", handler, true);
                }, 800);

            }
        }
        checkMatchCards();

        function getWonSteps() {
            if (wonsCounter === 16) {
                alert(`Congratulations! You won in ${counterClicks} clicks!`);
            }
        }

    };


    cards.forEach(card => card.addEventListener('click', turnCard));
}



gameStartButton.addEventListener('click', () => {
    gameStartButton.classList.remove('game_begin');
    gameStartButton.classList.add('game_begin_off');
    gameArea.classList.add('card_game_active');
    gameArea.classList.remove('card_game');
    createCards(arrClass);
});