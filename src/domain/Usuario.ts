import {Entity, Column} from "typeorm";
import Entidade from "./Entidade";
import TipoUsuario from "../enums/TipoUsuario";

@Entity("usuario")
export default class Usuario extends Entidade {
    @Column({type: "enum", enum: TipoUsuario})
    tipoUsuario!: TipoUsuario;

    @Column({type: "varchar"})
    email!: string;

    @Column({type: "varchar"})
    senha!: string;

    senhaConfirmacao!: string;

    @Column({type: "varchar"})
    nome!: string;

    constructor(email: string, nome: string, senha?: string, senhaConfirmacao?: string) {
        super();
        this.email = email;
        this.nome = nome;
        this.senha = senha || "";
        this.senhaConfirmacao = senhaConfirmacao || "";
    }

    setId(id: string): void{
        this.id = id;
    }

    setSenha(senha: string){
        this.senha = senha;
    }

    setTipoUsuario(tipo : TipoUsuario): void{
        this.tipoUsuario = tipo;
    }
}
