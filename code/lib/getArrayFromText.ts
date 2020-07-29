export function getArrayFromText(text: string) {
    return text.split(",").map((item) => item.trim())
}