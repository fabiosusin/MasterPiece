import { CurrencyMaskInputMode } from "ngx-currency";

export const customCurrencyMaskConfig = {
    align: "left",
    allowNegative: true,
    allowZero: true,
    decimal: ",",
    precision: 2,
    prefix: "R$ ",
    suffix: "",
    thousands: ".",
    nullable: false,
    min: 0,
    inputMode: CurrencyMaskInputMode.FINANCIAL
};