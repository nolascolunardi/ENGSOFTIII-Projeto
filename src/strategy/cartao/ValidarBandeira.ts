import IStrategy from "../IStrategy";
import { postgresDataSource } from "../../config/bancoDados/typeORM/postgresDataSource";
import BandeiraDAO from "../../dao/typeORM/BandeiraDAO";
import Entidade from "../../domain/Entidade";
import Cartao from "../../domain/Cartao";

export default class ValidarBandeira implements IStrategy <Entidade> {
    private readonly bandeiraDAO: BandeiraDAO
    constructor() {
        this.bandeiraDAO = new BandeiraDAO(postgresDataSource)
    }

    public async processar(entidade: Cartao): Promise<string | undefined> {
        
        const bandeiraEncontrada = await this.bandeiraDAO.buscar(entidade.bandeira, 'buscarPorDescricao');

        if (!bandeiraEncontrada) {
            return `Bandeira de Cartão inválida`;
        }

        entidade.bandeira = bandeiraEncontrada[0];
        return "";
    }
}