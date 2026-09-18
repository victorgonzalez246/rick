const BASE_URL = 'https://rickandmortyapi.com/api';

/**
 * Obtener personajes con paginación, búsqueda por nombre y filtros opcionales
 * @param {Object} params { page, name, status, gender }
 */
export async function getCharacters({ page = 1, name = '', status = '', gender = '' } = {}) {
  const queryParams = new URLSearchParams();
  if (page) queryParams.append('page', page);
  if (name.trim()) queryParams.append('name', name.trim());
  if (status) queryParams.append('status', status);
  if (gender) queryParams.append('gender', gender);

  const url = `${BASE_URL}/character/?${queryParams.toString()}`;
  const response = await fetch(url);

  if (!response.ok) {
    if (response.status === 404) {
      return { info: { count: 0, pages: 0 }, results: [] };
    }
    throw new Error(`Error en la petición: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}

/**
 * Obtener un personaje por su ID para vista de detalle extendida
 * @param {number|string} id 
 */
export async function getCharacterById(id) {
  const response = await fetch(`${BASE_URL}/character/${id}`);
  if (!response.ok) {
    throw new Error(`No se pudo obtener el personaje con ID ${id}`);
  }
  return await response.json();
}

/**
 * Obtener múltiples episodios por URLs o IDs
 * @param {Array<string>} episodeUrls 
 */
export async function getEpisodesByUrls(episodeUrls = []) {
  if (!episodeUrls || episodeUrls.length === 0) return [];
  
  // Extraer los IDs de las URLs (máximo los primeros 6 para no saturar)
  const ids = episodeUrls.slice(0, 6).map(url => url.split('/').pop());
  if (ids.length === 0) return [];

  const response = await fetch(`${BASE_URL}/episode/${ids.join(',')}`);
  if (!response.ok) return [];
  const data = await response.json();
  return Array.isArray(data) ? data : [data];
}
