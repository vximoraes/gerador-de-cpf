// Gerar um CPF.
function gerarCpf(): string {
    let cpf: number[] = []

    // Gerar os primeiros 9 dígitos do CPF.
    for (let i = 0; i < 9; i++) {
        let numero: number = Math.floor(Math.random() * 10)
        cpf.push(numero)
    }
    
    // Calcular e inserir o primeiro digito verificador do CPF.
    let resultadoSoma1: number = 0

    for (let i = 0; i < 9; i++) {
        resultadoSoma1 += cpf[i] * (10 - i)
    }
    
    let resto1: number = (resultadoSoma1 * 10) % 11
    let primeiroDigitoVerificador = (resto1 < 10) ? resto1 : 0

    cpf.push(primeiroDigitoVerificador)

    // Calcular e inserir o segundo digito verificador do CPF.
    let resultadoSoma2: number = 0

    for (let i = 0; i < 10; i++) {
        resultadoSoma2 += cpf[i] * (11 - i)
    }

    let resto2: number = (resultadoSoma2 * 10) % 11
    let segundoDigitoVerificador = (resto2 < 10) ? resto2 : 0

    cpf.push(segundoDigitoVerificador)

    // Retornar o CPF como uma string.
    return cpf.join('')
}

// Validar o CPF gerado.
function validarCpf(cpf: string): boolean {
    // Validar o primeiro digito verificador. 
    let resultadoSoma1: number = 0

    for (let i = 0; i < 9; i++) {
        resultadoSoma1 += parseInt(cpf[i]) * (10 - i)
    }
    
    let resto1: number = (resultadoSoma1 * 10) % 11
    let primeiroDigitoVerificador = (resto1 < 10) ? resto1 : 0

    // Validar o segundo digito verificador.
    let resultadoSoma2: number = 0

    for (let i = 0; i < 10; i++) {
        resultadoSoma2 += parseInt(cpf[i]) * (11 - i)
    }

    let resto2: number = (resultadoSoma2 * 10) % 11
    let segundoDigitoVerificador = (resto2 < 10) ? resto2 : 0

    // Retornar true: válido ou false: inválido.
    return (parseInt(cpf[9]) == primeiroDigitoVerificador && parseInt(cpf[10]) == segundoDigitoVerificador) 
}

function formatarCpf(cpf: string): string {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}

// Gerar e verificar um CPF até que seja um CPF válido.
function gerarCpfValido(): string {
    let cpf: string
    do {
        cpf = gerarCpf()
    } while (!validarCpf(cpf))
    return formatarCpf(cpf)
}


document.querySelector('#gerarCpf')?.addEventListener('click', (e) => {
    e.preventDefault()

    const cpfGerado = document.querySelector<HTMLInputElement>('#saida')
    const copiarBtn = document.querySelector<HTMLButtonElement>('#copiarCpf')
    const cpf = gerarCpfValido()

    if (cpfGerado) {
        cpfGerado.value = `${cpf}`

        // Reseta o botão "Copiar CPF" para o estado original (ícone de copiar)
        if (copiarBtn) {
            copiarBtn.innerHTML = '<img src="src/assets/images/copiar.png" alt="Copiar" style="filter: brightness(0) invert(1);">'
        }
    } else {
        console.error('Elemento #saida não encontrado') 
    }
})

document.querySelector('#copiarCpf')?.addEventListener('click', async (e) => {
    e.preventDefault()

    const cpfGerado = document.querySelector<HTMLInputElement>('#saida')
    const copiarBtn = document.querySelector<HTMLButtonElement>('#copiarCpf')

    if (cpfGerado && copiarBtn) {
        try {
            await navigator.clipboard.writeText(cpfGerado.value)

            // Altera o botão para o ícone "Copiado".
            copiarBtn.innerHTML = '<img src="src/assets/images/copiado.png" alt="Copiado" style="filter: brightness(0) invert(1);">'

            setTimeout(() => {
                copiarBtn.innerHTML = '<img src="src/assets/images/copiar.png" alt="Copiar" style="filter: brightness(0) invert(1);">'
            }, 3000)
        } catch (err) {
            console.error('Erro ao copiar o CPF:', err)
        }
    } else {
        console.error('Elemento #saida não encontrado')
    }
})
