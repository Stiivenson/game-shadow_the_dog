export function createImage(path) {
    const img = new Image()
    img.src = new URL(path, import.meta.url).href
    return img
}