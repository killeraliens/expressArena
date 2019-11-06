// const fs = require('fs');
// console.log("directory name:", __dirname);
// console.log("process env", process.env);
// const myReadMe = fs.readFileSync('../alexandra-brinn/README.md', 'utf-8')
// console.log(myReadMe);

const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(morgan('dev'))
app.use(express.json())

app.listen(8000, () => {
  console.log('express arena listening on port 8000');
})

app.get('/', (req, res) => {
  res.send('public messages')
})

app.get('/convos', (req, res) => {
  res.send('your conversations')
})

app.get('/echo', (req, res) => {
  const reqText = `
    Request object details...
    baseUrl: ${req.baseUrl},
    hostname: ${req.hostname},
    path: ${req.path},
    ip: ${req.ip},
    fresh?: ${req.fresh},
    method: ${req.method} ,
    params: ${Object.keys(req.params).join(' ')},
    body: ${req.body}
  `;

  res.send(reqText);

})

app.get('/queryViewer', (req, res) => {
  // console.log(req.query)

  const name = req.query.name;
  const race = req.query.race;

  if (!name) {
    return res.status(400).send('Please provide name')
  }

  if (!race) {
    return res.status(400).send('Please provide race')
  }

  const greeting = `Greetings ${name} of the ${race} people`;
  console.log(req.cookies);
  res.send(greeting)
})

app.get('/sum', (req, res) => {
  const a = req.query.a;
  const b = req.query.b;

  if (a && b ) {
    const sum = parseInt(a, 10) + parseInt(b, 10);

    //res.send(`the sum of ${a} and ${b} = ${sum}`)
    isNaN(sum)
     ? res.status(400).send('Must be two numbers please')
     : res.send(`the sum of ${a} and ${b} = ${sum}`)
  }
  res.status(400).send('Set a and b values with numbers')
})

app.get('/cipher', (req, res) => {
  const text = req.query.text;
  const shift = req.query.shift;

  if(!text || !shift) {
    return res.status(400).send('missing text or shift field')
  }

  if(shift && isNaN(parseInt(shift))) {
    return res.status(400).send('shift field must be a number')
  }
  const textArr = text.toLowerCase().split('');
  const newText = textArr.map(letter => {

    let newCharCode = letter.charCodeAt(0) + parseInt(shift, 10)
    const charNum =  newCharCode >= 122
      ? (newCharCode - 122) + 96
      : newCharCode
    return String.fromCharCode(charNum)
  })

  res.send(newText.join(''))
})
