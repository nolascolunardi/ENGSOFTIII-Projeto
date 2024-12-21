export default interface IDAO<Entidade> {
    salvar(entidade: Entidade): Promise<Entidade>;
    atualizar(entidade: Entidade): Promise<Entidade>;
    buscar(entidade: Entidade, operacao: string): Promise<Entidade[]>;
    deletar(entidade: Entidade): Promise<void>;
}