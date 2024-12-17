import Cliente from "../../domain/Cliente";
import IStrategy from "../IStrategy";


export default class ValidarCpf implements IStrategy<Cliente> {
    public async processar(entidade: Cliente): Promise<string | undefined> {
        if (entidade.cpf.length !== 11 || !entidade.cpf.match(/^[0-9]{11,11}$/)) {
            return "CPF inválido";
        }
        else {
            return "";
        }
    }
}