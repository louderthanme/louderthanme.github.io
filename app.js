const express = require('express')
const path = require('path')
const app = express();
const poetryData = require('./data.json')
const poets = Object.keys(poetryData);

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');

function randNum() {
    const num = Math.floor((Math.random() * poets.length))
    return num
}

function onetwo() {
    const value = Math.floor((Math.random() * 2) + 1)
    if (value === 1) {
        letterNumber = 'one'
    } else {
        letterNumber = 'two'
    }
    return letterNumber
}

console.log(onetwo());


app.get('/', (req, res) => {
    const padraig = poetryData.padraig
    const firstPadraigPoem = padraig.poems.one
    const secondPadraigPoem = padraig.poems.two

    const ruben = poetryData.ruben
    const firstRubenPoem = ruben.poems.one
    const secondRubenPoem = ruben.poems.two

    const ada = poetryData.ada
    const firstAdaPoem = ada.poems.one
    const secondAdaPoem = ada.poems.two

    const chris = poetryData.chris
    const firstChrisPoem = chris.poems.one
    const secondChrisPoem = chris.poems.two

    const kaveh = poetryData.kaveh
    const firstKavehPoem = kaveh.poems.one
    const secondKavehPoem = kaveh.poems.two

    const tayi = poetryData.tayi
    const firstTayiPoem = tayi.poems.one
    const secondTayiPoem = tayi.poems.two

    res.render('home', { padraig, firstPadraigPoem, secondPadraigPoem, ruben, firstRubenPoem, secondRubenPoem, tayi, firstTayiPoem, secondTayiPoem, ada, firstAdaPoem, secondAdaPoem, chris, firstChrisPoem, secondChrisPoem, kaveh, firstKavehPoem, secondKavehPoem })
})

app.get('/:poet/:number', (req, res) => {
    const { poet } = req.params;
    const { number } = req.params;
    const data = poetryData[poet]
    const poemsData = data.poems
    const poetName = data.name
    if (number === 'one') {
        const poemNumber = poemsData[number]
        const poemLines = poemNumber.lines
        const poemTitle = poemNumber.title
        const otherPoem = poemsData['two'].title
        const otherPoemNumber = 'two'
        res.render('poem', { ...data, poetName, poemLines, poemTitle, otherPoem, otherPoemNumber, poet })
    } else if (number === 'two') {
        const poemNumber = poemsData[number]
        const poemLines = poemNumber.lines
        const poemTitle = poemNumber.title
        const otherPoem = poemsData['one'].title
        const otherPoemNumber = 'one'
        res.render('poem', { ...data, poetName, poemLines, poemTitle, otherPoem, otherPoemNumber, poet })
    }
})


app.get('/randompoem', (req, res) => {

    const num = randNum();
    const poet = poets[num];
    const data = poetryData[poet]
    const poemsData = data.poems
    const poetName = data.name

    const number = onetwo();



    if (number === "one") {
        const poemNumber = poemsData[number]
        const poemLines = poemNumber.lines
        const poemTitle = poemNumber.title
        const otherPoem = poemsData['two'].title
        const otherPoemNumber = 'two'

        res.render('randompoem', { ...data, poetName, poemLines, poemTitle, otherPoem, otherPoemNumber, poet })
    } else if (number === "two") {
        const poemNumber = poemsData[number]
        const poemLines = poemNumber.lines
        const poemTitle = poemNumber.title
        const otherPoem = poemsData['one'].title
        const otherPoemNumber = 'one'
        res.render('randompoem', { ...data, poetName, poemLines, poemTitle, otherPoem, otherPoemNumber, poet })
    }
})

app.get('/*', (req, res) => {
    res.render('error')

})

app.listen(3000, () => {
    console.log('listening on port 3000')
})

