export function paginationCount(arr, numberOfArticles) {
  return Math.ceil(numberOfArticles / arr.length);
}