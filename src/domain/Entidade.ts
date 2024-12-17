import { PrimaryGeneratedColumn, Column } from "typeorm";

/* RNF0035  - Código de cliente
* Todo cliente cadastrado deve receber um código único no sistema.
*/

/* O id é um identificador único para cada entidade do sistema. Logo o cliente também recebe esse Id.*/

export default abstract class Entidade {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "boolean", default: false })
  deletado!: boolean;
}