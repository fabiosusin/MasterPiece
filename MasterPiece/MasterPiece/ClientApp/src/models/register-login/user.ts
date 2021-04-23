export class User {
    name?: string;
    password?: string;
    email?: string;
    cpf?: string;
    address?: Address;
}

export class Address {
    state?: string;
    city?: string;
    neighborhood?: string;
    number?: string;
    street?: string;
}