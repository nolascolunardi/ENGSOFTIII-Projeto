import IStrategy from "../IStrategy";
import Cliente from "../../domain/Cliente";
import Entidade from "../../domain/Entidade";
import TipoEndereco from "../../enums/TipoEndereco";
import ClienteDAO from "../../dao/typeORM/ClienteDAO";
import { postgresDataSource } from "../../config/bancoDados/typeORM/postgresDataSource";
import Endereco from "../../domain/Endereco";

/*Regras de negócio RN0021 e RN0022
* RN0021 - Para todo cliente cadastrado é obrigatório o registro de ao menos um endereço de cobrança
* RN0022 - Para todo cliente cadastrado é obrigatório o registro de ao menos um endereço de entrega.
*/
export default class ValidarTipoEndereco implements IStrategy<Entidade> {
    
    private readonly clienteDAO: ClienteDAO
    constructor(){
        this.clienteDAO = new ClienteDAO(postgresDataSource);
    }

    public async processar(entidade: Entidade): Promise<string | undefined> {
        if (entidade instanceof Cliente) {
            const enderecos = entidade.enderecos;
            
            const temEnderecoEntrega = enderecos.some(endereco => endereco.tipo === TipoEndereco.ENTREGA);
            const temEnderecoCobranca = enderecos.some(endereco => endereco.tipo === TipoEndereco.COBRANCA);
            const temEnderecoEntregaECobranca = enderecos.some(endereco => endereco.tipo === TipoEndereco.ENTREGA_E_COBRANCA);

            if (!(temEnderecoEntrega && temEnderecoCobranca) && !temEnderecoEntregaECobranca) {
                return "O cliente precisa de um endereço de entrega e um de cobrança.";
            }
            return "";
        }

        if (entidade instanceof Endereco){
            const cliente = (await this.clienteDAO.buscar(entidade.cliente, 'buscarPorId'))[0];
            const enderecos = cliente.enderecos;

            const temEnderecoEntrega = enderecos.some(endereco => endereco.tipo === TipoEndereco.ENTREGA);
            const temEnderecoCobranca = enderecos.some(endereco => endereco.tipo === TipoEndereco.COBRANCA);
            const temEnderecoEntregaECobranca = enderecos.some(endereco => endereco.tipo === TipoEndereco.ENTREGA_E_COBRANCA);
            
            if (!(temEnderecoEntrega && temEnderecoCobranca) && !temEnderecoEntregaECobranca) {
                return "O cliente precisa de um endereço de entrega e um de cobrança.";
            }

            return "";
        }
    }

}