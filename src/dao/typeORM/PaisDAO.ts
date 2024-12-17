import { DataSource, Repository } from 'typeorm';
import IDAO from '../IDAO';
import Pais from '../../domain/Pais';

export default class PaisDAO implements IDAO<Pais> {
    private dataSource: DataSource;
    private repository: Repository<Pais>;

    constructor(dataSource: DataSource) {
        this.dataSource = dataSource;
        this.repository = this.dataSource.getRepository(Pais);
    }

    async salvar(pais: Pais): Promise<Pais> {
        return await this.repository.save(pais);
    }

    async atualizar(pais: Pais): Promise<Pais> {
        await this.repository.update(pais.id, pais);
        return (await this.buscar(pais, 'buscarPorId'))[0];
    }

    async buscar(pais: Pais, operacao: string): Promise<Pais[]> {
        switch(operacao){
            case 'buscarPorId':
                return this.repository.find({
                    where: { id: pais.id },
                });   
            case 'buscarTodos':
                return this.repository.find({
                    where: {
                        deletado: false,
                    },
                });
            case 'buscarPorNome':
                return await this.repository.find(
                    { where: { nome: pais.nome } }
                );
            default:
                throw new Error('Operação não encontrada');
        }
    }

    async deletar(pais: Pais): Promise<void> {
        await this.repository.delete(pais.id);
    }
}   