import {Entity, Column, OneToOne, ManyToOne, JoinColumn} from "typeorm";
import Entidade from "./Entidade";
import Pais from "./Pais";
import Cliente from "./Cliente";
import TipoEndereco from "../enums/TipoEndereco";

@Entity("endereco")
export default class Endereco extends Entidade {
    @Column({type: "varchar"})
    fraseCurta!: string;

    @Column({type: "varchar"})
    cep!: string;
   
    @Column({type: "varchar"})
    tipoLogradouro!: string;

    @Column({type: "varchar"})
    logradouro!: string;

    @Column({type: "varchar"})
    numero!: string;

    @Column({type: "varchar"})
    tipoResidencia?: string;

    @Column({type: "varchar"})
    bairro!: string;
    
    @Column({type: "varchar"})
    cidade!: string;
    
    @Column({type: "varchar"})
    estado!: string;
    
    @ManyToOne(() => Pais, {cascade: true})
    @JoinColumn()
    pais!: Pais;
    
    @Column({type: "enum", enum: TipoEndereco})
    tipo!: TipoEndereco;
    
    @Column({type: "varchar"})
    observacao?: string;

    @ManyToOne(() => Cliente, (cliente: Cliente) => cliente.enderecos)
    cliente!: Cliente;

    constructor(
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
        pais: Pais,
        tipo: TipoEndereco
    ) {
        super();
        this.cep = cep;
        this.numero = numero;
        this.tipoResidencia = tiporesidencia;
        this.logradouro = logradouro;
        this.tipoLogradouro = tipoLogradouro;
        this.bairro = bairro;
        this.fraseCurta = fraseCurta;
        this.observacao = observacao;
        this.cidade = cidade;
        this.estado = estado;
        this.pais = pais;
        this.tipo = tipo;
    }

    setId(id: string): void{
        this.id = id
    }

    setCliente(cliente: Cliente){
        this.cliente = cliente
    }
}