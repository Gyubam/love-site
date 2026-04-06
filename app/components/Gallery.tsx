"use client";

import { useState } from "react";

interface Photo {
  src: string;
  caption?: string;
}

const photos: Photo[] = [
  { src: "/photos/111.jpg" },
  { src: "/photos/222.jpg" },
  { src: "/photos/333.jpg" },
  { src: "/photos/444.jpg" },
  { src: "/photos/555.jpg" },
  { src: "/photos/666.jpg" },
];

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const hasPhotos = photos.length > 0;

  const openLightbox = (index: number) => {
    if (hasPhotos) setLightboxIndex(index);
  };

  const closeLightbox = () => setLightboxIndex(null);

  const navigate = (direction: number) => {
    if (lightboxIndex === null) return;
    const newIndex = (lightboxIndex + direction + photos.length) % photos.length;
    setLightboxIndex(newIndex);
  };

  return (
    <>
      <div className="gallery-grid">
        {photos.map((photo, i) => (
          <div
            key={i}
            className="gallery-item animate-fade-in-up"
            style={{ animationDelay: `${i * 0.1}s` }}
            onClick={() => openLightbox(i)}
          >
            <img
              src={photo.src}
              alt={photo.caption || `Photo ${i + 1}`}
              loading="lazy"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            {photo.caption && (
              <div className="gallery-overlay">
                <p>{photo.caption}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="lightbox" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}>
            &times;
          </button>
          <button
            className="lightbox-nav prev"
            onClick={(e) => {
              e.stopPropagation();
              navigate(-1);
            }}
          >
            &#8249;
          </button>
          <img
            src={photos[lightboxIndex].src}
            alt={photos[lightboxIndex].caption || ""}
            style={{ maxWidth: "90vw", maxHeight: "85vh", objectFit: "contain", borderRadius: "12px" }}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="lightbox-nav next"
            onClick={(e) => {
              e.stopPropagation();
              navigate(1);
            }}
          >
            &#8250;
          </button>
          {photos[lightboxIndex].caption && (
            <p
              style={{
                position: "absolute",
                bottom: "2rem",
                color: "white",
                fontSize: "1rem",
                letterSpacing: "0.05em",
              }}
            >
              {photos[lightboxIndex].caption}
            </p>
          )}
        </div>
      )}
    </>
  );
}
