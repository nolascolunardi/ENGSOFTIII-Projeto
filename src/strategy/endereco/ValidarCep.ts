import IStrategy from "../IStrategy";
import Endereco from "../../domain/Endereco";
import Cliente from "../../domain/Cliente";
import Entidade from "../../domain/Entidade";

export default class ValidarCep implements IStrategy<Endereco>{
    public async processar(entidade: Entidade) :Promise<string | undefined> {
        if (entidade instanceof Cliente){
            let menssagem = "";
            
            for(const endereco of entidade.enderecos){
                menssagem += this.cepValidacao(endereco);
            }

            return menssagem;
        }
        if (entidade instanceof Endereco){
            return this.cepValidacao(entidade);
        }
        
    }

    private cepValidacao(endereco: Endereco){
        const cepRegex: RegExp = /^[0-9]{8,8}$/;

        if (!cepRegex.test(endereco.cep)) {
            return `CEP inválido`;
        }

        return "";
    }

    private async viaCep(cep: string): Promise<any> {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    
            if (!response.ok) {
                throw new Error('Erro na requisição ao ViaCEP.');
            }
    
            const data = await response.json();
    
            if (data.erro) {
                throw new Error('CEP não encontrado ou inválido.');
            }
    
            return "";
        } catch (error) {
            return  'Erro ou CEP inválido';
        }
    }
    
}