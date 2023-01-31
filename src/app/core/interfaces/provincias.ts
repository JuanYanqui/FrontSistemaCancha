export interface Provincias {

    provincia: string;
    cantones: { [key: string]: Cantone };
}

export interface Cantone {

    canton: string;
    parroquias: { [key: string]: string } | null;
}