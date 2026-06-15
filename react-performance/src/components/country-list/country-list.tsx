import { memo, useMemo, useState, useEffect } from 'react';
import type { Country } from '../../types';
import { CountryCard } from '../country-card/country-card';
import { getPopulationForYear, createYearDataMap } from '../../utils/data-transformers';

import styles from './country-list.module.css';

type CountryListProps = {
  countries: Country[];
  searchQuery: string;
  selectedColumns: string[];
  selectedRegion: string;
  selectedYear: number;
  sortField: 'name' | 'population';
  sortOrder: 'asc' | 'desc';
  onYearChange: (year: number) => void;
};

const ITEM_HEIGHT = 180;
const BUFFER_ITEMS = 5;

export const CountryList = memo(({
  countries,
  searchQuery,
  selectedColumns,
  selectedRegion,
  selectedYear,
  sortField,
  sortOrder,
}: CountryListProps) => {

  const filteredCountries = useMemo(() => {
    const filtered = countries.filter((c) => {
      const matchesSearch = c.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRegion = !selectedRegion || c.data.some((d) => d.region === selectedRegion);
      return matchesSearch && matchesRegion;
    });

    if (sortField === 'name') {
      return [...filtered].sort((a, b) => 
        sortOrder === 'asc' ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id)
      );
    }

    const withPopulation = filtered.map((country) => ({
      country,
      population: getPopulationForYear(createYearDataMap(country.data), selectedYear) || 0,
    }));

    withPopulation.sort((a, b) => 
      sortOrder === 'asc' ? a.population - b.population : b.population - a.population
    );

    return withPopulation.map((item) => item.country);
  }, [countries, searchQuery, selectedRegion, sortField, sortOrder, selectedYear]);

  const [scrollTop, setScrollTop] = useState(0);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleScroll = () => {
      setScrollTop(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { visibleCountries, paddingTop, paddingBottom } = useMemo(() => {
    const startIndex = Math.max(0, Math.floor(scrollTop / ITEM_HEIGHT) - BUFFER_ITEMS);
    const endIndex = Math.min(
      filteredCountries.length,
      Math.ceil((scrollTop + windowHeight) / ITEM_HEIGHT) + BUFFER_ITEMS
    );

    const visible = filteredCountries.slice(startIndex, endIndex);
    const startPadding = startIndex * ITEM_HEIGHT;
    const endPadding = (filteredCountries.length - endIndex) * ITEM_HEIGHT;

    return {
      visibleCountries: visible,
      paddingTop: startPadding,
      paddingBottom: endPadding,
    };
  }, [scrollTop, windowHeight, filteredCountries]);

  if (filteredCountries.length === 0) {
    return <div className={styles.noData}>No countries found</div>;
  }

  return (
    <div 
      className={styles.countryList}
      style={{ paddingTop: `${paddingTop}px`, paddingBottom: `${paddingBottom}px` }}
    >
      {visibleCountries.map((country) => (
        <CountryCard
          key={country.id}
          country={country}
          selectedYear={selectedYear}
          selectedColumns={selectedColumns}
        />
      ))}
    </div>
  );
});

CountryList.displayName = 'CountryList';
