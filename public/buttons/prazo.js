const terms = {
    imovel: [
        180,
        200,
        220
    ],

    veiculo: [
        //72,
        100,
        120
    ]
}

function prazo() {
    const tipoConsorcio = document.querySelector("select#tipo-consorcio")
    const prazo = document.querySelector("select#prazo")
    let options = prazo.querySelectorAll("option")
    
    function resetOptions() {
        prazo.innerHTML = ""
    }

    function optionsToVehicle() {

        for (let i = 0; i < terms.veiculo.length; i++) {
            const element = options[i];
            
            prazo.innerHTML += `<option value="${terms.veiculo[i]}">${terms.veiculo[i]}</option>`
        }
    }

    function optionsToProperdy() {

        for (let i = 0; i < terms.imovel.length; i++) {
            const element = options[i];
            
            prazo.innerHTML += `<option value="${terms.imovel[i]}">${terms.imovel[i]}</option>`
        }
    }

    function switchTerm() {

        resetOptions()

        if (options[0].value == "180") { // então está no modo imóvel
            optionsToVehicle()
        } else { // só pode estar no modo veículo
            optionsToProperdy()
        }

        options = prazo.querySelectorAll("option")
    }

    if (options[0].value == "180") { // resgatar tipo de consórcio para não precisar resetar tudo
        tipoConsorcio.selectedIndex = 0
    } else {
        tipoConsorcio.selectedIndex = 1
    }

    tipoConsorcio.addEventListener("change", (any) => {
        switchTerm()
    })
}