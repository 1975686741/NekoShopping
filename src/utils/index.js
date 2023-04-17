export function getAssetsImageUrl(imgName) {
  return new URL(`../assets/${imgName}`, import.meta.url).href;
}
