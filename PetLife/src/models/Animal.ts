// Definindo Modelo de Animal
export interface Animal{
    id: string;
    nome: string;
    especie: string;
    raca?: string;
    idade: number; 
    peso?: number; 
    donoId: string; 
    vacinas?: string[]; 
    observacoes?: string; 
    fotoUrl?: string; 
}