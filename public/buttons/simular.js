function simular() {
    let simulateButton = document.querySelector("button#simulate")

    let valor = document.querySelector("input#valor")
    let tipoConsorcio = document.querySelector("select#tipo-consorcio")
    let prazo = document.querySelector("select#prazo")

    simulateButton.addEventListener("click", () => {

        let inputs = document.querySelector("section.inputs")
        let campos = inputs.querySelectorAll("input")
        let err = document.querySelector("div#error")

        function canSimulate() {

            for (let input of campos) {
                if (input.value == "" && input.name != "E-mail") {
                    inputs.style.borderRadius = ".0rem 0rem .5rem .5rem"
                    err.style.visibility = "visible"
                    err.innerHTML = `
<img src="img/erro-saida.png" alt="imagem de erro">
<p>Falta o campo <strong>${input.getAttribute("name")}</strong>!</p>
`
                    return false
                }

            }

            return true
        }

        function showResult(data) {
            const { credito, parcelaIntegral, meiaParcela, prazo } = data
            const main = document.querySelector("main")

            main.style.gap = 0
            main.style.justifyContent = "center"
            main.innerHTML = `
        <table>
<thead>
<tr>
    <th>Crédito</th>
    <th>1/2 Parcela</th>
    <th>Prazo Reduzido</th>
    <th>Parcela Integral</th>
</tr>
</thead>
<tbody>
<tr>
    <td id="credito">${credito}</td>
    <td id="meia-parcela">${meiaParcela}</td>
    <td id="prazo">${prazo}</td>
    <td id="parcela-integral">${parcelaIntegral}</td>
</tr>
</tbody>
</table>

<div class="more-info">
<h2>Isocred - TG</h2>
<!-- <p>SC 478 - Centro - Timbó Grande/SC</p> -->
</div>

<iframe id="map-location"
src="https://www.google.com/maps/embed?pb=!4v1726500481396!6m8!1m7!1sonb5LXT43PCo_eWPpIHEzw!2m2!1d-26.61669599133243!2d-50.67243243060593!3f23.168675536506022!4f-7.958388462885765!5f0.43604482460884963"
title="localização do google maps" allowfullscreen="" referrerpolicy="no-referrer-when-downgrade"></iframe>

<div id="simulate-again">
<p>Caso você queira simular novamente, <a href="">clique aqui!</a>
</p>
</div>
        `
        }

        if (canSimulate()) {
            //console.log("Passou!")

            async function httpRequest() {
                console.log(prazo.value)
                await fetch("/api/result", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        value: valor.value,
                        term: prazo.value,
                        type: tipoConsorcio.value,
                    })
                })

                    .then(response => response.json())
                    .then(data => {
                        showResult(data)
                        console.log(data)
                    })
            }

            simulateButton.disabled = true
            httpRequest()
        }
    })
}