// src/index.ts
import express from 'express';
import * as dotenv from 'dotenv';
import 'reflect-metadata'; // Importar no topo
import { AppDataSource } from './data-source.js'; // Note o .js
import livroRoutes from './routes/LivroRoutes.js'; // Note o .js

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const API_PREFIX = '/api'; // Rota base sugerida

// Middleware para processar JSON no corpo das requisições
app.use(express.json());

// 1. Inicializar a conexão com o Banco de Dados
AppDataSource.initialize()
    .then(() => {
        console.log("Conexão com o banco de dados estabelecida com sucesso!");

        // 2. Definir as rotas
        app.use(API_PREFIX, livroRoutes);

        // 3. Iniciar o servidor
        app.listen(PORT, () => {
            console.log(`🚀 Servidor backend rodando em http://localhost:${PORT}`);
            console.log(`Endpoints disponíveis em http://localhost:${PORT}${API_PREFIX}/livros`);
        });
    })
    .catch((error) => {
        console.error("❌ Erro durante a inicialização do TypeORM:", error);
    });