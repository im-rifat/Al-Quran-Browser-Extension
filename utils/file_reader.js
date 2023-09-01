export function readFileAsync(fileInput) {
    try {
        return (fetch(fileInput));
    } catch(err) {
    }
}