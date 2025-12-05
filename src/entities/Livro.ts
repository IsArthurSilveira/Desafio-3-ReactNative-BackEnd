// src/entities/Livro.ts
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("livros")
export class Livro {

    @PrimaryGeneratedColumn()
    id!: number; // Adicione '!'

    @Column()
    titulo!: string; // Adicione '!'

    @Column()
    autor!: string; // Adicione '!'

    @Column({ unique: true })
    isbn!: string; // Adicione '!'

    @Column("int")
    anoPublicacao!: number; // Adicione '!'

    @Column({ default: true })
    disponivel!: boolean; // Adicione '!'
}