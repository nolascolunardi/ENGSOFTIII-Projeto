import {Entity, Column, OneToMany, OneToOne, JoinColumn} from "typeorm";
import Endereco from "./Endereco";
import Telefone from "./Telefone";
import Cartao from "./Cartao";
import Usuario from "./Usuario";
import Genero from "../enums/Genero";
import Entidade from "./Entidade";

@Entity("cliente")
export default class Cliente extends Entidade {
    @Column({type: "enum", enum: Genero})
    genero!: Genero;

    @Column({type: "varchar"})
    cpf!: string;

    @Column({type: "date"})
    dtNascimento!: Date;

    @OneToOne(
        () => Telefone, 
        (telefone: Telefone) => telefone.cliente, 
        { cascade: true, eager: true }
    )
    telefone!: Telefone;

    @Column({type: "int"})
    ranking?: number;
    
    @OneToMany(
        () => Cartao,
        (cartao: Cartao) => cartao.cliente,
        {cascade: true, eager: true}
    )
    cartoes!: Cartao[];

    @OneToMany(
        () => Endereco,
        (endereco: Endereco) => endereco.cliente,
        {cascade: true, eager: true}
    )
    enderecos!: Endereco[];

    @OneToOne(() => Usuario, (usuario: Usuario) => usuario.id, { cascade: true })
    @JoinColumn({ name: "usuario_id" })
    usuario!: Usuario;

    constructor() {
        super();
        this.ranking = 0;
    }
    
    setGenero(genero: Genero): void {
        this.genero = genero;
    }

    setCpf(cpf: string): void {
        this.cpf = cpf;
    }

    setDtNascimento(dtNascimento: Date): void {
        this.dtNascimento = dtNascimento;
    }

    setTelefone(telefone: Telefone): void {
        this.telefone = telefone;
    }

    setRanking(ranking: number): void {
        this.ranking = ranking;
    }

    setCartoes(cartoes: Cartao[]): void {
        this.cartoes = cartoes;
    }

    setEnderecos(enderecos: Endereco[]): void {
        this.enderecos = enderecos;
    }

    setUsuario(usuario: Usuario): void {
        this.usuario = usuario;
    }

    setId(id: string) : void{
        this.id = id
    }
}