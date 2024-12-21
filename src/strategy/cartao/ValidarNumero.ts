import Entidade from "../../domain/Entidade";
import Cartao from "../../domain/Cartao";
import Telefone from "../../domain/Telefone";
import Endereco from "../../domain/Endereco";
import IStrategy from "../IStrategy";

export default class ValidarNumero implements IStrategy<Entidade> {
    public async processar(entidade: Entidade) : Promise<string | undefined> {
        if (entidade instanceof Cartao) {
            const numeroRegex: RegExp = /^[0-9]{13,16}$/;
            if (!numeroRegex.test(entidade.numero)) {
                return `Número de cartão inválido`;
            }
            return "";
        }

        if (entidade instanceof Telefone) {
            const numeroRegex: RegExp = /^[0-9]{11}$/;
            const dddRegex: RegExp = /^[0-9]{2}$/;
            if (!numeroRegex.test(entidade.numero) || !dddRegex.test(entidade.ddd)) {
                return `Numero de telefone ou ddd inválido`;
            }
            return "";
        }

        if (entidade instanceof Endereco) {
            const numeroRegex: RegExp = /^[0-9a-zA-Z]{1,5}$/;
            if (!numeroRegex.test(entidade.numero)) {
                return `Número de endereço inválido`;
            }
            return "";
        }
    }
}