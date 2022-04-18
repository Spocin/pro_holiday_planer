export function generateRequiredMsg() {
    return "Field is required";
}

export function generateLengthMsg(from: number, to: number) {
    return `Must be between ${from} and ${to} characters`;
}