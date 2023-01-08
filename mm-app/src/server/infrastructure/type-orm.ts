import { DataSource } from "typeorm";
import { env } from "../../env/server.mjs";
import { ExpenseEntity } from "../expenses/infrastructure/expense-entity"

const buildTypeOrmeDataSource = () => new DataSource({
    type: "postgres",
    host: env.DB_PG_HOST,
    port: Number(env.DB_PG_PORT),
    username: env.DB_PG_USER,
    password: env.DB_PG_PASS,
    database: env.DB_PG_NAME,
    entities: [
        ExpenseEntity,
    ],
    synchronize: true
});

declare global {
    // eslint-disable-next-line no-var
    var typeOrm: DataSource | undefined;
}

export const typeOrm = global.typeOrm || buildTypeOrmeDataSource();

if (env.NODE_ENV !== 'production') {
    global.typeOrm = typeOrm;
}
