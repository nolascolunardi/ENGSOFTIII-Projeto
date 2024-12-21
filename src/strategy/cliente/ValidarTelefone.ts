import Cliente from "../../domain/Cliente";
import Entidade from "../../domain/Entidade";
import ValidarNumero from "../cartao/ValidarNumero";
import IStrategy from "../IStrategy";

export default class ValidarTelefone implements IStrategy<Entidade> {
    public async processar(entidade: Entidade) : Promise<string | undefined>{
        
        if (entidade instanceof Cliente) {
            return new ValidarNumero().processar(entidade.telefone);
        }
    }
}