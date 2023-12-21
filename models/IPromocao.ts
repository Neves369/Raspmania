interface IPromocao {
    id: number,
    titulo: string,
    descricao: string,
    status: boolean,
    data_inicio: string,
    data_fim: string,
    resgate: boolean,
    isClienteResgatado: boolean,
    imagens: string[][],
    pagInicial: number,
    pagQnt : number,
    destaque: boolean

}

export default IPromocao;
