import IDAO from "../IDAO";
import {DataSource, ILike, Like, Repository} from "typeorm";
import Cliente from "../../domain/Cliente";
import Entidade from "../../domain/Entidade";
import Genero from "../../enums/Genero";

export default class ClienteDAO implements IDAO<Cliente> {
    private dataSource: DataSource;
    private repository: Repository<Cliente>;

    constructor(dataSource: DataSource) {
        this.dataSource = dataSource;
        this.repository = this.dataSource.getRepository(Cliente);
    }

    async salvar(cliente: Cliente): Promise<Cliente> {
        return await this.repository.save(cliente);
    }

    /* RF0024 - Consulta de clientes 
    * O sistema deve possibilitar que um cliente seja consultado com base em um filtro definido pelo usuário. 
    * Todos os campos utilizados para identificação do cliente podem ser utilizados como filtro, tanto de
    * forma combinada como de forma isolada.
    */
    async buscar(entidade: Cliente, operacao: string ): Promise<Cliente[]> {
        switch(operacao){
            case 'buscarPorId':    
                return await this.repository.find({
                    where: { id: entidade.id },
                    relations: ['usuario', 'enderecos', 'telefone', 'cartoes', 'enderecos.pais'],
                });
            case 'buscarTodos':
                return await this.repository.find({
                    where: { 
                        deletado: false, 
                    },
                    relations: ["usuario"]
                });
            case 'buscarPorFiltro':
                const cpf = entidade.cpf ? `%${entidade.cpf}%` : '%';
                const email = entidade.usuario.email ? `%${entidade.usuario.email}%` : '%';
                const nome = entidade.usuario.nome ? `%${entidade.usuario.nome}%` : '%';
                const telefone = entidade.telefone ? `%${entidade.telefone}%` : '%';
                
                return await this.repository.find({
                    where: { 
                        deletado: false, 
                        cpf: ILike(cpf),
                        telefone: {
                            numero: ILike(telefone)  
                        },
                        usuario: {
                            email: ILike(email),
                            nome: ILike(nome),
                        },
                    },
                    relations: ["usuario"],
                });
            case 'buscarPorEmail':
                return await this.repository.find({
                    where: { 
                        deletado: false, 
                        usuario: {
                            email: entidade.usuario.email,
                        },
                    },
                    relations: ["usuario"]
                });
            default:
                throw new Error('Operação não encontrada');
        }
    }

    async deletar(cliente: Cliente): Promise<void> {
        console.log('deletando cliente db ', cliente);
        await this.repository.createQueryBuilder()
        .update()
        .set({ deletado: true })
        .where('id = :id', { id: cliente.id })
        .execute();
    }

    public async atualizar(cliente: Cliente): Promise<Cliente> {
        const clienteExistente = await this.buscar(cliente, 'buscarPorId');

        if (!clienteExistente){
            throw new Error('Cliente nao existente')
        }
        
        const clienteAtualizado = this.repository.merge(clienteExistente[0], cliente);

        return await this.repository.save(clienteAtualizado);
    }
    
}