import { DataSource } from "typeorm";
import Pais from "../../../../domain/Pais";

export default async function PaisSeed(dataSource: DataSource): Promise<void> {
    const paisDAO = dataSource.getRepository(Pais);

    const paisesExistentes = await paisDAO.find();
    if (paisesExistentes.length > 0) {
        return; 
    }

    const paises = [
        { nome: 'Brasil', sigla: 'BR' },
        { nome: 'Estados Unidos', sigla: 'EUA' },
        { nome: 'Argentina', sigla: 'ARG' },
        { nome: 'Uruguai', sigla: 'URU' },
        { nome: 'Paraguai', sigla: 'PAR' },
    ];

    await paisDAO.save(paises);
    console.log("Paises inserida com sucesso no banco de dados!");
}
