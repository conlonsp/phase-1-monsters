document.addEventListener('DOMContentLoaded', event => {
  addMonsToPage()
  getMons()
  nextFiftyMons()
  lastFiftyMons()
  form = document.querySelector('#monster-form')
  form.addEventListener('submit', event => {
    event.preventDefault()
    let name = document.querySelector('#name').value
    let age = document.querySelector('#age').value
    let description = document.querySelector('#description').value
    createNewMon(name, age, description)
    form.reset()
  })
})

function addMonsToPage() {
  createMonster = document.querySelector('#create-monster')
  let form = document.createElement('form')
    form.id = 'monster-form'
  let nameInput = document.createElement('input')
    nameInput.id = 'name'
    nameInput.setAttribute('placeholder', 'Monster Name...')
  let ageInput = document.createElement('input')
    ageInput.id = 'age'
    ageInput.setAttribute('placeholder', 'Monster Age...')
  let desInput = document.createElement('input')
    desInput.id = 'description'
    desInput.setAttribute('placeholder', 'Monster Description...')
  let btn = document.createElement('button')
    btn.textContent = 'Create Monster'
  createMonster.append(form)
  form.append(nameInput, ageInput, desInput, btn)
}

function getMons() {
  //let countClicks = 1
  fetch('http://localhost:3000/monsters/?_limit=50&_page=1')
  .then(resp => resp.json())
  .then(monsters => {
    let monsterContain = document.getElementById('monster-container')
    monsters.map(mon => {
      let showMon = document.createElement('div')
      let h2 = document.createElement('h2')
        h2.textContent = mon.name
      let h4 = document.createElement('h4')
        h4.textContent = `Age: ${mon.age}`
      let p = document.createElement('p')
        p.textContent = `Bio: ${mon.description}`
      monsterContain.append(showMon)
      showMon.append(h2, h4, p)
    })
  })
}

function createNewMon(name, age, description) {
  fetch('http://localhost:3000/monsters', {
    method: 'POST',
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({name, age, description})
  })
  .then(resp => resp.json())
  .then(monsters => monsters)
}

function nextFiftyMons() {
  const forward = document.getElementById('forward')
  let countClicks = 1
  forward.addEventListener('click', event => {
    countClicks += 1
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${countClicks}`)
    .then(resp => resp.json())
    .then(monsters => {
      let monsterContain = document.getElementById('monster-container')
      monsters.map(mon => {
        let showMon = document.createElement('div')
        let h2 = document.createElement('h2')
          h2.textContent = mon.name
        let h4 = document.createElement('h4')
          h4.textContent = `Age: ${mon.age}`
        let p = document.createElement('p')
          p.textContent = `Bio: ${mon.description}`
        monsterContain.append(showMon)
        showMon.append(h2, h4, p)
      })
    })
  })
}

function lastFiftyMons() {
  const back = document.getElementById('back')
  let countBack = 1
  back.addEventListener('click', event => {
    countBack -= 1
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${countBack}`)
    .then(resp => resp.json())
    .then(monsters => {
      let monsterContain = document.getElementById('monster-container')
      monsters.map(mon => {
        let showMon = document.createElement('div')
        let h2 = document.createElement('h2')
          h2.textContent = mon.name
        let h4 = document.createElement('h4')
          h4.textContent = `Age: ${mon.age}`
        let p = document.createElement('p')
          p.textContent = `Bio: ${mon.description}`
        monsterContain.append(showMon)
        showMon.append(h2, h4, p)
      })
    })
  })
}

 