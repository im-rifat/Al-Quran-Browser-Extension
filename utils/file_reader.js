export async function readFileAsync(fileInput) {
    return (await fetch(fileInput)).text();
}