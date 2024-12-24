const data = {

    "types": {
        "imovel": {
            //"term": 180,
            "tax": 0.23
        },

        "veiculo": {
            //"term": 100,
            "tax": 0.16
        }
    }
}

const canDoMath = true

export default async function result(req, res) {

    if (req.method === "POST") {
        const { value, type, term } = req.body

        function makeMath() {
            let consortiumType = type
            let tax = data.types[consortiumType].tax
            let creditValue = value

            let conversion = creditValue.replace(/[^\d,]/g, "")
            conversion = conversion.replace(",", ".")
            let numericValue = parseFloat(conversion)

            let creditResult = numericValue * tax + numericValue
            let fullInstallment = creditResult / term
            let halfInstallment = fullInstallment / 2

            let finalFullInstallment = Number(fullInstallment.toFixed(2)).toLocaleString("pt-br", { minimumFractionDigits: 2 })
            let finalHalfInstallment = Number(halfInstallment.toFixed(2)).toLocaleString("pt-br", { minimumFractionDigits: 2 })

            return {
                "credito": creditValue,
                "prazo": term,
                "parcelaIntegral": finalFullInstallment,
                "meiaParcela": finalHalfInstallment
            }
        }

        if (canDoMath) {

            let { credito, prazo, parcelaIntegral, meiaParcela } = makeMath()
            let toJson = {
                "credito": credito,
                "parcelaIntegral": parcelaIntegral,
                "meiaParcela": meiaParcela,
                "prazo": prazo,
            }

            res.status(200).json(toJson)
        }

    }

}