import ClienteDAO from "../dao/typeORM/ClienteDAO";
import LogDAO from "../dao/typeORM/LogDAO";
import PaisDAO from "../dao/typeORM/PaisDAO";
import BandeiraDAO from "../dao/typeORM/BandeiraDAO";
import UsuarioDAO from "../dao/typeORM/UsuarioDAO";
import IStrategy from "../strategy/IStrategy";
import Entidade from "../domain/Entidade";
import IDAO from "../dao/IDAO";
import EnderecoDAO from "../dao/typeORM/EnderecoDAO";
import CartaoDAO from "../dao/typeORM/CartaoDAO";
import Log from "../domain/Log";
import Usuario from "../domain/Usuario";
import IFachada from "./IFachada";

/* RNF0012 -  Log de transação
 * Para toda operação de escrita (Inserção ou Alteração)
 * deve ser registado data, hora, usuário responsável além de manter os dados alterados.
 */

export default class Fachada implements IFachada<Entidade> {
    
    private readonly entidadeDAOMap: Map<string, IDAO<Entidade>>;

    constructor( 
        private readonly clienteDAO: ClienteDAO,
        private readonly enderecoDAO: EnderecoDAO,
        private readonly cartaoDAO: CartaoDAO,
        private readonly logDAO: LogDAO,
        private readonly paisDAO: PaisDAO,
        private readonly bandeiras : BandeiraDAO,
        private readonly usuarioDAO: UsuarioDAO
    ) { 
        this.entidadeDAOMap = new Map<string, IDAO<Entidade>>;
        this.entidadeDAOMap.set('Cliente',  this.clienteDAO);
        this.entidadeDAOMap.set('Endereco', this.enderecoDAO);
        this.entidadeDAOMap.set('Cartao', this.cartaoDAO)
        this.entidadeDAOMap.set('Usuario', this.usuarioDAO);
        this.entidadeDAOMap.set('Log', this.logDAO);
        this.entidadeDAOMap.set('Bandeira', this.bandeiras);
        this.entidadeDAOMap.set('Pais', this.paisDAO);
    };

    public async salvar(entidade: Entidade, estrategias: Array<IStrategy<Entidade>>): Promise<Entidade> {
        let erros: string = "";

        for (const estrategia of estrategias) {
            const resultado = await estrategia.processar(entidade);
            if (resultado) {
                erros += resultado + " ";
            }            
        }   

        if (erros) {
            throw new Error(erros);
        }

        const entidadeDAO = this.entidadeDAOMap.get(entidade.constructor.name);

        if (!entidadeDAO) {
            throw new Error('Entidade não encontrada');
        }

        const entidadeSalva = await entidadeDAO.salvar(entidade);
        
        this.gerarLog(entidadeSalva, "criado");

        return entidadeSalva;
    }
    
    public async buscar(entidade: Entidade, operacao: string): Promise<Entidade[]> {
        const entidadeDAO = this.entidadeDAOMap.get(entidade.constructor.name);
        
        if (!entidadeDAO) {
            throw new Error('Entidade não encontrada');
        }

        return await entidadeDAO.buscar(entidade, operacao);
    }

    public async atualizar(entidade: Entidade, estrategias: Array<IStrategy<Entidade>>): Promise<void> {
        let erros: string = "";

        for (const estrategia of estrategias) {
            const resultado = await estrategia.processar(entidade);
            if (resultado) {
                erros += resultado + " ";
            }
        }

        if (erros) {
            console.log(erros);
            throw new Error(erros);
        }

        const entidadeDAO = this.entidadeDAOMap.get(entidade.constructor.name);

        if (!entidadeDAO) {
            throw new Error('Entidade não encontrada');
        }

        const entidadeSalva = await entidadeDAO.atualizar(entidade);
       
        this.gerarLog(entidadeSalva, "atualizado");
    }

    public async deletar(entidade: Entidade): Promise<void> {

        const entidadeDAO = this.entidadeDAOMap.get(entidade.constructor.name);

        if (!entidadeDAO) {
            throw new Error('Entidade não encontrada');
        }

        await entidadeDAO.deletar(entidade);
    }

    private async gerarLog(entidade: Entidade, operacao: string): Promise<void>{
        const usuario = (await this.usuarioDAO.buscar(new Usuario( '', '', ''), 'buscarAdmin'))[0];
        
        await this.logDAO.salvar(
            new Log( 
                usuario,
                `${entidade.constructor.name} com id ${entidade.id} ${operacao} com sucesso.` 
            )
        );

    }

}