import { DataSource } from "typeorm";
import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";
import config from "../config";


const ds_config: MysqlConnectionOptions = {
    type: "mysql",
    host: config.db_host,
    port: config.db_port,
    username: config.db_username,
    password: config.db_password,
    database: config.db_databasename,
    synchronize: true,
    logging: false,
    extra: {
        insecureAuth: true,
    },
    entities: ["src/data/models/**/*.entity.ts"],
    migrations: [ "src/data/migrations/**/*.ts" ],
};

export default new DataSource(ds_config);
