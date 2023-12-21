import ITelefone from "./ITelefone";

interface ICliente {
    nome: string,
	senha: string,
	confirmacaoSenha: string,
	documento: string,
	email: string,
	origemAssociado: string,
	autoCadastro: boolean;
	tipoChavePix: string,
	chavePix: string,
	saldo: number,
	premiacao: number,
	telefone: string,
	dataNascimento: string,
	raspadinhas: Array<any>,
	extrato: Array<any>
}

export default ICliente;