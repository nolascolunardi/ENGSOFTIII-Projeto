import Cliente from "../../domain/Cliente";
import ClienteDAO from "../../dao/typeORM/ClienteDAO";
import IStrategy from "../IStrategy";
import Entidade from "../../domain/Entidade";
import Cartao from "../../domain/Cartao";
import { postgresDataSource } from "../../config/bancoDados/typeORM/postgresDataSource";


export default class ValidarExistencia implements IStrategy<Cliente> {
    private readonly clienteDAO: ClienteDAO
    constructor() {
        this.clienteDAO = new ClienteDAO(postgresDataSource)
    }

    public async processar(entidade: Entidade): Promise<string | undefined> {
        if (entidade instanceof Cartao) {
            const cliente = (await this.clienteDAO.buscar(entidade.cliente, 'buscarPorId'))[0];
            if (!cliente) {
                return `Cliente não encontrado`;
            }
            return "";
        }
        if (entidade instanceof Cliente) {
            const cliente = (await this.clienteDAO.buscar(entidade, 'buscarPorId'))[0];
            if (!cliente) {
                return `Cliente não encontrado`;
            }
            return "";
        }
        
    }
}