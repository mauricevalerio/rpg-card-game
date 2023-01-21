function getDiceRollArray(diceCount) {
    return new Array(diceCount).fill(0).map(() => (Math.floor((Math.random() * 6)) + 1))
}

function getDicePlaceholderHtml(diceCount) {
    return new Array(diceCount).fill(0).map(() => `<div class="placeholder-dice"></div>`).join('')
}

function getDots(num) {
    if (num === 1) {
        return `<div class='dice'>
                <span class='dot one'></span>
                </div>`
    } else if (num === 2) {
        return `<div class='dice'>
                <span class='dot two'></span>
                <span class='dot two'></span>
                </div>`
    } else if (num === 3) {
        return `<div class='dice'>
                <span class='dot three'></span>
                <span class='dot three'></span>
                <span class='dot three'></span>
                </div>`
    } else if (num === 4) {
        return `<div class='dice'>
                <span class='dot four'></span>
                <span class='dot four'></span>
                <span class='dot four'></span>
                <span class='dot four'></span>
                </div>`
    } else if (num === 5) {
        return `<div class='dice'>
                <span class='dot five'></span>
                <span class='dot five'></span>
                <span class='dot five'></span>
                <span class='dot five'></span>
                <span class='dot five'></span>
                </div>`
    } else if (num === 6) {
        return `<div class='dice'>
                <span class='dot six'></span>
                <span class='dot six'></span>
                <span class='dot six'></span>
                <span class='dot six'></span>
                <span class='dot six'></span>
                <span class='dot six'></span>
                </div>`
    }
}

const getPercentage = (remainingHealth, maximumHealth) => (100 * remainingHealth) / maximumHealth

export { getDiceRollArray, getDicePlaceholderHtml, getPercentage, getDots }