interface IExtrato {
    id: string,
    clienteId: string,
    tipoOperacao: string,
    descricao: string,
    data: string,
    pontuacao: number,
    dataVencimento: string
}

export default IExtrato;