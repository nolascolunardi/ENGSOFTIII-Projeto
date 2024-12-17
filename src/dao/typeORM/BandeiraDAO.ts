import { DataSource, Repository } from "typeorm";
import IDAO from "../IDAO";
import Bandeira from "../../domain/Bandeira";

export default class BandeiraDAO implements IDAO<Bandeira> {
    private dataSource: DataSource;
    private repository: Repository<Bandeira>;

    constructor(dataSource: DataSource) {
        this.dataSource = dataSource;
        this.repository = this.dataSource.getRepository(Bandeira);
    }

    async listar(): Promise<Bandeira[]> {
        return await this.repository.find();
    }

    async salvar(bandeira: Bandeira): Promise<Bandeira> {
        return await this.repository.save(bandeira);
    }
    
    async atualizar(bandeira: Bandeira): Promise<Bandeira> {
        await this.repository.update(bandeira.id, bandeira);
        return (await this.buscar(bandeira, 'buscarPorId'))[0];
    }
    
    async buscar(bandeira: Bandeira, operacao: string): Promise<Bandeira[]> {
        switch(operacao){
            case 'buscarPorId':
                return this.repository.find({
                    where: { 
                        id: bandeira.id 
                    }
                });   
            case 'buscarTodos':
                return this.repository.find({
                    where: {
                        deletado: false,
                    }
                });
            case 'buscarPorDescricao':
                return await this.repository.find(
                    { where: { descricao: bandeira.descricao } }
                );

            default:
                throw new Error('Operação não encontrada');
        }
    }

    async deletar(bandeira: Bandeira): Promise<void> {
        await this.repository.delete(bandeira.id);
    }
}