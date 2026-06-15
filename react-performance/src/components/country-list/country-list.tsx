import type { Country } from '../../types';
import { CountryCard } from '../country-card/country-card';
import { getPopulationForYear, createYearDataMap } from '../../utils/data-transformers';
import styles from './country-list.module.css';
import { memo, useMemo } from 'react';

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

  return (
    <div className={styles.countryList}>
      {filteredCountries.map((country) => (
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
