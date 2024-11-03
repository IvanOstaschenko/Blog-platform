export async function getArticles(page) {
  let url = 'https://blog-platform.kata.academy/api/articles';
  if (page > 1) {
    url += '?offset=' + (page * 20 - 1);
  }
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (e) {
    console.log('ОШИБКА', e);
  }
}
