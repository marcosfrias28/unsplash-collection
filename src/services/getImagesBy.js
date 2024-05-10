const API_KEY = await import.meta.env.PUBLIC_access_key;

//TODO Env variables are not working in Astro

export async function getImagesByID(id) {
  const response = await fetch(`https://api.unsplash.com/photos/${id}`, {
    headers: {
      Authorization: `Client-ID ${API_KEY}`,
    },
  });
  const data = await response.json();
  return data.results;
}

export async function getImagesByKeywords(keywords) {
  const response = await fetch(
    `https://api.unsplash.com/search/photos?page=2&query=${keywords}&per_page=8`,
    {
      headers: {
        Authorization: `Client-ID ${API_KEY}`,
      },
    }
  );
  const data = await response.json();
  return data.results;
}
