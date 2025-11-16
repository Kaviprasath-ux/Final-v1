import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Grid, X, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './RoomImageGallery.module.css';

interface RoomImageGalleryProps {
  images: string[];
  roomName: string;
}

export const RoomImageGallery: React.FC<RoomImageGalleryProps> = ({ images, roomName }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'unset';
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Handle keyboard navigation
  React.useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen]);

  return (
    <>
      {/* Main Gallery Grid */}
      <div className={styles.galleryContainer}>
        <div className={styles.galleryGrid}>
          {/* Main Large Image */}
          <div className={styles.mainImageWrapper} onClick={() => openLightbox(0)}>
            <img src={images[0]} alt={`${roomName} - Main view`} className={styles.mainImage} />
          </div>

          {/* Small Images Grid (up to 4) */}
          {images.slice(1, 5).map((image, index) => (
            <div
              key={index}
              className={styles.smallImageWrapper}
              onClick={() => openLightbox(index + 1)}
            >
              <img src={image} alt={`${roomName} - View ${index + 2}`} className={styles.smallImage} />
            </div>
          ))}

          {/* View All Photos Button */}
          <button className={styles.viewAllButton} onClick={() => openLightbox(0)}>
            <Grid size={16} />
            View All {images.length} Photos
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.lightboxOverlay}
            onClick={closeLightbox}
          >
            <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
              {/* Close Button */}
              <button className={styles.closeButton} onClick={closeLightbox}>
                <X size={32} />
              </button>

              {/* Image Counter */}
              <div className={styles.imageCounter}>
                {currentImageIndex + 1} / {images.length}
              </div>

              {/* Main Image */}
              <div className={styles.lightboxImageWrapper}>
                <motion.img
                  key={currentImageIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  src={images[currentImageIndex]}
                  alt={`${roomName} - ${currentImageIndex + 1}`}
                  className={styles.lightboxImage}
                />
              </div>

              {/* Navigation Arrows */}
              <button className={`${styles.navButton} ${styles.prevButton}`} onClick={prevImage}>
                <ChevronLeft size={40} />
              </button>
              <button className={`${styles.navButton} ${styles.nextButton}`} onClick={nextImage}>
                <ChevronRight size={40} />
              </button>

              {/* Thumbnail Strip */}
              <div className={styles.thumbnailStrip}>
                {images.map((image, index) => (
                  <button
                    key={index}
                    className={`${styles.thumbnail} ${index === currentImageIndex ? styles.activeThumbnail : ''}`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <img src={image} alt={`Thumbnail ${index + 1}`} />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
