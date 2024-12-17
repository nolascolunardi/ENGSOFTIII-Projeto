import { Repository, DataSource } from "typeorm";
import IDAO from "../IDAO";
import Cartao from "../../domain/Cartao";

export default class CartaoDAO implements IDAO<Cartao> {
    private dataSource: DataSource;
    private repository: Repository<Cartao>;

    constructor(dataSource: DataSource) {
        this.dataSource = dataSource;
        this.repository = this.dataSource.getRepository(Cartao);
    }

    async listar(): Promise<Cartao[]> {
        return await this.repository.find();
    }

    async salvar(cartao: Cartao): Promise<Cartao> {
        return await this.repository.save(cartao);
    }

    async buscar(cartao: Cartao, operacao: string): Promise<Cartao[]> {
        switch(operacao){
            case 'buscarPorId':
                return this.repository.find({
                    where: { id: cartao.id },
                    relations: ["usuario", "cliente"]
                });   
            case 'buscarTodos':
                return this.repository.find({
                    where: {
                        deletado: false,
                    },
                    relations: ["usuario", "cliente"]
                })
            default:
                throw new Error('Operação não encontrada');
        }
    }

    async atualizar(cartao: Cartao): Promise<Cartao> {
        const cartaoExistente = this.buscar(cartao, 'buscarPorId');
        
        if(!cartaoExistente){
            throw new Error('Cartao não encontrado');
        }

        await this.repository.update(cartao.id, cartao);
        return (await this.buscar(cartao, 'buscarPorId'))[0];
    }

    async deletar(cartao:Cartao): Promise<void> {
        await this.repository.delete(cartao.id);
    }
}