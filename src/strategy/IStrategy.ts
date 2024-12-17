export default interface IStrategy<T> {
    processar(entidade: T): Promise<string | undefined>;
}