'use client';
import { useState } from 'react';
import './ProductFilters.scss';

const categories = ['Todos', 'Electrónica', 'Audio', 'Wearables', 'Fotografía'];

export default function ProductFilters({ filters, setFilters }) {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    if (key === 'category' && value === 'Todos') {
      newFilters.category = '';
    }
    setLocalFilters(newFilters);
    setFilters(newFilters);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setLocalFilters({ ...localFilters, search: value });
    setFilters({ ...localFilters, search: value });
  };

  const clearFilters = () => {
    const emptyFilters = {
      category: '',
      minPrice: '',
      maxPrice: '',
      sort: '',
      search: ''
    };
    setLocalFilters(emptyFilters);
    setFilters(emptyFilters);
  };

  return (
    <div className="product-filters">
      <div className="filters-header">
        <h3>Filtros</h3>
        <button className="clear-filters" onClick={clearFilters}>
          Limpiar todo
        </button>
      </div>

      {/* Búsqueda */}
      <div className="filter-group">
        <label>Buscar productos</label>
        <input
          type="text"
          placeholder="Buscar..."
          value={localFilters.search}
          onChange={handleSearch}
        />
      </div>

      {/* Categorías */}
      <div className="filter-group">
        <label>Categoría</label>
        <select
          value={localFilters.category || 'Todos'}
          onChange={(e) => handleChange('category', e.target.value)}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Rango de precios */}
      <div className="filter-group">
        <label>Rango de precio</label>
        <div className="price-range">
          <input
            type="number"
            placeholder="Mínimo"
            value={localFilters.minPrice}
            onChange={(e) => handleChange('minPrice', e.target.value)}
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Máximo"
            value={localFilters.maxPrice}
            onChange={(e) => handleChange('maxPrice', e.target.value)}
          />
        </div>
      </div>

      {/* Ordenar */}
      <div className="filter-group">
        <label>Ordenar por</label>
        <select
          value={localFilters.sort}
          onChange={(e) => handleChange('sort', e.target.value)}
        >
          <option value="">Relevancia</option>
          <option value="price_asc">Precio: menor a mayor</option>
          <option value="price_desc">Precio: mayor a menor</option>
          <option value="rating">Mejor calificados</option>
        </select>
      </div>
    </div>
  );
}