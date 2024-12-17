import Cliente from "../../domain/Cliente";
import IStrategy from "../IStrategy";
import Entidade from "../../domain/Entidade";
import Usuario from "../../domain/Usuario";
import Endereco from "../../domain/Endereco";

/*Regra de Negócio RN0026
* RN0026 - Para todo cliente cadastrado é obrigatório o cadastro dos seguintes dados: Gênero, Nome, 
* Data de Nascimento, CPF, Telefone (deve ser composto pelo tipo, DDD e número), e-mail, senha, endereço residencial.
*/

/*Regra de Negócio RN0023
* RN0023 - Todo cadastro de endereços associados a clientes deve ser composto dos seguintes dados: Tipo de
* residência (Casa, Apartamento, etc), Tipo Logradouro, Logradouro, Número, Bairro, CEP, Cidade, Estado e
* País. Todos os campos anteriores são de preenchimento obrigatório. 
* Opcionalmente pode ser preenchido um campo observações.
*/

export default class ValidarDadosObrigatorios implements IStrategy<Entidade> {
    public async processar(entidade: Entidade): Promise<string | undefined> {
        if (entidade instanceof Usuario) {
            if (!entidade.email || 
                !entidade.senha ||
                !entidade.nome
            ) {
                return "Dados obrigatórios de usuário não preenchidos";
            }
            return "";
        }
        if (entidade instanceof Cliente){
            if (!entidade.genero ||
                !entidade.dtNascimento||
                !entidade.telefone||
                !entidade.enderecos ||
                !entidade.usuario.nome ||
                !entidade.usuario.email ||
                !entidade.cpf ||
                !entidade.usuario.senha
            ) {
                return "Dados obrigatórios de cliente não preenchidos";
            }

            for (const endereco of entidade.enderecos) {
                if (!endereco.tipoResidencia ||
                    !endereco.tipoLogradouro ||
                    !endereco.logradouro ||
                    !endereco.numero ||
                    !endereco.bairro ||
                    !endereco.cep ||
                    !endereco.cidade ||
                    !endereco.estado ||
                    !endereco.pais
                ) {
                    return "Dados obrigatórios de endereço não preenchidos";
                }
            }
            
            return "";
        }
        if (entidade instanceof Endereco) {
            if (!entidade.tipoResidencia ||
            !entidade.tipoLogradouro ||
            !entidade.logradouro ||
            !entidade.numero ||
            !entidade.bairro ||
            !entidade.cep ||
            !entidade.cidade ||
            !entidade.estado ||
            !entidade.pais) 
            {
                return "Dados obrigatórios de endereço não preenchidos";
            }
            return "";
        }
    }
}