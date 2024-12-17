import { postgresDataSource } from "../../config/bancoDados/typeORM/postgresDataSource";
import IStrategy from "../IStrategy";
import PaisDAO from "../../dao/typeORM/PaisDAO";
import Entidade from "../../domain/Entidade";
import Endereco from "../../domain/Endereco";
import Pais from "../../domain/Pais";
import Cliente from "../../domain/Cliente";

export default class ValidarPais implements IStrategy <Entidade> {
    private readonly paisDAO: PaisDAO

    constructor() {
        this.paisDAO = new PaisDAO(postgresDataSource)
    }

    public async processar(entidade: Entidade): Promise<string | undefined> {
        const paises = await this.paisDAO.buscar(new Pais('',''), 'buscarTodos');
       
        if (entidade instanceof Endereco) {
            const paisEncontrado = paises.find(p => p.nome === entidade.pais.nome);
        
            if (!paisEncontrado) {
                return `País inválido para o endereço.`;
            }
            
            entidade.pais = paisEncontrado;
            return "";
        }
        
        if (entidade instanceof Cliente) {
            for (const endereco of entidade.enderecos) {
                const paisEncontrado = paises.find(p => p.nome === endereco.pais.nome);
        
                if (!paisEncontrado) {
                    return `País inválido para o endereço do cliente.`;
                }

                endereco.pais = paisEncontrado;
            }
        
            return "";
        }
    }


}