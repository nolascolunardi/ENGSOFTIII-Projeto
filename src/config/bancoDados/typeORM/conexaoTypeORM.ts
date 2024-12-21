import { DataSource } from "typeorm";
import BandeiraSeed from "./seeds/BandeiraSeed";
import PaisSeed from "./seeds/PaisSeed";
import UsuarioSeed from "./seeds/UsuarioSeed";

export default class ConexaoTypeORM {
  static async conectar(dataSource: DataSource): Promise<void> {
    try {
      console.log("Estabelecendo conexão com o banco de dados...");
      await dataSource.initialize();
      console.log("Conexão com o banco de dados estabelecida com sucesso!");
      
      await BandeiraSeed(dataSource);
      await PaisSeed(dataSource);
      await UsuarioSeed(dataSource);
    
    } catch (error) {
    
      const mensagemErro = `Erro ao inicializar a base de dados: ${error}`
      throw new Error (mensagemErro);
    
    }
  }
}