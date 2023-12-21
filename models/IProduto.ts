interface IProduto {
    id: number,
    titulo: string,
    descricao: string,
    status: boolean,
    sku: string,
    valor: number,
    pontosParaResgate: number,
    quantidade: number,
    estoque: number,
    imagens: string[][],
    pagInicial: number,
    pagQnt: number
}

export default IProduto;
