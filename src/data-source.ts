// src/data-source.ts
import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import * as dotenv from "dotenv";
import { Livro } from "./entities/Livro.js";

dotenv.config();

const options: DataSourceOptions = {
    type: (process.env.DB_TYPE as any) || "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true, 
    logging: false,
    entities: [Livro],
    migrations: [],
    subscribers: [],
    
    // ESTE BLOCO É OBRIGATÓRIO PARA O NEON E DEVE ESTAR AQUI
    extra: { 
        ssl: {
            // Permite conexão mesmo sem certificado assinado (necessário para dev)
            rejectUnauthorized: false
        }
    }, 
};

export const AppDataSource = new DataSource(options);