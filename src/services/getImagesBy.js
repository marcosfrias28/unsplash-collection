const API_KEY = await import.meta.env.PUBLIC_access_key;

//TODO Env variables are not working in Astro

export async function getImagesByID(id) {
  const response = await fetch(`https://api.unsplash.com/photos/${id}`, {
    headers: {
      Authorization: `Client-ID ${API_KEY}`,
    },
  });
  const data = await response.json();

  const { results } = data;

  return results;
}

export async function getImagesByName(name) {
  const response = await fetch(
    `https://api.unsplash.com/search/photos?page=2&query=${name}&per_page=8`,
    {
      headers: {
        Authorization: `Client-ID ${API_KEY}`,
      },
    }
  );
  const data = await response.json();
  getStaticPaths(name);
  const { results } = data;

  return results.map((result) => {
    const { id, urls, alt_description } = result;
    return { id, urls: urls.regular, alt_description };
  });
}
