// src/controllers/LivroController.ts
import { Request, Response } from 'express';
import { LivroRepository } from '../repositories/LivroRepository.js'; // Note o .js
import { Livro } from '../entities/Livro.js';

export class LivroController {
    
    // Rota GET /api/livros
    static async listarTodos(req: Request, res: Response) {
        try {
            const livros = await LivroRepository.findAll();
            return res.json(livros);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao buscar livros.' });
        }
    }

    // Rota GET /api/livros/:id
    static async buscarPorId(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: 'ID inválido.' });
            }

            const livro = await LivroRepository.findById(id);

            if (!livro) {
                return res.status(404).json({ message: 'Livro não encontrado.' });
            }

            return res.json(livro);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao buscar livro.' });
        }
    }

    // Rota POST /api/livros
    static async criar(req: Request, res: Response) {
        const { titulo, autor, isbn, anoPublicacao, disponivel } = req.body;

        // Lógica de Negócio (Validação mínima)
        if (!titulo || !autor || !isbn) {
            return res.status(400).json({ message: 'Título, Autor e ISBN são obrigatórios.' });
        }
        
        try {
            const novoLivro = new Livro();
            // Atribui as propriedades. O id será gerado automaticamente.
            novoLivro.titulo = titulo;
            novoLivro.autor = autor;
            novoLivro.isbn = isbn;
            novoLivro.anoPublicacao = anoPublicacao || new Date().getFullYear();
            novoLivro.disponivel = disponivel !== undefined ? disponivel : true;

            const livroSalvo = await LivroRepository.save(novoLivro);

            // 201 Created é a resposta padrão para criação bem-sucedida
            return res.status(201).json(livroSalvo);
        } catch (error: any) {
            console.error(error);
            // Capturar erro de ISBN duplicado, por exemplo
            if (error.code === '23505' || error.errno === 1062) { // Códigos comuns para violação de UNIQUE
                return res.status(409).json({ message: 'ISBN já cadastrado.' });
            }
            return res.status(500).json({ message: 'Erro ao criar livro.' });
        }
    }

    // Rota PUT /api/livros/:id
    static async atualizar(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const updates = req.body;

        try {
            const livroExistente = await LivroRepository.findById(id);

            if (!livroExistente) {
                return res.status(404).json({ message: 'Livro não encontrado para atualização.' });
            }

            // Atualiza o objeto existente com os novos dados
            Object.assign(livroExistente, updates);

            const livroAtualizado = await LivroRepository.save(livroExistente);

            return res.json(livroAtualizado);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao atualizar livro.' });
        }
    }

    // Rota DELETE /api/livros/:id
    static async deletar(req: Request, res: Response) {
        const id = parseInt(req.params.id);

        try {
            const livroExiste = await LivroRepository.exists(id);
            if (!livroExiste) {
                return res.status(404).json({ message: 'Livro não encontrado para exclusão.' });
            }

            await LivroRepository.remove(id);

            // 204 No Content é o padrão para DELETE bem-sucedido
            return res.status(204).send();
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao deletar livro.' });
        }
    }
}