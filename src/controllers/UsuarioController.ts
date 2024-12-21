import { Request, Response } from "express";
import Usuario from "../domain/Usuario";
import Fachada from "../fachada/Fachada";
import Log from "../domain/Log";
import ValidarConfirmacaoSenha from "../strategy/usuario/ValidarConfirmacaoSenha";
import ValidarSenhaForte from "../strategy/usuario/ValidarSenhaForte";
import CriptografarSenha from "../strategy/usuario/CriptografarSenha";

export default class UsuarioController {
    constructor(private readonly fachada: Fachada) {}
    
    public async alterarSenha(req: Request, res: Response): Promise<void> {
        try{
            const usuarioId = req.params.id;
            const usuario = this.definirUsuario(req);
            usuario.setId(usuarioId); 

            const validacoes = [new ValidarConfirmacaoSenha(), new ValidarSenhaForte(), new CriptografarSenha()];
            await this.fachada.atualizar(usuario, validacoes);
            
            res.status(200).json({message: "Senha alterada com sucesso"});
        }catch(error){
            
            const err = error as Error;
            res.status(400).json({message: err.message});
        }
    }

    public async buscarTodosLogs(_: Request, res: Response): Promise<void> {
        try{
            const usuario =  new Usuario('', '', '', '');
            const log = new Log(usuario , '');

            const logs = await this.fachada.buscar(log, 'buscarTodos');

            res.status(200).render("usuario/listaLogs", {logs});
        }catch(error){
            const err = error as Error;
            res.status(400).json({message: err.message});
        }
    }

    public definirUsuario(req: Request): Usuario {
        const primeiraSenha = req.body.senha;
        const segundaSenha = req.body.senhaConfirmacao;
        const email = req.body.email;
        const nome = req.body.nome;
        const usuario = new Usuario(email,nome, primeiraSenha, segundaSenha);
        return usuario;
    }
}