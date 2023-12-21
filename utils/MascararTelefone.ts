const mascararTelefone = (telefone: string, tamanho: number) => {

    let ret = "";

    for(let i = 0; i < (tamanho - 3); i++){
        ret = ret + "*";
    }

    let ultimosTresCaracteres = telefone.substr(telefone.length - 3);
    return ret + ultimosTresCaracteres;

}

export default mascararTelefone;