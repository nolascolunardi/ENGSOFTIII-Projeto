import IStrategy from "../strategy/IStrategy";
    
export default interface IFachada<T> {
    salvar(entidade: T, estrategias: IStrategy<T>[]): Promise<T>
    buscar(entidade: T, operacao: string): Promise<T[]>;
    atualizar(entidade: T, estrategias: IStrategy<T>[] ): Promise<void>;
    deletar(entidade: T): Promise<void>;
}