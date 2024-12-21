import express, { Express, Request, Response } from "express";
import { postgresDataSource } from "../config/bancoDados/typeORM/postgresDataSource";
import EnderecoController from "../controllers/EnderecoController";
import ClienteController from "../controllers/ClienteController";
import Fachada from "../fachada/Fachada";
import ClienteDAO from "../dao/typeORM/ClienteDAO";
import EnderecoDAO from "../dao/typeORM/EnderecoDAO";
import CartaoDAO from "../dao/typeORM/CartaoDAO";
import LogDAO from "../dao/typeORM/LogDAO";
import PaisDAO from "../dao/typeORM/PaisDAO";
import BandeiraDAO from "../dao/typeORM/BandeiraDAO";
import UsuarioDAO from "../dao/typeORM/UsuarioDAO";
import CartaoController from "../controllers/CartaoController";
import UsuarioController from "../controllers/UsuarioController";

const fachada = new Fachada(
    new ClienteDAO(postgresDataSource),
    new EnderecoDAO(postgresDataSource),
    new CartaoDAO(postgresDataSource),
    new LogDAO(postgresDataSource),
    new PaisDAO(postgresDataSource),
    new BandeiraDAO(postgresDataSource),
    new UsuarioDAO(postgresDataSource)
)

const enderecoController = new EnderecoController(fachada);
const cartaoController = new CartaoController(fachada);
const usuarioController = new UsuarioController(fachada);
const clienteController = new ClienteController(fachada);

export function iniciarRotas(app: Express): void {
    app.use(express.json());
    const v1 = express.Router();
    //home
    app.get("/", (req: Request, res: Response) => { res.render("principal") });
    
    //usuarios
    app.get("/usuarios/listar/logs", (req, res) => usuarioController.buscarTodosLogs(req, res));
    app.patch("/usuarios/alterarSenha/:id", (req, res) => usuarioController.alterarSenha(req, res));

    //cliente 
    app.get("/clientes", (_, res) => clienteController.buscarTodos(_,res));
    app.get("/clientes/filtro", (req, res) => clienteController.buscarPorFiltro(req, res));

    
    app.get("/clientes/cadastrar", (_, res) => clienteController.renderizarFormularioCadastrar(_, res));
    app.post("/clientes/cadastrar", (req, res) => clienteController.criar(req, res));   
    
    app.get("/clientes/atualizar/:id", (req, res) => clienteController.renderizarAtualizarCliente(req, res));
    app.put("/clientes/atualizar/:id", (req, res) => clienteController.atualizar(req, res));
    
    app.put("/clientes/inativar/:id", (req, res) => clienteController.inativar(req, res));
    
    //enderecos
    app.get("/clientes/:id/enderecos/atualizar", (req, res) => enderecoController.renderizarAtualizarEnderecos(req, res));
    app.get("/clientes/:id/enderecos/cadastrar", (req, res) => enderecoController.renderizarCadastrarEndereco(req, res));
    app.put("/clientes/:id/enderecos/atualizar", (req, res) => enderecoController.atualizar(req, res));
    app.post("/clientes/:id/enderecos/cadastrar", (req, res) => enderecoController.criar(req, res));
    
    //cartoes
    app.get("/clientes/:id/cartoes/cadastrar", (req, res) => cartaoController.renderizarCadastroCartao(req, res));
    app.post("/clientes/:id/cartoes/cadastrar", (req, res) => cartaoController.criar(req, res));

    app.use(v1);
}