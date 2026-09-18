const BASE_URL = 'https://rickandmortyapi.com/api';

export const fetchCharacters = async ({ pageParam = 1, name = '', status = '', gender = '' }) => {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append('page', pageParam);
    if (name) queryParams.append('name', name);
    if (status) queryParams.append('status', status);
    if (gender) queryParams.append('gender', gender);

    const response = await fetch(`${BASE_URL}/character/?${queryParams.toString()}`);
    
    if (response.status === 404) {
      return { results: [], info: { next: null, pages: 0, count: 0 } };
    }
    
    if (!response.ok) {
      throw new Error(`Error en la API: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching characters:', error);
    throw error;
  }
};

export const fetchCharacterById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/character/${id}`);
    if (!response.ok) throw new Error('Personaje no encontrado');
    return await response.json();
  } catch (error) {
    console.error('Error fetching character details:', error);
    throw error;
  }
};

export const fetchMultipleEpisodes = async (episodeUrls) => {
  if (!episodeUrls || episodeUrls.length === 0) return [];
  
  try {
    const episodeIds = episodeUrls.map(url => {
      const parts = url.split('/');
      return parts[parts.length - 1];
    });

    const isSingle = episodeIds.length === 1;
    const response = await fetch(`${BASE_URL}/episode/${episodeIds.join(',')}`);
    
    if (!response.ok) throw new Error('Error al obtener episodios');
    
    const data = await response.json();
    return isSingle ? [data] : data;
  } catch (error) {
    console.error('Error fetching episodes:', error);
    return [];
  }
};
