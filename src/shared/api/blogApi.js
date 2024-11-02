export default class BlogApi {
  baseUrl = 'https://blog-platform.kata.academy/api/';
  async getArticlesList(page) {
    let offset = 20;
    if (page === 1) offset = 1;
    const response = await fetch(`${this.baseUrl}articles?offset=${offset * page - 1}`);
    const list = response.json();
    return list;
  }
}
