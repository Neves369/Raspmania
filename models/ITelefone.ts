interface ITelefone {
    id: string,
    telefonePrincipal: boolean,
    telefone: string,
    beneficiarioId: number,
    corretorId: number,
    credorId: number,
    credorPagadorId: number,
    dataUltimaAlteracao: number,     
    motivoInativacaoTelefone: string,
    pagadorId: number,
    status: boolean,             
    tipoTelefone: string,
    titularId: number,
    usuarioUltimaAlteracao: string,
    whatsApp: boolean,
}

export default ITelefone;


