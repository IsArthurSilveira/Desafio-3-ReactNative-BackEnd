// src/routes/livroRoutes.ts
import { Router } from 'express';
import { LivroController } from '../controllers/LivroController.js';

const router = Router();

// Endpoints CRUD
router.post('/livros', LivroController.criar);          // POST /api/livros (Criar)
router.get('/livros', LivroController.listarTodos);    // GET /api/livros (Ler Todos)
router.get('/livros/:id', LivroController.buscarPorId); // GET /api/livros/{id} (Ler por ID)
router.put('/livros/:id', LivroController.atualizar);    // PUT /api/livros/{id} (Atualizar)
router.delete('/livros/:id', LivroController.deletar);  // DELETE /api/livros/{id} (Excluir)

export default router;