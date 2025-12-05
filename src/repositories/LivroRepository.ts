// src/repositories/LivroRepository.ts
import { AppDataSource } from "../data-source.js"; // Adicione .js
import { Livro } from "../entities/Livro.js"; // Adicione .js
// Obtém o repositório base do TypeORM para a entidade Livro
const repository = AppDataSource.getRepository(Livro);

export const LivroRepository = {
    // 1. LER TODOS
    async findAll(): Promise<Livro[]> {
        return repository.find();
    },

    // 2. LER POR ID
    async findById(id: number): Promise<Livro | null> {
        return repository.findOneBy({ id });
    },

    // 3. CRIAR / ATUALIZAR
    // O método save insere se o ID não existir, ou atualiza se o ID existir.
    async save(livro: Livro): Promise<Livro> {
        return repository.save(livro);
    },

    // 4. EXCLUIR
    async remove(id: number): Promise<void> {
        await repository.delete(id);
    },

    // 5. Verificar se o livro existe (útil para atualizações/exclusões)
    async exists(id: number): Promise<boolean> {
        return repository.exists({ where: { id } });
    }
};