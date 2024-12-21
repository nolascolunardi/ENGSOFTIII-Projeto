import { DataSource } from "typeorm";
import Usuario from "../../../../domain/Usuario";
import TipoUsuario from "../../../../enums/TipoUsuario";

/* RNF0012 - Log de transação 
* Para toda operação de escrita (Inserção ou Alteração)
* deve ser registado data, hora, usuário responsável
* além de manter os dados alterados.
*/
/* O usuario seed é responsável por criar um usuário admin no banco de dados, que vai ser o usuario responsável por todas as operações de escrita */

export default async function UsuarioSeed(dataSource: DataSource): Promise<void> {
    const usuarioDAO = dataSource.getRepository(Usuario);

    const usuarioExistente = await usuarioDAO.findOne({
        where:{
            tipoUsuario: TipoUsuario.ADMIN,
        }
    });

    if (usuarioExistente) {
        return;
    }

    const usuario = {
        tipoUsuario: TipoUsuario.ADMIN,
        email: 'admin@ex.com',
        nome: 'Admin',
        senha: '20$14btS4lw43A11f03veR',
    } as unknown as Usuario;

    const admin = await usuarioDAO.save(usuario);

    console.log('Admin criado com sucesso!');
}