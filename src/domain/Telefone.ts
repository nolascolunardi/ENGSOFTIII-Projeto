import {Entity, Column, JoinColumn, OneToOne} from "typeorm";
import Entidade from "./Entidade";
import TipoDeTelefone from "../enums/TipoTelefone";
import Cliente from "./Cliente";

@Entity("telefone")
export default class Telefone extends Entidade {
    @Column({type: "varchar"})
    ddd!: string;

    @Column({type: "varchar"})
    numero!: string;

    @Column({type: "enum", enum: TipoDeTelefone})
    tipo!: TipoDeTelefone;

    @OneToOne(() => Cliente, (cliente) => cliente.telefone)
    @JoinColumn({ name: "cliente_id" })
    cliente!: Cliente;

    constructor() {super();}

    setDdd(ddd: string): void {
        this.ddd = ddd;
    }

    setNumero(numero: string): void {
        this.numero = numero;
    }

    setTipo(tipo: TipoDeTelefone): void {
        this.tipo = tipo;
    }

}