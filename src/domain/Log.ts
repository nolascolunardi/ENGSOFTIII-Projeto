import {Entity, CreateDateColumn, JoinColumn, Column, ManyToOne} from "typeorm";
import Entidade from "./Entidade";
import Usuario from "./Usuario";

@Entity("log")
export default class Log extends Entidade {
    @CreateDateColumn()
    dataEHora!: Date;

    @Column({type: "text"})
    mensagem!: string;

    @ManyToOne(() => Usuario)
    @JoinColumn()
    usuario!: Usuario;

    constructor(usuario: Usuario, mensagem: string) {
        super();
        this.usuario = usuario;
        this.mensagem = mensagem;
    }
}