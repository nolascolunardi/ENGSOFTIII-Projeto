import IStrategy from "../IStrategy";
import Cliente from "../../domain/Cliente";
import Entidade from "../../domain/Entidade";
import Usuario from "../../domain/Usuario";

/*Requisito Não Funcional RNF0032
* RNF0031 - O usuário obrigatoriamente deve digitar duas vezes a mesma senha no 
* momento do registro da mesma
*/

export default class ValidarConfirmacaoSenha implements IStrategy<Entidade> {
    public async processar(entidade: Entidade) : Promise<string | undefined>{
        if (entidade instanceof Cliente || entidade instanceof Usuario) {
            const senha = entidade instanceof Cliente ? entidade.usuario.senha : entidade.senha;
            const senhaConfirmacao = entidade instanceof Cliente ? entidade.usuario.senhaConfirmacao : entidade.senhaConfirmacao;
            
            if (senha !== senhaConfirmacao) {
                return 'Senhas digitadas não conferem';  
            }
            return "";
        }
    }
}