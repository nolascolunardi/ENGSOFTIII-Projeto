import { DataSource } from "typeorm";
import Bandeira from "../../../../domain/Bandeira";

/* RN025 - Bandeiras permitidas para registro de cartões de crédito
 * Todo cartão de crédito associado a um cliente deverá
 * ser de alguma bandeira registrada no sistema.
 */

export default async function BandeiraSeed(dataSource: DataSource): Promise<void> {
    const bandeiraDAO = dataSource.getRepository(Bandeira);

    const bandeirasExistentes = await bandeiraDAO.find();
    if (bandeirasExistentes.length > 0) {
        return; 
    }

    const bandeiras = [
        { descricao: 'Mastercard' },
        { descricao: 'Visa' },
        { descricao: 'Elo' },
        { descricao: 'Hipercard' },
        { descricao: 'American Express' },
    ];

    await bandeiraDAO.save(bandeiras);
    console.log("Bandeiras inserida com sucesso no banco de dados!");
}
