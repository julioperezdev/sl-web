export interface AddDifference {
    date: string;
    name: string;
    differenceType: DifferenceType;
    amount:number;
    description: string;
}

enum DifferenceType{
    FALTANTE,
    SOBRANTE
}