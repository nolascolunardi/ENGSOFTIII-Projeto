import { Entity, Column, OneToMany } from "typeorm";
import Entidade from "./Entidade";

@Entity("cartao_bandeira")
export default class Bandeira extends Entidade {
  @Column({ type: "varchar" })
  descricao!: string;

  @OneToMany(
    () => Bandeira,
    (bandeira: Bandeira) => bandeira.cartoes
  )
  cartoes!: Bandeira[];
  
  constructor() {super();}

  setDescricao(descricao: string){
    this.descricao = descricao;
  }
}