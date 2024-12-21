import { Request, Response } from "express";
import Cartao from "../domain/Cartao";
import Cliente from "../domain/Cliente";
import Fachada from "../fachada/Fachada";
import ValidarCartao from "../strategy/cartao/ValidarCartaoPreferencial";
import ValidarNumero from "../strategy/cartao/ValidarNumero";
import ValidarBandeira from "../strategy/cartao/ValidarBandeira";
import ValidarCvv from "../strategy/cartao/ValidarCvv";
import ValidarExistencia from "../strategy/cliente/ValidarExistencia";
import Bandeira from "../domain/Bandeira";

export default class CartaoController {

    constructor(private readonly fachada: Fachada) {}

    public async renderizarCadastroCartao(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const bandeiras = await this.fachada.buscar(new Bandeira(), 'buscarTodos');
            
            const cliente = new Cliente();
            cliente.setId(id);

            const clienteEncontrado = (await this.fachada.buscar(cliente,'buscarPorId'))[0];

            res.status(200).render("cartao/cadastrarCartao", {cliente: clienteEncontrado, bandeiras});
        } catch (error) {
            const err = error as Error;
            res.status(400).json({message: err.message});
        }
    }

    public async criar(req: Request, res: Response): Promise<void> {
        try{
            const clienteId = req.params.id
            const cliente = new Cliente();
            cliente.setId(clienteId);
 
            const validacoes = [ new ValidarNumero(), new ValidarCvv(), new ValidarBandeira(), new ValidarExistencia(), new ValidarCartao()];

            const cartoes = await this.definirCartao(req);
            console.log(cartoes);
            if (cartoes.length === 0) {
                throw new Error('Erro ao cadastrar cartao.');
            }

            const cartoesSalvos = [];
            for(const cartao of cartoes){
                cartao.cliente = cliente;
                cartoesSalvos.push( await this.fachada.salvar(cartao, validacoes));
            }

            res.status(201).json({cartao: cartoesSalvos});
            
        }catch (error) {
            const err = error as Error;
            res.status(400).json({message: err.message});
        }
    }

    private async definirCartao(req: Request): Promise<Cartao[]> {
        const cartoes: Cartao[] = !req.body.cartoes ? [] : req.body.cartoes.map((cartao: {
            numeroCartao: string,
            nomeImpresso: string,
            bandeira: string,
            cvv: string,
            preferencial: boolean
        }) => {
            const bandeira = new Bandeira();
            bandeira.setDescricao(cartao.bandeira);

            const novoCartao = new Cartao();
            novoCartao.setNumero(cartao.numeroCartao);
            novoCartao.setNomeImpresso(cartao.nomeImpresso);
            novoCartao.setBandeira(bandeira);
            novoCartao.setCvv(cartao.cvv);
            novoCartao.setIsPreferencial(cartao.preferencial);
            return novoCartao;
        });

        return cartoes;
    }

}