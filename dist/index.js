"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b;
// Gerar um CPF.
function gerarCpf() {
    let cpf = [];
    // Gerar os primeiros 9 dígitos do CPF.
    for (let i = 0; i < 9; i++) {
        let numero = Math.floor(Math.random() * 10);
        cpf.push(numero);
    }
    // Calcular e inserir o primeiro digito verificador do CPF.
    let resultadoSoma1 = 0;
    for (let i = 0; i < 9; i++) {
        resultadoSoma1 += cpf[i] * (10 - i);
    }
    let resto1 = (resultadoSoma1 * 10) % 11;
    let primeiroDigitoVerificador = (resto1 < 10) ? resto1 : 0;
    cpf.push(primeiroDigitoVerificador);
    // Calcular e inserir o segundo digito verificador do CPF.
    let resultadoSoma2 = 0;
    for (let i = 0; i < 10; i++) {
        resultadoSoma2 += cpf[i] * (11 - i);
    }
    let resto2 = (resultadoSoma2 * 10) % 11;
    let segundoDigitoVerificador = (resto2 < 10) ? resto2 : 0;
    cpf.push(segundoDigitoVerificador);
    // Retornar o CPF como uma string.
    return cpf.join('');
}
// Validar o CPF gerado.
function validarCpf(cpf) {
    console.log(`Validando o CPF: ${cpf}`);
    // Validar o primeiro digito verificador. 
    let resultadoSoma1 = 0;
    for (let i = 0; i < 9; i++) {
        resultadoSoma1 += parseInt(cpf[i]) * (10 - i);
    }
    let resto1 = (resultadoSoma1 * 10) % 11;
    let primeiroDigitoVerificador = (resto1 < 10) ? resto1 : 0;
    // Validar o segundo digito verificador.
    let resultadoSoma2 = 0;
    for (let i = 0; i < 10; i++) {
        resultadoSoma2 += parseInt(cpf[i]) * (11 - i);
    }
    let resto2 = (resultadoSoma2 * 10) % 11;
    let segundoDigitoVerificador = (resto2 < 10) ? resto2 : 0;
    // Retornar true: válido ou false: inválido.
    return (parseInt(cpf[9]) == primeiroDigitoVerificador && parseInt(cpf[10]) == segundoDigitoVerificador);
}
// Gerar e verificar um CPF até que seja um CPF válido.
function gerarCpfValido() {
    let cpf;
    do {
        cpf = gerarCpf();
    } while (!validarCpf(cpf));
    return cpf;
}
(_a = document.querySelector('#gerarCpf')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', (e) => {
    e.preventDefault();
    const cpfGerado = document.querySelector('#saida');
    const cpf = gerarCpfValido();
    if (cpfGerado) {
        cpfGerado.value = `${cpf}`;
    }
    else {
        console.error('Elemento #saida não encontrado');
    }
});
(_b = document.querySelector('#copiarCpf')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const cpfGerado = document.querySelector('#saida');
    if (cpfGerado) {
        try {
            yield navigator.clipboard.writeText(cpfGerado.value);
            alert('CPF copiado para a área de transferência!');
        }
        catch (err) {
            console.error('Erro ao copiar o CPF:', err);
        }
    }
    else {
        console.error('Elemento #saida não encontrado');
    }
}));
