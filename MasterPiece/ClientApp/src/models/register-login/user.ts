export class User {
    id?: string;
    name?: string;
    password?: string;
    confirmPassword?: string;
    email?: string;
    cpf?: string;
    admin?: boolean;
    blocked?: boolean;
    address?: Address = new Address();
}

export class Address {
    state?: string;
    zipCode?: string;
    city?: string;
    neighborhood?: string;
    number?: string;
    street?: string;
}