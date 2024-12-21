import {Entity, Column, OneToOne, ManyToOne, JoinColumn} from "typeorm";
import Bandeira from "./Bandeira";
import Cliente from "./Cliente";
import Entidade from "./Entidade";

@Entity("cartao")
export default class Cartao extends Entidade {
    @Column({type: "varchar"})
    numero!: string;

    @Column({type: "varchar"})
    nomeImpresso!: string;

    @Column({type: "varchar"})
    cvv!: string;

    @Column({type: "boolean", default: false})
    isPreferencial!: boolean;

    @ManyToOne(() => Bandeira, {cascade: true})
    @JoinColumn()
    bandeira!: Bandeira;

    @ManyToOne(() => Cliente, (cliente: Cliente) => cliente.cartoes)
    cliente!: Cliente;

    constructor() {super();}

    setNumero(numero: string): void {
        this.numero = numero;
    }

    setNomeImpresso(nomeImpresso: string): void {
        this.nomeImpresso = nomeImpresso;
    }

    setCvv(cvv: string): void {
        this.cvv = cvv;
    }

    setIsPreferencial(isPreferencial: boolean): void {
        this.isPreferencial = isPreferencial;
    }

    setBandeira(bandeira: Bandeira): void {
        this.bandeira = bandeira;
    }

    setCliente(cliente: Cliente): void {
        this.cliente = cliente;
    }
}