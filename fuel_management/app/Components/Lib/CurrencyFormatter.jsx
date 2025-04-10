export default function CurrencyFormatter( value ) {
    return Intl.NumberFormat("en-US", { minimumFractionDigits: 2 } ).format(value)
}