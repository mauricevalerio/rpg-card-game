import { getDiceRollArray, getDicePlaceholderHtml, getPercentage, getDots } from './utils.js'

export default class Character {
    constructor(data) {
        Object.assign(this, data)
        this.maximumHealth = this.health
        this.diceHtml = getDicePlaceholderHtml(this.diceCount) //render placeholder dice
    }
    getHealthBarHtml() {
        const percent = getPercentage(this.health, this.maximumHealth)
        return `<div class="health-bar-outer">
            <div class="health-bar-inner ${percent < 26 ? "danger" : ""}" 
                style="width: ${percent}%;">
            </div>
        </div>`
    }
    getCharacterHtml(attackScoreArray) {
        const { name, avatar, health, diceHtml, diceCount, currentDiceScore, maximumHealth } = this
        const healthBar = this.getHealthBarHtml()
        return `<div class="character-card">
				<h4 class="name"> ${name} </h4>
				<img class="avatar" src="${avatar}"/>
				<p class="health">health: <b>${health}/${maximumHealth}</b>
                <span class='damage-text'>${attackScoreArray.length ? '-' + attackScoreArray.reduce((total, currentScore) => total + currentScore) : ''}</span>
                </p>
                ${healthBar}

				<div class="dice-container">${currentDiceScore.length ? diceHtml : getDicePlaceholderHtml(diceCount)}</div>
			</div>`
    }
    setDiceHtml() {
        this.currentDiceScore = getDiceRollArray(this.diceCount)
        this.diceHtml = this.currentDiceScore.map(num => getDots(num)).join('')
    }
    takeDamage(attackScoreArray) {
        const totalAttackScore = attackScoreArray.reduce((total, currentScore) => total + currentScore)
        this.health -= totalAttackScore
        if (this.health <= 0) {
            this.health = 0
            this.dead = true
        }

    }
}