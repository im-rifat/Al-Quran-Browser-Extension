export async function readFileAsync(fileInput) {
    try {
        return (await fetch(fileInput)).text();
    } catch(err) {
    }
}