import { Request, Response } from "express";
import Usuario from "../domain/Usuario";
import Cliente from "../domain/Cliente";
import Pais from "../domain/Pais";
import Endereco from "../domain/Endereco";
import Telefone from "../domain/Telefone";
import Genero from "../enums/Genero";
import TipoEndereco from "../enums/TipoEndereco";
import TipoTelefone from "../enums/TipoTelefone";
import Fachada from "../fachada/Fachada";
import TipoUsuario from "../enums/TipoUsuario";
import ValidarCpf from "../strategy/cliente/ValidarCpf";
import ValidarDadosObrigatoriosAtualizar from "../strategy/cliente/ValidarDadosObrigatoriosAtualizar";
import ValidarDadosObrigatorios from "../strategy/cliente/ValidarDadosObrigatorios";
import ValidarExistencia from "../strategy/usuario/ValidarExistencia";
import ValidarTipoEndereco from "../strategy/endereco/ValidarTipoEndereco";
import ValidarConfirmacaoSenha from "../strategy/usuario/ValidarConfirmacaoSenha";
import ValidarNumero from "../strategy/cartao/ValidarNumero";
import CriptografarSenha from "../strategy/usuario/CriptografarSenha";
import ValidarCep from "../strategy/endereco/ValidarCep";
import ValidarPais from "../strategy/endereco/ValidarPais";

export default class ClienteController {

    constructor( private readonly fachada: Fachada) {}

    public renderizarPaginaPrincipal(_: Request, res: Response): void {
        res.status(200).render("principal",);
    }
    
    public async renderizarFormularioCadastrar(_: Request, res: Response): Promise<void> {
        const  paises = await this.fachada.buscar(new Pais('',''), 'buscarTodos');
        res.status(200).render("cliente/clientesFormulario", {paises, cliente: null, endereco: null} );
    }
    
    public async renderizarAtualizarCliente(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const cliente = new Cliente();
            cliente.setId(id);

            const clienteEncontrado = (await this.fachada.buscar(cliente, 'buscarPorId'))[0];
            res.status(200).render("cliente/atualizarCliente", {cliente: clienteEncontrado});

        } catch (error) {
            const err = error as Error;
            res.status(400).json({message: err.message});
        }
    }

    public async criar(req: Request, res: Response): Promise<void> {
        try {
            let validacoes = [
                new ValidarDadosObrigatorios(),
                new ValidarExistencia(),
                new ValidarTipoEndereco(),
                new ValidarConfirmacaoSenha(),
                new ValidarCpf(),
                new CriptografarSenha(),
                new ValidarNumero(),
                new ValidarCep(),
                new ValidarPais()
            ]
            
            const clienteDefinido: Cliente = await this.definirClienteCriar(req);
            
            const clienteSalvo = await this.fachada.salvar(clienteDefinido, validacoes);
            res.status(201).json({cliente: clienteSalvo});

        } catch (error) {
            const err = error as Error;
            res.status(400).json({message: err.message});
        }
    }

    private async definirClienteCriar(req: Request): Promise<Cliente> {
        const primeiraSenha: string = req.body.primeiraSenha;
        const segundaSenha: string =  req.body.segundaSenha;
        const email: string = req.body.email;
        const cpf: string = req.body.cpf;
        const genero = req.body.genero as Genero;
        const nome = req.body.nome;
        const dtNascimento = req.body.dtNascimento;

        const usuario = new Usuario(email, nome, primeiraSenha, segundaSenha);
        usuario.setTipoUsuario(TipoUsuario.CLIENTE);

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
            tipoEndereco: string
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

        const ddd = req.body.ddd;
        const numeroTelefone = req.body.numeroTelefone;
        const tipoTelefone = req.body.tipoTelefone as TipoTelefone;
        const telefone: Telefone = new Telefone();
        telefone.setDdd(ddd);
        telefone.setNumero(numeroTelefone);
        telefone.setTipo(tipoTelefone);

        const cliente = new Cliente();
        cliente.setGenero(genero);
        cliente.setCpf(cpf);
        cliente.setDtNascimento(dtNascimento);
        cliente.setTelefone(telefone);
        cliente.setEnderecos(enderecos);
        cliente.setUsuario(usuario);

        return cliente;
    }

    private async definirClienteAtualizar(req: Request){
        const email: string = req.body.email;
        const cpf: string = req.body.cpf;
        const genero = req.body.genero as Genero;
        const nome = req.body.nome;
        const dtNascimento = req.body.dtNascimento;
        const usuario = new Usuario(email, nome);
        const senha = req.body.primeiraSenha;
        
        const ddd = req.body.ddd;
        const numeroTelefone = req.body.numeroTelefone;
        const tipoTelefone = req.body.tipoTelefone as TipoTelefone;
        const telefone: Telefone = new Telefone();
        telefone.setDdd(ddd);
        telefone.setNumero(numeroTelefone);
        telefone.setTipo(tipoTelefone);
        
        const cliente = new Cliente();
        cliente.setGenero(genero);
        cliente.setCpf(cpf);
        cliente.setDtNascimento(dtNascimento);
        cliente.setTelefone(telefone);
        cliente.setUsuario(usuario);
        console.log(senha)
        cliente.usuario.setSenha(senha);
        cliente.usuario.setTipoUsuario(TipoUsuario.CLIENTE);

        return cliente;
    }

    private async definirClienteFiltrar(req: Request){
        const cpf = req.query.cpf ? req.query.cpf as string : '';
        const nome = req.query.nome ? req.query.nome as string : ''; // Corrigido para req.query.nome
        const email = req.query.email ? req.query.email as string: '';
        const telefone : string = req.query.telefone ? req.query.telefone as string : '';
        const ddd :string = req.query.ddd ? req.query.ddd as string : '';
    
        const usuario = new Usuario(email, nome);
        
        const telefoneObj = new Telefone();
        telefoneObj.setDdd(ddd);
        telefoneObj.setNumero(telefone);

        const cliente = new Cliente();
        cliente.setCpf(cpf);
        cliente.setUsuario(usuario);
    
        return cliente;
    }

    public async buscarTodos(_: Request, res: Response): Promise<void> {
        try{ 
            const cliente = new Cliente();
            const clientes = await this.fachada.buscar(cliente, 'buscarTodos');
            res.status(200).render("cliente/listaClientes", {clientes, logs: null});

        } catch (error) {
              const err = error as Error;
              res.status(400).json({message: err.message});
        }
    }

    public async buscarPorFiltro(req: Request, res: Response): Promise<void>{
        try{       
            const cliente = await this.definirClienteFiltrar(req);
            const clientes = await this.fachada.buscar(cliente, 'buscarPorFiltro');
            res.status(200).render("cliente/listaClientes", {clientes});

        } catch (error) {
            const err = error as Error;
            res.status(400).json({message: err.message});
      }
    }

    public async atualizar(req: Request, res: Response): Promise<void> {
        try{
            const id = req.params.id;
            const cliente = await this.definirClienteAtualizar(req);
            cliente.setId(id);

            const validacoes = [new ValidarCpf(), new ValidarDadosObrigatoriosAtualizar()];
            await this.fachada.atualizar(cliente, validacoes);

            res.status(200).json({message: "Atualizar cliente"});

        }catch(error){
            const err = error as Error;
            res.status(400).json({message: err.message});
        }
    }

    public async inativar(req : Request, res : Response): Promise<void> {
        try{
            const clienteId = req.params.id;
            
            const cliente = await this.definirClienteAtualizar(req);

            cliente.setId(clienteId);

            await this.fachada.deletar(cliente);

            res.status(200).json({message: "Usuário desativado com sucesso"});

        }catch(error){
            
            const err = error as Error;
            res.status(400).json({message: err.message});
        
        }
    }

}