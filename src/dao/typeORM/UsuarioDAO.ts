import { DataSource, Repository } from "typeorm";
import IDAO from "../IDAO";
import Usuario from "../../domain/Usuario";
import TipoUsuario  from "../../enums/TipoUsuario";

export default class UsuarioDAO implements IDAO<Usuario> {
    private dataSource: DataSource;
    private repository: Repository<Usuario>;

    constructor(dataSource: DataSource) {
        this.dataSource = dataSource;
        this.repository = this.dataSource.getRepository(Usuario);
    }

    public async salvar(entidade: Usuario): Promise<Usuario> {
        return await this.repository.save(entidade);
    }

    public async listar(): Promise<Usuario[]> {
        return await this.repository.find();
    }

    public async atualizar(entidade: Usuario): Promise<Usuario> {
        const usuario = await this.buscar(entidade, 'buscarPorId');
        
        const usuarioAtualizado = this.repository.merge(usuario[0], entidade);
        
        console.log(usuarioAtualizado)
        return await this.repository.save(usuarioAtualizado);
    }

    public async buscar(usuario: Usuario, operacao: string): Promise<Usuario[]> {
        switch(operacao){
            case 'buscarPorId':
                return this.repository.find({
                    where: { id: usuario.id }
                });   
            case 'buscarTodos':
                return this.repository.find({
                    where: {
                        deletado: false,
                    }
                });
            case 'buscarPorEmail':
                return this.repository.find({
                    where: {
                        deletado: false,
                        email: usuario.email
                    }
                });
            case 'buscarAdmin':
                return this.repository.find({
                    where: {
                        tipoUsuario: TipoUsuario.ADMIN
                    }
                });
            default:
                throw new Error('Operação não encontrada');
        }
    }

    public async deletar(entidade: Usuario): Promise<void> {
        await this.repository.delete(entidade.id);
    }
}