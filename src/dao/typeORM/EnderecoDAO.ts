import { DataSource } from 'typeorm';
import IDAO from '../IDAO';
import Endereco from '../../domain/Endereco';
import { Repository } from 'typeorm';

export default class EnderecoDAO implements IDAO<Endereco> {
    private dataSource: DataSource;
    private repository: Repository<Endereco>;

    constructor(dataSource: DataSource) {
        this.dataSource = dataSource;
        this.repository = this.dataSource.getRepository(Endereco);
    }

    async listar(): Promise<Endereco[]> {
        return await this.repository.find();
    }

    async salvar(endereco: Endereco): Promise<Endereco> {
        return await this.repository.save(endereco);
    }

    async buscar(entidade: Endereco, operacao: string): Promise<Endereco[]> {
        switch(operacao){
            case 'buscarPorId':    
                return await this.repository.find({
                    where: { id: entidade.id },
                    relations: ['usuario', 'cliente'],
                });
            case 'buscarTodos':
                return await this.repository.find({
                    where: { 
                        deletado: false, 
                    },
                    relations: ["usuario"]
                });
            default:
                throw new Error('Operação não encontrada');
        }
       
    }

    async atualizar(endereco: Endereco): Promise<Endereco> {
        return await this.repository.save(endereco);
    }

    async deletar(endereco: Endereco): Promise<void> {
        await this.repository.delete(endereco.id);
    }
}