export async function maxPageCount() {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/?page=${value}`
  );
  const data = await response.json();
  const pageCount = data.info.pages;
  return pageCount;
}
