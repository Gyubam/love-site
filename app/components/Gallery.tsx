"use client";

import { useState } from "react";
import Image from "next/image";

interface Photo {
  src: string;
  caption?: string;
}

// 사진을 추가하려면 여기에 넣으세요!
// public/photos/ 폴더에 사진을 넣고 아래 배열에 추가하면 됩니다.
const photos: Photo[] = [
  { src: "/photos/111.jpg" },
  { src: "/photos/222.jpg" },
  { src: "/photos/333.jpg" },
  { src: "/photos/444.jpg" },
  { src: "/photos/555.jpg" },
  { src: "/photos/666.jpg" },
];

// 사진이 없을 때 보여줄 플레이스홀더
const placeholders = [
  { emoji: "\u{1F495}", text: "Photo 1" },
  { emoji: "\u{1F338}", text: "Photo 2" },
  { emoji: "\u{1F496}", text: "Photo 3" },
  { emoji: "\u{2728}", text: "Photo 4" },
  { emoji: "\u{1F33C}", text: "Photo 5" },
  { emoji: "\u{1F49E}", text: "Photo 6" },
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
        {hasPhotos
          ? photos.map((photo, i) => (
              <div
                key={i}
                className="gallery-item animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
                onClick={() => openLightbox(i)}
              >
                <Image
                  src={photo.src}
                  alt={photo.caption || `Photo ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  style={{ objectFit: "cover" }}
                />
                {photo.caption && (
                  <div className="gallery-overlay">
                    <p>{photo.caption}</p>
                  </div>
                )}
              </div>
            ))
          : placeholders.map((ph, i) => (
              <div
                key={i}
                className="gallery-item animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="photo-placeholder">
                  {ph.emoji}
                  <span>{ph.text}</span>
                </div>
              </div>
            ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && hasPhotos && (
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
          <Image
            src={photos[lightboxIndex].src}
            alt={photos[lightboxIndex].caption || ""}
            width={1200}
            height={800}
            style={{ objectFit: "contain", maxWidth: "90vw", maxHeight: "85vh", width: "auto", height: "auto" }}
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
