import React from 'react';
import { Calendar, Search, Minus, Plus, Check } from 'lucide-react';
import { FilterState } from '../../pages/Rooms/RoomsPage';
import styles from './RoomsSidebar.module.css';

interface RoomsSidebarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  roomCounts: { [key: string]: number };
}

export const RoomsSidebar: React.FC<RoomsSidebarProps> = ({
  filters,
  setFilters,
  roomCounts
}) => {
  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleClearAll = () => {
    setFilters({
      checkIn: '',
      checkOut: '',
      guests: 2,
      roomType: 'All',
      priceRange: [0, 2000],
      sortBy: 'Recommended'
    });
  };

  const roomTypes = [
    { value: 'All', label: 'All Rooms', count: roomCounts.total || 0 },
    { value: 'DELUXE', label: 'Deluxe', count: roomCounts.DELUXE || 0 },
    { value: 'SUITE', label: 'Suite', count: roomCounts.SUITE || 0 },
    { value: 'VILLA', label: 'Villa', count: roomCounts.VILLA || 0 },
    { value: 'PENTHOUSE', label: 'Penthouse', count: roomCounts.PENTHOUSE || 0 },
    { value: 'STUDIO', label: 'Studio', count: roomCounts.STUDIO || 0 }
  ];

  const sortOptions = [
    { value: 'Recommended', label: 'Recommended (AI)' },
    { value: 'Price (Low-High)', label: 'Price: Low to High' },
    { value: 'Price (High-Low)', label: 'Price: High to Low' },
    { value: 'Size', label: 'Size: Largest First' }
  ];

  return (
    <div className={styles.sidebar}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>Filters</h2>
        <button className={styles.clearAll} onClick={handleClearAll}>
          Clear all
        </button>
      </div>
      <div className={styles.divider} />

      {/* Dates Section */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Dates</h3>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Check-in</label>
          <div className={styles.dateInput}>
            <Calendar size={18} className={styles.inputIcon} />
            <input
              type="date"
              value={filters.checkIn}
              onChange={(e) => handleFilterChange('checkIn', e.target.value)}
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Check-out</label>
          <div className={styles.dateInput}>
            <Calendar size={18} className={styles.inputIcon} />
            <input
              type="date"
              value={filters.checkOut}
              onChange={(e) => handleFilterChange('checkOut', e.target.value)}
              className={styles.input}
            />
          </div>
        </div>
      </div>
      <div className={styles.divider} />

      {/* Guests Section */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Guests</h3>
        <div className={styles.guestsControl}>
          <span className={styles.guestsLabel}>Number of guests</span>
          <div className={styles.counter}>
            <button
              className={styles.counterButton}
              onClick={() => handleFilterChange('guests', Math.max(1, filters.guests - 1))}
              disabled={filters.guests <= 1}
            >
              <Minus size={16} />
            </button>
            <span className={styles.counterValue}>{filters.guests}</span>
            <button
              className={styles.counterButton}
              onClick={() => handleFilterChange('guests', Math.min(10, filters.guests + 1))}
              disabled={filters.guests >= 10}
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>
      <div className={styles.divider} />

      {/* Room Type Section */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Room Type</h3>
        <div className={styles.checkboxList}>
          {roomTypes.map((type) => (
            <label
              key={type.value}
              className={`${styles.checkboxItem} ${filters.roomType === type.value ? styles.checked : ''}`}
            >
              <div className={styles.checkbox}>
                {filters.roomType === type.value && <Check size={14} />}
              </div>
              <span className={styles.checkboxLabel}>
                {type.label} <span className={styles.count}>({type.count})</span>
              </span>
              <input
                type="radio"
                name="roomType"
                value={type.value}
                checked={filters.roomType === type.value}
                onChange={(e) => handleFilterChange('roomType', e.target.value)}
                className={styles.hiddenInput}
              />
            </label>
          ))}
        </div>
      </div>
      <div className={styles.divider} />

      {/* Price Range Section */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Price Range</h3>
        <div className={styles.priceDisplay}>
          ${filters.priceRange[0]} - ${filters.priceRange[1]}
        </div>
        <input
          type="range"
          min="0"
          max="2000"
          step="50"
          value={filters.priceRange[1]}
          onChange={(e) => handleFilterChange('priceRange', [0, Number(e.target.value)])}
          className={styles.rangeSlider}
        />
        <div className={styles.priceInputs}>
          <div className={styles.priceInputWrapper}>
            <span className={styles.priceCurrency}>$</span>
            <input
              type="number"
              value={filters.priceRange[0]}
              onChange={(e) => handleFilterChange('priceRange', [Number(e.target.value), filters.priceRange[1]])}
              className={styles.priceInput}
              placeholder="Min"
            />
          </div>
          <div className={styles.priceInputWrapper}>
            <span className={styles.priceCurrency}>$</span>
            <input
              type="number"
              value={filters.priceRange[1]}
              onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], Number(e.target.value)])}
              className={styles.priceInput}
              placeholder="Max"
            />
          </div>
        </div>
      </div>
      <div className={styles.divider} />

      {/* Sort Section */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Sort By</h3>
        <div className={styles.radioList}>
          {sortOptions.map((option) => (
            <label
              key={option.value}
              className={`${styles.radioItem} ${filters.sortBy === option.value ? styles.checked : ''}`}
            >
              <div className={styles.radio}>
                {filters.sortBy === option.value && <div className={styles.radioDot} />}
              </div>
              <span className={styles.radioLabel}>{option.label}</span>
              <input
                type="radio"
                name="sortBy"
                value={option.value}
                checked={filters.sortBy === option.value}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className={styles.hiddenInput}
              />
            </label>
          ))}
        </div>
      </div>

      {/* Apply Button */}
      <button className={styles.applyButton}>
        <Search size={18} />
        APPLY FILTERS
      </button>
    </div>
  );
};
