const convertButton = document.querySelector(".convert-button");
const currencySelect = document.querySelector(".currency-select");
const fromCurrencySelect = document.querySelector(".from-currency-select");

function convertValues() {
    const inputCurrencyValue = parseFloat(document.querySelector(".input-currency").value);
    const CurrencyValueToConvert = document.querySelector(".currency-value-to-convert"); // valor em moeda de origem
    const CurrencyValueToConverted = document.querySelector(".currency-value"); // valor em moeda de destino 

    const exchangeRates = {
        real: 1, // Real é a moeda base
        dolar: 5.73,
        euro: 6.28,
        libra: 7.32,
        bitcoin: 310749.41 // Supondo 1 Bitcoin = 310,749.41 Reais (ajuste conforme necessário)
    };

    // Verifica se o valor de entrada é válido
    if (isNaN(inputCurrencyValue) || inputCurrencyValue <= 0) {
        CurrencyValueToConvert.innerHTML = "Valor inválido";
        CurrencyValueToConverted.innerHTML = "";
        return;
    }

    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = currencySelect.value;

    // Converte o valor de entrada para a moeda base (Real)
    const valueInReal = inputCurrencyValue / exchangeRates[fromCurrency];

    // Converte o valor da moeda base para a moeda de destino
    const convertedValue = valueInReal * exchangeRates[toCurrency];

    // Exibe o valor em moeda de origem
    CurrencyValueToConvert.innerHTML = new Intl.NumberFormat(getCurrencyLocale(fromCurrency), {
        style: "currency",
        currency: getCurrencyCode(fromCurrency)
    }).format(inputCurrencyValue);

    // Exibe o valor convertido na moeda de destino
    CurrencyValueToConverted.innerHTML = new Intl.NumberFormat(getCurrencyLocale(toCurrency), {
        style: "currency",
        currency: getCurrencyCode(toCurrency)
    }).format(convertedValue);
}

// Função auxiliar para obter o código da moeda baseado no valor selecionado
function getCurrencyCode(currency) {
    switch (currency) {
        case "dolar":
            return "USD";
        case "euro":
            return "EUR";
        case "libra":
            return "GBP";
        case "real":
            return "BRL";
        case "bitcoin":
            return "BTC";
        default:
            return ""; // Adiciona um caso default para evitar retornos indefinidos
    }
}

// Função auxiliar para obter o locale baseado no valor selecionado
function getCurrencyLocale(currency) {
    switch (currency) {
        case "dolar":
            return "en-US";
        case "euro":
            return "de-DE";
        case "libra":
            return "en-GB";
        case "real":
            return "pt-BR";
        case "bitcoin":
            return "en-US"; // Bitcoin não tem um locale específico, mas pode ser "en-US" por padrão
        default:
            return "en-US"; // Adiciona um caso default para evitar retornos indefinidos
    }
}

// Função para atualizar o nome e a imagem da moeda
function updateCurrencyDisplay() {
    const fromCurrencyName = document.getElementById("from-currency-name");
    const fromCurrencyImage = document.querySelector(".from-currency-img");
    const toCurrencyName = document.getElementById("currency-name");
    const toCurrencyImage = document.querySelector(".currency-img");

    // Atualiza o nome e a imagem da moeda de origem
    switch (fromCurrencySelect.value) {
        case "real":
            fromCurrencyName.innerHTML = "Real";
            fromCurrencyImage.src = "./assets/real.png";
            break;
        case "dolar":
            fromCurrencyName.innerHTML = "Dólar americano";
            fromCurrencyImage.src = "./assets/dolar.png";
            break;
        case "euro":
            fromCurrencyName.innerHTML = "Euro";
            fromCurrencyImage.src = "./assets/euro.png";
            break;
        case "libra":
            fromCurrencyName.innerHTML = "Libra";
            fromCurrencyImage.src = "./assets/libra.png";
            break;
        case "bitcoin":
            fromCurrencyName.innerHTML = "Bitcoin";
            fromCurrencyImage.src = "./assets/bitcoin.png"; // Adicione a imagem do Bitcoin
            break;
        default:
            fromCurrencyName.innerHTML = "Moeda desconhecida";
            fromCurrencyImage.src = ""; // Limpa a imagem se a moeda for desconhecida
            break;
    }

    // Atualiza o nome e a imagem da moeda de destino
    switch (currencySelect.value) {
        case "real":
            toCurrencyName.innerHTML = "Real";
            toCurrencyImage.src = "./assets/real.png";
            break;
        case "dolar":
            toCurrencyName.innerHTML = "Dólar americano";
            toCurrencyImage.src = "./assets/dolar.png";
            break;
        case "euro":
            toCurrencyName.innerHTML = "Euro";
            toCurrencyImage.src = "./assets/euro.png";
            break;
        case "libra":
            toCurrencyName.innerHTML = "Libra";
            toCurrencyImage.src = "./assets/libra.png";
            break;
        case "bitcoin":
            toCurrencyName.innerHTML = "Bitcoin";
            toCurrencyImage.src = "./assets/bitcoin.png"; // Adicione a imagem do Bitcoin
            break;
        default:
            toCurrencyName.innerHTML = "Moeda desconhecida";
            toCurrencyImage.src = ""; // Limpa a imagem se a moeda for desconhecida
            break;
    }

    convertValues(); // Converte os valores após a mudança de moeda
}

// Adiciona os eventos para mudança de seleção e clique no botão
currencySelect.addEventListener("change", updateCurrencyDisplay);
fromCurrencySelect.addEventListener("change", updateCurrencyDisplay);
convertButton.addEventListener("click", convertValues);

// Atualiza a moeda ao carregar a página
updateCurrencyDisplay();
