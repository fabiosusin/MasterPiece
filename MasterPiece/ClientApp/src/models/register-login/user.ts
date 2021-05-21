export class User {
    name?: string;
    password?: string;
    confirmPassword?: string;
    email?: string;
    cpf?: string;
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