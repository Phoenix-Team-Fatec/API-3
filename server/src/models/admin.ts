import ConnectionDB from "../config/connectionDB";
import User from "./user";
import dotenv from "dotenv";

dotenv.config({path:".env"});

export default class Admin extends User {
    
    public is_admin: boolean;
    
    constructor(name: string, email: string, password: string, is_admin: boolean){
        super(name, email, password);
        this.is_admin = is_admin;
    }

    login(): void {
        throw new Error("Method not implemented.");
    }
    logout(): void {
        throw new Error("Method not implemented.");
    }

    // Método para cadastrar novo usuário
    public async cadastrarUsuario(nome: string, email: string, senha: string, is_admin: boolean): Promise<void>{
        const db = new ConnectionDB();

        try{
            // Inserindo usuário no banco de dados
            const result = await db.query(
                "INSERT INTO Usuario (nome, email, senha, is_admin) VALUES ($1, $2, $3, $4)",
                [nome, email, senha, is_admin]
            );
            console.log("Uusuário cadastrado com sucesso!");

        }catch(err){
            console.error("Erro ao cadastrar usuário:", err);
        }
    }

    // Método para deletar usuário
    public async deletarUsuario(id: number): Promise<void>{
        const db = new ConnectionDB();
        
        try {
            await db.query("DELETE FROM Usuario WHERE id = $1", [id]);
            console.log(`Usuário com ID ${id} deletado com sucesso!`);
        }catch (err) {
            console.error("Erro ao deletar usuário: ", err)
        }
    }

    // Método para listar usuários
    public async listarUsuario(): Promise<void> {
        const db = new ConnectionDB();
    
        try {
            // Consultando todos os usuários no banco de dados
            const result = await db.query("SELECT * FROM Usuario", []);

            return result.rows
        
        } catch (err) {
            console.error("Erro ao listar usuários:", err);
        }
    }



    //Método para atualizar usuário
    public async atualizarUsuario(id: number, nome: string, email: string, senha: string): Promise<void>{
        const db = new ConnectionDB();

        try{
            const result = await db.query(
                "UPDATE Usuario SET nome = $1, email = $2, senha = $3 WHERE id = $4",
                [nome, email, senha, id]
            );
            

        }catch(err){
            console.error("Erro ao atualizar usuário:", err);

        }
    }
    
}