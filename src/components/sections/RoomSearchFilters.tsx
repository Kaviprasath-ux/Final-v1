import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, Search, SlidersHorizontal, Grid3x3, List, X } from 'lucide-react';
import { FilterState } from '../../pages/Rooms/RoomsPage';
import styles from './RoomSearchFilters.module.css';

interface RoomSearchFiltersProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resultCount: number;
}

export const RoomSearchFilters: React.FC<RoomSearchFiltersProps> = ({
  filters,
  setFilters,
  resultCount
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const roomTypes = ['All', 'DELUXE', 'SUITE', 'VILLA', 'PENTHOUSE', 'STUDIO'];
  const sortOptions = ['Recommended', 'Price (Low-High)', 'Price (High-Low)', 'Size'];
  const guestOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <div className={styles.filterContainer}>
        <div className={styles.filterContent}>
          {/* Desktop Filters - Single Row */}
          <div className={styles.desktopFilters}>
            {/* Check-in */}
            <div className={styles.inputWrapper}>
              <Calendar size={16} className={styles.icon} />
              <input
                type="date"
                value={filters.checkIn}
                onChange={(e) => handleFilterChange('checkIn', e.target.value)}
                className={styles.input}
                placeholder="Check-in"
              />
            </div>

            {/* Check-out */}
            <div className={styles.inputWrapper}>
              <Calendar size={16} className={styles.icon} />
              <input
                type="date"
                value={filters.checkOut}
                onChange={(e) => handleFilterChange('checkOut', e.target.value)}
                className={styles.input}
                placeholder="Check-out"
              />
            </div>

            {/* Guests */}
            <div className={styles.inputWrapper}>
              <Users size={16} className={styles.icon} />
              <select
                value={filters.guests}
                onChange={(e) => handleFilterChange('guests', Number(e.target.value))}
                className={styles.select}
              >
                {guestOptions.map(num => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
            </div>

            {/* Room Type */}
            <select
              value={filters.roomType}
              onChange={(e) => handleFilterChange('roomType', e.target.value)}
              className={styles.select}
            >
              {roomTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            {/* Price Range */}
            <div className={styles.priceRangeWrapper}>
              <input
                type="range"
                min="0"
                max="2000"
                value={filters.priceRange[1]}
                onChange={(e) => handleFilterChange('priceRange', [0, Number(e.target.value)])}
                className={styles.rangeSlider}
              />
              <div className={styles.priceDisplay}>
                ${filters.priceRange[0]}-${filters.priceRange[1]}
              </div>
            </div>

            {/* Sort */}
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className={styles.select}
            >
              {sortOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>

            {/* Search Button */}
            <button className={styles.searchButton}>
              <Search size={16} />
              Update
            </button>

            {/* Results Count */}
            <div className={styles.resultCount}>
              {resultCount} room{resultCount !== 1 ? 's' : ''}
            </div>

            {/* View Toggle */}
            <div className={styles.viewToggle}>
              <button
                className={`${styles.viewButton} ${viewMode === 'grid' ? styles.active : ''}`}
                onClick={() => setViewMode('grid')}
                aria-label="Grid view"
              >
                <Grid3x3 size={16} />
              </button>
              <button
                className={`${styles.viewButton} ${viewMode === 'list' ? styles.active : ''}`}
                onClick={() => setViewMode('list')}
                aria-label="List view"
              >
                <List size={16} />
              </button>
            </div>
          </div>

          {/* Mobile Filter Button */}
          <button
            className={styles.mobileFilterButton}
            onClick={() => setShowMobileFilters(true)}
          >
            <SlidersHorizontal size={20} />
            Filters
          </button>

          {/* Mobile Results Count */}
          <div className={styles.mobileResultCount}>
            {resultCount} room{resultCount !== 1 ? 's' : ''} available
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {showMobileFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={styles.mobileOverlay}
              onClick={() => setShowMobileFilters(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className={styles.mobileDrawer}
            >
              <div className={styles.drawerHeader}>
                <h3>Filters</h3>
                <button
                  className={styles.closeButton}
                  onClick={() => setShowMobileFilters(false)}
                >
                  <X size={24} />
                </button>
              </div>

              <div className={styles.drawerContent}>
                <div className={styles.mobileFilterGroup}>
                  <label>Check-in</label>
                  <input
                    type="date"
                    value={filters.checkIn}
                    onChange={(e) => handleFilterChange('checkIn', e.target.value)}
                    className={styles.input}
                  />
                </div>

                <div className={styles.mobileFilterGroup}>
                  <label>Check-out</label>
                  <input
                    type="date"
                    value={filters.checkOut}
                    onChange={(e) => handleFilterChange('checkOut', e.target.value)}
                    className={styles.input}
                  />
                </div>

                <div className={styles.mobileFilterGroup}>
                  <label>Guests</label>
                  <select
                    value={filters.guests}
                    onChange={(e) => handleFilterChange('guests', Number(e.target.value))}
                    className={styles.select}
                  >
                    {guestOptions.map(num => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.mobileFilterGroup}>
                  <label>Room Type</label>
                  <select
                    value={filters.roomType}
                    onChange={(e) => handleFilterChange('roomType', e.target.value)}
                    className={styles.select}
                  >
                    {roomTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div className={styles.mobileFilterGroup}>
                  <label>Max Price: ${filters.priceRange[1]}</label>
                  <input
                    type="range"
                    min="0"
                    max="2000"
                    value={filters.priceRange[1]}
                    onChange={(e) => handleFilterChange('priceRange', [0, Number(e.target.value)])}
                    className={styles.rangeSlider}
                  />
                </div>

                <div className={styles.mobileFilterGroup}>
                  <label>Sort by</label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                    className={styles.select}
                  >
                    {sortOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.drawerFooter}>
                <button
                  className={styles.applyButton}
                  onClick={() => setShowMobileFilters(false)}
                >
                  Show {resultCount} Results
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

