import IStrategy from "../IStrategy";
import Cartao from "../../domain/Cartao";

export default class ValidarCvv implements IStrategy<Cartao> {
    public async processar(entidade: Cartao): Promise<string | undefined> {
        const cvvRegex: RegExp = /^[0-9]{3}$/;
        
        if (!entidade.cvv.match(/^[0-9]{3}$/)) {
            return `CVV inválido`;	
        }
        return "";
    }
}