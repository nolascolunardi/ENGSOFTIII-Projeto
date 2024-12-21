import { postgresDataSource } from "../../config/bancoDados/typeORM/postgresDataSource";
import ClienteDAO from "../../dao/typeORM/ClienteDAO";
import Cartao from "../../domain/Cartao";
import Cliente from "../../domain/Cliente";
import Entidade from "../../domain/Entidade";
import IStrategy from "../IStrategy";

/*Requisitos Funcionais RF0027
* RF0027 - Deve ser possível associar diversos cartões de crédito ao cadastro de um cliente. Deve haver um cartão
  de crédito configurado como preferencial.
*/
export default class ValidarCartaoPreferencial implements IStrategy<Entidade> {
    private readonly clienteDAO: ClienteDAO
    constructor(){
        this.clienteDAO = new ClienteDAO(postgresDataSource);
    }
    
    public async processar(entidade: Entidade): Promise<string | undefined>{
        if (entidade instanceof Cliente) {
            const cartoes = entidade.cartoes;

            if (cartoes.length > 0) {
                const cartaoPreferencial = cartoes.find(cartao => cartao.isPreferencial === true);
                if (!cartaoPreferencial) {
                   return "Cliente deve ter um cartão preferencial";
                }
                return "";
            }
        }
        
        if(entidade instanceof Cartao){
            const cliente = (await this.clienteDAO.buscar(entidade.cliente, 'buscarPorId'))[0];

            const cartaoPreferencial = cliente.cartoes.find(cartao=> cartao.isPreferencial ===true);

            if(!cartaoPreferencial && !entidade.isPreferencial){
                return "Cliente deve ter um cartão preferencial";
            }

            return "";
        }
    }
}
