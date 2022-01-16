function getY(coeffs, x) {

    let n = 0
    let exp = coeffs.length - 1
    for (i = 0; i < coeffs.length; i++) {
        n += (coeffs[i] * (x ** exp))
        exp--
    }
    return n
}

function findIntegral(coeffs, interval, n, dec) {
    if (document.getElementById("eqn").value !== "") {
        let h = (interval[1] - interval[0]) / n

        let sum = getY(coeffs, interval[0])
        let currentX = interval[0]
        for (let i = 0; i < n - 1; i++) {
            currentX += h
            if (i % 2 === 0)
                sum += (4 * getY(coeffs, currentX))
            else
                sum += (2 * getY(coeffs, currentX))
        }
        sum += getY(coeffs, interval[1])
        console.log(sum)
        sum = (interval[1] - interval[0]) * (sum / (3 * n))
        sum = sum.toFixed(dec)
        return (sum)
    }
    else {
        document.getElementById("ans").style.fontSize = "1rem"
        return "Enter query first!"
    }
}



let button = document.getElementById("btn")
button.addEventListener("click", (e) => {
    e.preventDefault()
    s = 1

    let coeffs = document.getElementById("eqn").value
    coeffs = coeffs.split(",")
    coeffsInt = []
    for (i in coeffs) {
        coeffsInt.push(parseFloat(coeffs[i]))
    }
    let interval = document.getElementById("interval").value
    interval = interval.split(",")
    intervalInt = []
    for (i in interval) {
        intervalInt.push(parseFloat(interval[i]))
    }
    intervalInt.push(0)
    let dec = document.getElementById("dec").value
    dec = parseInt(dec)

    let n = document.getElementById("n").value
    n = parseInt(n)

    let intergral = findIntegral(coeffsInt, intervalInt, n, dec)
    document.getElementById("ans").innerText = intergral

    let answer = document.getElementById("answer")
    answer.classList.replace("hide", "block")
    document.getElementById("btn-reset").classList.replace("hide", "block")

})
document.getElementById("btn-reset").addEventListener("click", (e) => {
    e.preventDefault()
    document.getElementById("eqn").value = ""
    document.getElementById("interval").value = ""
    document.getElementById("dec").value = ""
    document.getElementById("n").value = ""
    answer.classList.replace("block", "hide")
    document.getElementById("ans").style.fontSize = "2rem"
    document.getElementById("btn-reset").classList.replace("block", "hide")
    document.getElementById("table").classList.replace("block", "hide")
})