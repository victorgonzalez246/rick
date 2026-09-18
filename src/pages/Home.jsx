import React, { useState, useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { fetchCharacters } from '../services/rickMortyApi';
import SearchBar from '../components/SearchBar';
import CharacterGrid from '../components/CharacterGrid';
import Loader from '../components/Loader';

export default function Home({ setTotalCharacters }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  
  const { ref, inView } = useInView();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status
  } = useInfiniteQuery({
    queryKey: ['characters', searchTerm, statusFilter, genderFilter],
    queryFn: ({ pageParam = 1 }) => 
      fetchCharacters({ pageParam, name: searchTerm, status: statusFilter, gender: genderFilter }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.info?.next ? allPages.length + 1 : undefined;
    },
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Actualizar el total de personajes en el Navbar cuando la data cambie
  useEffect(() => {
    if (data?.pages[0]?.info?.count !== undefined) {
      setTotalCharacters(data.pages[0].info.count);
    }
  }, [data, setTotalCharacters]);

  const handleSearch = (term) => setSearchTerm(term);
  const handleStatusChange = (e) => setStatusFilter(e.target.value);
  const handleGenderChange = (e) => setGenderFilter(e.target.value);

  // Aplanar los resultados de todas las páginas
  const characters = data?.pages.flatMap((page) => page.results) || [];

  return (
    <main className="main-content">
      <SearchBar onSearch={handleSearch} />
      
      <div className="filters-container">
        <select value={statusFilter} onChange={handleStatusChange} className="filter-select">
          <option value="">Cualquier estado</option>
          <option value="alive">Vivo</option>
          <option value="dead">Muerto</option>
          <option value="unknown">Desconocido</option>
        </select>
        
        <select value={genderFilter} onChange={handleGenderChange} className="filter-select">
          <option value="">Cualquier género</option>
          <option value="female">Femenino</option>
          <option value="male">Masculino</option>
          <option value="genderless">Sin género</option>
          <option value="unknown">Desconocido</option>
        </select>
      </div>

      {status === 'pending' ? (
        <Loader message="Viajando a través de portales..." />
      ) : status === 'error' ? (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <h2>Error dimensional</h2>
          <p>No se pudo cargar la base de datos de personajes.</p>
        </div>
      ) : (
        <CharacterGrid 
          characters={characters} 
          isFetchingNextPage={isFetchingNextPage} 
          observerRef={ref} 
        />
      )}
    </main>
  );
}
