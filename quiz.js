const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'Which actress played Eve Moneypenny in Skyfall (2012) and Spectre (2015)?',
        choice1: 'Naomie Harris',
        choice2: 'Stephanie Sigman',
        choice3: 'Thandie Newton',
        choice4: 'Angel Coulby',
        answer: 1,
    },
    {
        question: 'Where is the Casino Royale located in Casino Royale (2006)?',
        choice1: 'Bosnia',
        choice2: 'Croatia',
        choice3: 'Montenegro',
        choice4: 'Hungary',
        answer: 3,
    },
    {
        question: 'In which movie does James Bond leave the main villan stranded in the desert with only a can of engine oil?',
        choice1: 'Casino Royale(2006)',
        choice2: 'Quantum of Solace(2008)',
        choice3: 'Skyfall(2012)',
        choice4: 'Spectre(2015)',
        answer: 2,
    },
    {
        question: 'In Spectre (2015), which character visits James Bond in his London appartment?',
        choice1: 'Gareth Mallory',
        choice2: 'Estrella',
        choice3: 'Eve Moneypenny',
        choice4: 'Q',
        answer: 3,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}



getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()