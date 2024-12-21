import { DataSource } from "typeorm";
import path from "path";

export const postgresDataSource: DataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "postgres",
    entities: ["src/domain/*{.js,.ts}"],
    synchronize: true,
    logging: true,
});
