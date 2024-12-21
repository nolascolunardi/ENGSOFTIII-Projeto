import { Request, Response } from "express";
import Fachada from "../fachada/Fachada";
import TipoEndereco from "../enums/TipoEndereco";
import Endereco from "../domain/Endereco";
import Pais from "../domain/Pais";
import Cliente from "../domain/Cliente";
import ValidarDadosObrigatorios from "../strategy/cliente/ValidarDadosObrigatorios";
import ValidarNumero from "../strategy/cartao/ValidarNumero";
import ValidarCep from "../strategy/endereco/ValidarCep";
import ValidarPais from "../strategy/endereco/ValidarPais";
import ValidarTipoEndereco from "../strategy/endereco/ValidarTipoEndereco";

export default class EnderecoController{

    constructor(private readonly fachada: Fachada,) {}

    public async renderizarAtualizarEnderecos(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const cliente = new Cliente();
            cliente.setId(id);

            const clienteEncontrado = (await this.fachada.buscar(cliente, 'buscarPorId'))[0];
            console.log(clienteEncontrado)
            const  paises = await this.fachada.buscar(new Pais('',''), 'buscarTodos');

            res.status(200).render("endereco/atualizarEnderecos", {cliente: clienteEncontrado, paises});

        } catch (error) {
            const err = error as Error;
            res.status(400).json({message: err.message});
        }
    }

    public async renderizarCadastrarEndereco(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const cliente = new Cliente();
            cliente.setId(id);

            const clienteEncontrado =(await this.fachada.buscar(cliente, 'buscarPorId'))[0];
            const  paises = await this.fachada.buscar(new Pais('',''), 'buscarTodos');

            res.status(200).render("endereco/cadastrarEndereco", {paises, cliente: clienteEncontrado});
        } catch (error) {
            const err = error as Error;
            res.status(400).json({message: err.message});
        }
    }

    public async criar(req: Request, res: Response): Promise<void> {
        try {        
            const clienteId = req.params.id;
            const cliente = new Cliente();
            cliente.setId(clienteId)

            const enderecos = await this.definirEnderecoSalvar(req);
            const validacoes = [new ValidarDadosObrigatorios(), new ValidarNumero(), new ValidarCep(), new ValidarPais()];

            const enderecoSalvo = [];
            for (const endereco of enderecos) {
                endereco.cliente = cliente;
                enderecoSalvo.push(await this.fachada.salvar(endereco, validacoes));
            }

            res.status(201).json({enderecos: enderecoSalvo});

        } catch (error) {
            const err = error as Error;
            res.status(400).json({message: err.message});
        }
    }

    public async atualizar(req: Request, res: Response): Promise<void> {
        try {
            const clienteId = req.params.id;
            const cliente = new Cliente();
            cliente.setId(clienteId);

            const enderecos = await this.definirEnderecosAtualizar(req);
            const validacoes = [new ValidarDadosObrigatorios(), new ValidarNumero(), new ValidarCep(), new ValidarPais(), new ValidarTipoEndereco()];

            for (const endereco of enderecos) {
                endereco.setCliente(cliente);
                await this.fachada.atualizar(endereco, validacoes);
            }
            
            res.status(200).json({message: "Endereços atualizados com sucesso!"});
            
        } catch (error) {
            const err = error as Error;
            res.status(400).json({message: err.message});
        }
    }
    
    private async definirEnderecosAtualizar(req: Request): Promise<Endereco[]> {
        const enderecos: Endereco[] = req.body.enderecos.map((endereco: {
            idEndereco?: string, 
            cep: string,
            numero: string,
            tiporesidencia: string,
            logradouro: string,
            tipoLogradouro: string,
            bairro: string,
            fraseCurta: string,
            observacao: string,
            cidade: string,
            estado: string,
            nomePais: string,
            sigla: string,
            tipoEndereco: string
        }) => {
            const enderecoCriado = new Endereco(
                endereco.cep,
                endereco.numero,
                endereco.tiporesidencia,
                endereco.logradouro,
                endereco.tipoLogradouro,
                endereco.bairro,
                endereco.fraseCurta,
                endereco.observacao,
                endereco.cidade,
                endereco.estado,
                new Pais(endereco.nomePais, endereco.sigla),
                endereco.tipoEndereco as TipoEndereco
            );
    
            if (endereco.idEndereco) {
                enderecoCriado.setId(endereco.idEndereco);
            }

            return enderecoCriado;
        });
        return enderecos;
    }

    private async definirEnderecoSalvar(req : Request): Promise<Endereco[]> {
        const enderecos: Endereco[] = !req.body.enderecos ? "" : req.body.enderecos.map((endereco: {
            cep: string,
            numero: string,
            tiporesidencia: string,
            logradouro: string,
            tipoLogradouro: string,
            bairro: string,
            fraseCurta: string,
            observacao: string,
            cidade: string,
            estado: string,
            nomePais: string,
            sigla: string,
            tipoEndereco: string,
            idEndereco?: string
        }) => new Endereco(
            endereco.cep,
            endereco.numero,
            endereco.tiporesidencia,
            endereco.logradouro,
            endereco.tipoLogradouro,
            endereco.bairro,
            endereco.fraseCurta,
            endereco.observacao,
            endereco.cidade,
            endereco.estado,
            new Pais(endereco.nomePais, endereco.sigla),
            endereco.tipoEndereco as TipoEndereco
        ));
        return enderecos;
    }

};