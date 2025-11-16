import React, { useState, useMemo } from 'react';
import { RoomsHero } from '../../components/sections/RoomsHero';
import { RoomsSidebar } from '../../components/sections/RoomsSidebar';
import { RoomsGrid } from '../../components/sections/RoomsGrid';
import { FixedAIChatBubble } from '../../components/sections/FixedAIChatBubble';
import { roomsData } from '../../data/roomsData';
import { X } from 'lucide-react';
import styles from './RoomsPage.module.css';

export interface FilterState {
  checkIn: string;
  checkOut: string;
  guests: number;
  roomType: string;
  priceRange: [number, number];
  sortBy: string;
}

export const RoomsPage: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>({
    checkIn: '',
    checkOut: '',
    guests: 2,
    roomType: 'All',
    priceRange: [0, 2000],
    sortBy: 'Recommended'
  });

  // Calculate room counts by category
  const roomCounts = useMemo(() => {
    const counts: { [key: string]: number } = {
      total: roomsData.length,
      DELUXE: 0,
      SUITE: 0,
      VILLA: 0,
      PENTHOUSE: 0,
      STUDIO: 0
    };

    roomsData.forEach(room => {
      if (counts[room.category] !== undefined) {
        counts[room.category]++;
      }
    });

    return counts;
  }, []);

  // Filter rooms based on current filters
  const filteredRooms = roomsData.filter(room => {
    if (filters.roomType !== 'All' && room.category !== filters.roomType) {
      return false;
    }
    if (room.price < filters.priceRange[0] || room.price > filters.priceRange[1]) {
      return false;
    }
    if (room.maxGuests < filters.guests) {
      return false;
    }
    return true;
  });

  // Sort rooms
  const sortedRooms = [...filteredRooms].sort((a, b) => {
    switch (filters.sortBy) {
      case 'Price (Low-High)':
        return a.price - b.price;
      case 'Price (High-Low)':
        return b.price - a.price;
      case 'Size':
        return b.size - a.size;
      case 'Recommended':
      default:
        // AI recommended rooms first, then by price
        if (a.isAIRecommended && !b.isAIRecommended) return -1;
        if (!a.isAIRecommended && b.isAIRecommended) return 1;
        return a.price - b.price;
    }
  });

  // Get active filters for pills
  const getActiveFilters = () => {
    const active: { key: string; label: string; value: any }[] = [];

    if (filters.checkIn) {
      active.push({ key: 'checkIn', label: `Check-in: ${filters.checkIn}`, value: 'checkIn' });
    }
    if (filters.checkOut) {
      active.push({ key: 'checkOut', label: `Check-out: ${filters.checkOut}`, value: 'checkOut' });
    }
    if (filters.guests !== 2) {
      active.push({ key: 'guests', label: `${filters.guests} Guests`, value: 'guests' });
    }
    if (filters.roomType !== 'All') {
      active.push({ key: 'roomType', label: filters.roomType, value: 'roomType' });
    }
    if (filters.priceRange[0] !== 0 || filters.priceRange[1] !== 2000) {
      active.push({
        key: 'priceRange',
        label: `$${filters.priceRange[0]} - $${filters.priceRange[1]}`,
        value: 'priceRange'
      });
    }
    if (filters.sortBy !== 'Recommended') {
      active.push({ key: 'sortBy', label: `Sort: ${filters.sortBy}`, value: 'sortBy' });
    }

    return active;
  };

  const removeFilter = (key: string) => {
    setFilters(prev => {
      switch (key) {
        case 'checkIn':
          return { ...prev, checkIn: '' };
        case 'checkOut':
          return { ...prev, checkOut: '' };
        case 'guests':
          return { ...prev, guests: 2 };
        case 'roomType':
          return { ...prev, roomType: 'All' };
        case 'priceRange':
          return { ...prev, priceRange: [0, 2000] };
        case 'sortBy':
          return { ...prev, sortBy: 'Recommended' };
        default:
          return prev;
      }
    });
  };

  const activeFilters = getActiveFilters();

  return (
    <div className={styles.roomsPage}>
      <RoomsHero />

      {/* Sidebar + Content Layout */}
      <div className={styles.mainContainer}>
        <div className={styles.contentWrapper}>
          {/* Left Sidebar */}
          <RoomsSidebar
            filters={filters}
            setFilters={setFilters}
            roomCounts={roomCounts}
          />

          {/* Right Content Area */}
          <div className={styles.contentArea}>
            {/* Results Header */}
            <div className={styles.resultsHeader}>
              <div className={styles.resultsInfo}>
                <h2 className={styles.resultsTitle}>
                  {sortedRooms.length} {sortedRooms.length === 1 ? 'room' : 'rooms'} available
                </h2>
              </div>
            </div>

            {/* Active Filter Pills */}
            {activeFilters.length > 0 && (
              <div className={styles.filterPills}>
                {activeFilters.map((filter) => (
                  <button
                    key={filter.key}
                    className={styles.filterPill}
                    onClick={() => removeFilter(filter.key)}
                  >
                    {filter.label}
                    <X size={14} />
                  </button>
                ))}
              </div>
            )}

            {/* Rooms Grid */}
            <RoomsGrid
              rooms={sortedRooms}
            />
          </div>
        </div>
      </div>

      <FixedAIChatBubble />
    </div>
  );
};
