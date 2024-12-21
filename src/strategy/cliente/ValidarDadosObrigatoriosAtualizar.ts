import Cliente from "../../domain/Cliente";
import Entidade from "../../domain/Entidade";
import IStrategy from "../IStrategy";

export default class ValidarDadosObrigatoriosAtualizar implements IStrategy<Entidade> {
    public async processar(entidade: Entidade): Promise<string | undefined> {
        if (entidade instanceof Cliente){
            if (!entidade.genero ||
                !entidade.dtNascimento||
                !entidade.telefone||
                !entidade.usuario.nome ||
                !entidade.usuario.email ||
                !entidade.cpf
            ) 
            {
                return "Dados obrigatórios de cliente não preenchidos";
            }
            return "";
        }
    }
}