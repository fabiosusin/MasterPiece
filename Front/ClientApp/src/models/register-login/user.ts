export class User {
    name?: string;
    password?: string;
    confirmPassword?: string;
    email?: string;
    cpf?: number;
    address?: Address;
}

export class Address {
    state?: string;
    zipCode?: number;
    city?: string;
    neighborhood?: string;
    number?: string;
    street?: string;
}