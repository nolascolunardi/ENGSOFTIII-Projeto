import {genSaltSync, hashSync} from "bcrypt";
import IStrategy from "../IStrategy";
import Usuario from "../../domain/Usuario";
import Entidade from "../../domain/Entidade";
import Cliente from "../../domain/Cliente";

/*Requisito Não Funcional RNF0033
* RNF0033 - A senha deve ser criptografada.
*/

export default class CriptografarSenha implements IStrategy<Entidade> {
    public async processar(entidade: Entidade): Promise<string | undefined> {
        if (entidade instanceof Cliente || entidade instanceof Usuario) {
            const senha = entidade instanceof Cliente ? entidade.usuario.senha : entidade.senha;

            const salt = genSaltSync(10);
            const senhaCriptografada = hashSync(senha, salt);

            if (entidade instanceof Cliente) {
                entidade.usuario.senha = senhaCriptografada;
            } else {
                entidade.senha = senhaCriptografada;
            }
            
            return "";
        }
    }
}