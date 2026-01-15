import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';

export default function BrowseStays() {
  const [stays, setStays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize state from URL params
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedTown, setSelectedTown] = useState(searchParams.get('town') || '');
  const [selectedType, setSelectedType] = useState(searchParams.get('type') || '');
  const [selectedBedrooms, setSelectedBedrooms] = useState(searchParams.get('bedrooms') || 'Any');
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '0');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '500000');

  // Debounced fetch function
  const fetchProperties = useCallback(async (filters) => {
    try {
      setLoading(true);
      setError(null);

      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== 'Any' && value !== 'All' && value !== '') {
          queryParams.append(key, value);
        }
      });

      const url = `/api/resource${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

      const { get } = await import('../lib/api');
      const response = await get(url);

      if (response && response.success) {
        setStays(response.data || []);
      } else {
        setError(response ? response.message : 'Unexpected response');
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch properties');
    } finally {
      setLoading(false);
    }
  }, []);

  // Update URL params when filters change
  const updateFilters = useCallback((newFilters) => {
    const updatedFilters = {
      search: searchQuery,
      town: selectedTown,
      type: selectedType,
      bedrooms: selectedBedrooms,
      minPrice,
      maxPrice,
      ...newFilters
    };

    // Update state
    if (newFilters.search !== undefined) setSearchQuery(newFilters.search);
    if (newFilters.town !== undefined) setSelectedTown(newFilters.town);
    if (newFilters.type !== undefined) setSelectedType(newFilters.type);
    if (newFilters.bedrooms !== undefined) setSelectedBedrooms(newFilters.bedrooms);
    if (newFilters.minPrice !== undefined) setMinPrice(newFilters.minPrice);
    if (newFilters.maxPrice !== undefined) setMaxPrice(newFilters.maxPrice);

    // Update URL params
    const newSearchParams = new URLSearchParams();
    Object.entries(updatedFilters).forEach(([key, value]) => {
      if (value && value !== 'Any' && value !== 'All' && value !== '') {
        newSearchParams.set(key, value);
      }
    });
    setSearchParams(newSearchParams);

    return updatedFilters;
  }, [searchQuery, selectedTown, selectedType, selectedBedrooms, minPrice, maxPrice, setSearchParams]);

  // Debounced effect for API calls
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const filters = {
        search: searchQuery,
        town: selectedTown,
        type: selectedType,
        bedrooms: selectedBedrooms,
        minPrice,
        maxPrice
      };
      fetchProperties(filters);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, selectedTown, selectedType, selectedBedrooms, minPrice, maxPrice, fetchProperties]);

  // Handle filter changes
  const handleSearchChange = (value) => {
    updateFilters({ search: value });
  };

  const handleTownChange = (town) => {
    updateFilters({ town: selectedTown === town ? '' : town });
  };

  const handleTypeChange = (type) => {
    updateFilters({ type: selectedType === type ? '' : type });
  };

  const handleBedroomsChange = (bedrooms) => {
    updateFilters({ bedrooms });
  };

  const handlePriceChange = (min, max) => {
    updateFilters({ minPrice: min, maxPrice: max });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-black text-slate-900 mb-2">Browse Coast Stays</h1>
      <p className="text-gray-500 mb-8 font-medium">Discover the best beachfront properties and coastal homes</p>

      {/* Search Bar */}
      <div className="mb-10 relative">
        <input
          type="text"
          placeholder="Search properties by name or location..."
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full p-4 pl-6 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#007EA7]/20 transition-all"
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-72 space-y-8">
          {/* Town Filter */}
          <div>
            <h3 className="font-bold text-lg mb-4">Town</h3>
            <div className="space-y-2">
              {['Mombasa', 'Diani', 'Kilifi', 'Watamu', 'Malindi'].map((town) => (
                <button
                  key={town}
                  onClick={() => handleTownChange(town)}
                  className={`w-full text-left px-4 py-2 rounded-xl font-medium hover:bg-[#007EA7] hover:text-white transition-all text-sm ${
                    selectedTown === town ? 'bg-[#007EA7] text-white' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {town}
                </button>
              ))}
            </div>
          </div>

          {/* Property Type Filter */}
          <div>
            <h3 className="font-bold text-lg mb-4">Property Type</h3>
            <div className="space-y-2">
              {['Apartment', 'Villa', 'House', 'Condo'].map((type) => (
                <button
                  key={type}
                  onClick={() => handleTypeChange(type)}
                  className={`w-full text-left px-4 py-2 rounded-xl font-medium hover:bg-[#007EA7] hover:text-white transition-all text-sm ${
                    selectedType === type ? 'bg-[#007EA7] text-white' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="font-bold text-lg mb-4">Price Range</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Min Price</label>
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => handlePriceChange(e.target.value, maxPrice)}
                    placeholder="0"
                    className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#007EA7]/20 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Max Price</label>
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => handlePriceChange(minPrice, e.target.value)}
                    placeholder="500000"
                    className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#007EA7]/20 outline-none"
                  />
                </div>
              </div>
              <div className="text-sm text-gray-500">
                Showing properties priced between KES {parseInt(minPrice || 0).toLocaleString()} and KES {parseInt(maxPrice || 500000).toLocaleString()}
              </div>
            </div>
          </div>

          {/* Bedrooms Dropdown */}
          <div>
            <h3 className="font-bold text-lg mb-4">Bedrooms</h3>
            <select
              value={selectedBedrooms}
              onChange={(e) => handleBedroomsChange(e.target.value)}
              className="w-full p-3 bg-white border border-gray-200 rounded-xl text-slate-700 font-medium outline-none focus:ring-2 focus:ring-[#007EA7]/20"
            >
              <option value="Any">Any</option>
              <option value="1">1 Bedroom</option>
              <option value="2">2 Bedrooms</option>
              <option value="3">3 Bedrooms</option>
              <option value="4+">4+ Bedrooms</option>
            </select>
          </div>
        </aside>

        {/* Property Grid */}
        <div className="flex-1 grid md:grid-cols-2 gap-8 items-start">
          {loading && <div>Loading properties...</div>}
          {error && <div className="text-red-600">{error}</div>}
          {!loading && !error && stays.length === 0 && <div>No properties found.</div>}
          {!loading && !error && stays.map((stay) => (
            <PropertyCard key={stay.id} stay={stay} />
          ))}
        </div>
      </div>
    </div>
  );
}