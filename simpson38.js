function getY(coeffs, x) {

    let n = 0
    let exp = coeffs.length - 1
    for (i = 0; i < coeffs.length; i++) {
        n += (coeffs[i] * (x ** exp))
        exp--
    }
    return n
}

function findIntegral(coeffs, interval, dec) {
    if (document.getElementById("eqn").value !== "") {
        let h = (interval[1] - interval[0]) / 3
        let n = (interval[1] - interval[0]) * ((getY(coeffs, interval[0]) + (3 * getY(coeffs, interval[0] + h)) + (3 * getY(coeffs, interval[1] - h)) + getY(coeffs, interval[1])) / 8)
        n = n.toFixed(dec)
        return (n)
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

    let intergral = findIntegral(coeffsInt, intervalInt, dec)
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
    answer.classList.replace("block", "hide")
    document.getElementById("ans").style.fontSize = "2rem"
    document.getElementById("btn-reset").classList.replace("block", "hide")
    document.getElementById("table").classList.replace("block", "hide")
})