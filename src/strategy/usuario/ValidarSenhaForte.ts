import Cliente from "../../domain/Cliente";
import Entidade from "../../domain/Entidade";
import Usuario from "../../domain/Usuario";
import IStrategy from "../IStrategy";

/*Requisito Não Funcional RNF0031
* RNF0031 - A senha cadastrada pelo usuário deve ser composta de pelo menos 8 caracteres, ter letras 
* maiúsculas e minúsculas além de conter caracteres especiais.
*/

export default class ValidarSenhaForte implements IStrategy<Entidade> {
    public async processar(entidade: Entidade) : Promise<string | undefined>{
        if (entidade instanceof Cliente || entidade instanceof Usuario) {
            const senhaRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
            const senha = entidade instanceof Cliente ? entidade.usuario.senha : entidade.senha;
            if (!senhaRegex.test(senha)) {
                return 'Senha inválida: é necessário ter pelo menos 8 caracteres, uma letra maiúscula, uma minúscula e um caractere especial';  
            }
            return "";
        }
    }
}