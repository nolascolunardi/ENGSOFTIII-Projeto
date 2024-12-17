import IStrategy from "../IStrategy";
import Entidade from "../../domain/Entidade";
import UsuarioDAO from "../../dao/typeORM/UsuarioDAO";
import Cliente from "../../domain/Cliente";
import { postgresDataSource } from "../../config/bancoDados/typeORM/postgresDataSource";

export default class ValidarExistencia implements IStrategy <Entidade> {
    private readonly usuarioDAO : UsuarioDAO

    constructor() {
        this.usuarioDAO = new UsuarioDAO(postgresDataSource);
    }

    public async processar(entidade: Entidade): Promise<string | undefined> {
        if (entidade instanceof Cliente) {
            const usuarioEncontrado = (await this.usuarioDAO.buscar(entidade.usuario, 'buscarPorEmail'))[0];
            if (usuarioEncontrado) {
                return `Email Inválido para cadastro`;
            }
            return "";
        }
    }
}