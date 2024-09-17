function calcular() {
    // Pega os números digitados e converte em um array, separando por espaço
    const numerosInput = document.getElementById("numbers").value;
    const numerosArray = numerosInput.split(' ').map(Number);

    // Filtra entradas inválidas
    if (numerosArray.some(isNaN)) {
        document.getElementById("result").innerHTML = "Por favor, insira apenas números válidos.";
        return;
    }

    // Verifica se há pelo menos dois números para o cálculo amostral
    if (numerosArray.length < 2) {
        document.getElementById("result").innerHTML = "O cálculo do desvio padrão amostral requer pelo menos dois números.";
        return;
    }

    // Calcula a média
    const media = calcularMedia(numerosArray);

    // Calcula o desvio padrão amostral
    const desvioPadraoAmostral = calcularDesvioPadraoAmostral(numerosArray, media);

    // Exibe os resultados com 4 casas decimais
    document.getElementById("result").innerHTML = `
        <p><strong>Passo 1:</strong> Calcular a Média:</p>
        <p>Média (soma dos valores / quantidade): ${media.toFixed(4)}</p>

        <p><strong>Passo 2:</strong> Calcular a diferença de cada número para a média, elevar ao quadrado e somar os resultados:</p>
        <p>Diferenças elevadas ao quadrado: ${numerosArray.map(num => `(${num} - ${media.toFixed(4)})² = ${((num - media) ** 2).toFixed(4)}`).join(', ')}</p>

        <p><strong>Passo 3:</strong> Dividir essa soma por (n - 1) (variância amostral):</p>
        <p>Variância amostral = ${numerosArray.reduce((acum, num) => acum + (num - media) ** 2, 0).toFixed(4)} / (${numerosArray.length} - 1) = ${(numerosArray.reduce((acum, num) => acum + (num - media) ** 2, 0) / (numerosArray.length - 1)).toFixed(4)}</p>

        <p><strong>Passo 4:</strong> Tirar a raiz quadrada da variância amostral (desvio padrão amostral):</p>
        <p>Desvio padrão amostral = ${desvioPadraoAmostral.toFixed(4)}</p>
    `;
}

// Função para calcular a média
function calcularMedia(numeros) {
    const soma = numeros.reduce((acc, num) => acc + num, 0);
    return soma / numeros.length;
}

// Função para calcular o desvio padrão amostral
function calcularDesvioPadraoAmostral(numeros, media) {
    const varianciaAmostral = numeros.reduce((acum, num) => acum + (num - media) ** 2, 0) / (numeros.length - 1);
    return Math.sqrt(varianciaAmostral);
}