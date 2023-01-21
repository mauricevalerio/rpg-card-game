import characterData from "./data.js"
import Character from "./Character.js"

let monsterArray = ["orc", "demon", "goblin"]
let isWaiting = false

function getNewMonster() {
	const nextMonsterData = characterData[monsterArray.shift()];
	return monsterArray.length >= 0 ? new Character(nextMonsterData) : {}
}

let wizard = new Character(characterData.hero)
let monster = getNewMonster()

function animationLoad() {
	document.getElementById('monster').classList.add('load-monster')
	document.getElementById('hero').classList.add('load-hero')
}

function removeAnimation() {
	document.getElementById('monster').classList.remove('move-dead')
	document.getElementById('hero').classList.remove('move-dead')
}

function render() {
	removeAnimation()
	animationLoad()
	document.getElementById('monsters-left-text').textContent = `Monsters left: ${monsterArray.length}`
	document.getElementById('hero').innerHTML = wizard.getCharacterHtml(monster.currentDiceScore)
	document.getElementById('monster').innerHTML = monster.getCharacterHtml(wizard.currentDiceScore)
}

render()

function attack() {
	if (!isWaiting) {
		wizard.setDiceHtml()
		monster.setDiceHtml()
		wizard.takeDamage(monster.currentDiceScore)
		monster.takeDamage(wizard.currentDiceScore)
		render()

		if (wizard.dead && monster.dead) { //wizard and monster are dead but monsterArray still has contents
			document.getElementById('hero').classList.add('move-dead')
			document.getElementById('monster').classList.add('move-dead')
			if (monsterArray.length) {
				monster = getNewMonster()
				endGame()
			}
			endGame()

		} else if (monster.dead) { //monster is dead, load next monster
			document.getElementById('monster').classList.add('move-dead')
			isWaiting = true
			if (monsterArray.length) {
				setTimeout(() => {
					monster = getNewMonster()
					wizard.currentDiceScore = [] //sets the wizard dice to placeholder after a monster is dead
					isWaiting = false
					render()
				}, 1500)
			}
			else {
				endGame() //all monsters dead
			}
		}
		else if (wizard.dead) { //wizard is dead
			document.getElementById('hero').classList.add('move-dead')
			endGame()
		}
	}
}

function endGame() {
	isWaiting = true
	const endMessage = wizard.health ? "The Wizard wins" : monster.health ? "The monsters were victorious" : "No victors - all creatures are dead"

	const endEmoji = wizard.health ? "🔮" : "☠️"
	setTimeout(() => {
		document.body.innerHTML =
			`<div class="end-game">
			<h2>Game Over</h2>
			<h3>${endMessage}</h3>
			<p class="end-emoji">${endEmoji}</p>
			<button id='play-again-button'>Play Again!</button>
			</div>`
		document.getElementById('play-again-button').addEventListener('click', playAgain)
	}, 1500)
}

function playAgain() {
	isWaiting = false
	monsterArray = ["orc", "demon", "goblin"]
	document.body.innerHTML = `
	<main>
		<div id="hero"></div>
		<div id="monster"></div>    
	</main>
	<section id="monsters-left-text" class="monsters-left-text"></section>
	<section id="actions">
		<button id="attack-button">Attack</button>
	</section>`
	document.getElementById('attack-button').addEventListener('click', attack)
	wizard = new Character(characterData.hero)
	monster = getNewMonster()
	render()
}

document.getElementById('attack-button').addEventListener('click', attack)

