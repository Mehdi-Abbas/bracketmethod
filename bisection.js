let main = document.getElementById("main")
    let tableStr = `
            <table>
                <tr>
                    <th>iteration</th>
                    <th>x<sub>L</sub></th>
                    <th>x<sub>u</sub></th>
                    <th>f(x<sub>L</sub>)</th>
                    <th>f(x<sub>u</sub>)</th>
                    <th>x<sub>r</sub></th>
                    <th>f(x<sub>r</sub>)</th>
                    <th>error</th>
                </tr>`

    function getY(coeffs, x) {

        let n = 0
        let exp = coeffs.length - 1
        for (i = 0; i < coeffs.length; i++) {
            n += (coeffs[i] * (x ** exp))
            exp--
        }
        return n
    }
    function getDiff(num1, num2) {
        let temp = Math.abs((num1 - num2) / num1) * 100
        temp = Math.trunc(temp)
        return temp
    }
    function getcenter(num1, num2) {
        return ((num1 + num2) / 2)
    }
    let s = 1
    function findRoots(coeffs, interval, err, itr, dec) {
        if (getY(coeffs, interval[0]) * getY(coeffs, interval[1]) < 0) {
            tableStr += `
                <tr>
                    <td>${s}</td>
                    <td>${interval[0].toFixed(dec)}</td>
                    <td>${interval[1].toFixed(dec)}</td>
                    <td>${getY(coeffs, interval[0]).toFixed(dec)}</td>
                    <td>${getY(coeffs, interval[1]).toFixed(dec)}</td>
                    <td>${getcenter(interval[0], interval[1]).toFixed(dec)}</td>
                    <td>${getY(coeffs, getcenter(interval[0], interval[1])).toFixed(dec)}</td>
                    <td>${getDiff(getcenter(interval[0], interval[1]), interval[interval[2]]) + "%"}</td>
                </tr>`
            s++
            if (getDiff(getcenter(interval[0], interval[1]), interval[interval[2]]) <= err ||
                itr <= 0) {
                console.log("err: " + err + " error: " + getDiff(getcenter(interval[0], interval[1]), interval[interval[2]]))
                return getcenter(interval[0], interval[1]).toFixed(dec)
            }
            else {



                let center = getcenter(interval[0], interval[1])//center
                console.log("interval: " + interval)
                console.log("err: " + err + " error: " + getDiff(getcenter(interval[0], interval[1]), interval[interval[2]]))
                console.log("center: " + getcenter(interval[0], interval[1]).toFixed(dec))

                if (getY(coeffs, interval[0]) * getY(coeffs, center) < 0) {
                    interval[1] = center
                    interval[2] = 1
                }
                else if (getY(coeffs, interval[0]) * getY(coeffs, center) > 0) {
                    interval[0] = center
                    interval[2] = 0
                }
                else {
                    err = 10000 //making error infinite to stop iteration
                }


                return findRoots(coeffs, interval, err, itr - 1, dec)
            }
        }
        else if (document.getElementById("eqn").value === "") {
            document.getElementById("ans").style.fontSize = "1rem"
            return "Enter query first!"
        }
        else if (getY(coeffs, interval[0]) * getY(coeffs, interval[1]) > 0) {
            document.getElementById("ans").style.fontSize = "1rem"
            console.log("inte: " + interval)
            console.log("fxl: " + getY(coeffs, interval[0]) + " fxu: " + getY(coeffs, interval[1]))
            return "Interval must contain only a single root!"
        }

        else {
            document.getElementById("ans").style.fontSize = "1rem"
            return "Root is either one of given interval point"
        }
    }



    let button = document.getElementById("btn")
    button.addEventListener("click", (e) => {
        e.preventDefault()
        s = 1
        tableStr = `
            <table>
                <tr>
                    <th>iteration</th>
                    <th>x<sub>L</sub></th>
                    <th>x<sub>u</sub></th>
                    <th>f(x<sub>L</sub>)</th>
                    <th>f(x<sub>u</sub>)</th>
                    <th>x<sub>r</sub></th>
                    <th>f(x<sub>r</sub>)</th>
                    <th>error</th>
                </tr>`
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
        let err = document.getElementById("err").value
        err = parseFloat(err)

        let itr = document.getElementById("itr").value
        itr = parseInt(itr)
        let dec = document.getElementById("dec").value
        dec = parseInt(dec)

        let root = findRoots(coeffsInt, intervalInt, err, itr, dec)
        tableStr += `</table>`
        document.getElementById("table").innerHTML = tableStr
        document.getElementById("ans").innerText = root

        let answer = document.getElementById("answer")
        answer.classList.replace("hide", "block")
        document.getElementById("btn-reset").classList.replace("hide", "block")

        let table = document.getElementById("table")
        table.classList.replace("hide", "block")

        document.getElementById('table').scrollIntoView();
    })
    document.getElementById("btn-reset").addEventListener("click", (e) => {
        e.preventDefault()
        document.getElementById("eqn").value = ""
        document.getElementById("interval").value = ""
        document.getElementById("err").value = ""
        document.getElementById("itr").value = ""
        document.getElementById("dec").value = ""
        answer.classList.replace("block", "hide")
        document.getElementById("ans").style.fontSize = "2rem"
        document.getElementById("btn-reset").classList.replace("block", "hide")
        document.getElementById("table").classList.replace("block", "hide")
    })