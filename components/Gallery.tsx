"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

function getTransformedUrl(url: string) {
  // Adjust image size for mobile-first approach
  return url.replace('/upload/', '/upload/c_fill,g_auto,h_400,w_300/');
} 

type ImageItem = {
  url: string;
  public_id: string;
};

const Gallery: React.FC = () => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/images")
      .then((res) => res.json())
      .then((data) => {
        setImages(data.images);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load images");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="mt-8 text-center">Loading images...</div>;
  if (error) return <div className="mt-8 text-center text-red-500">{error}</div>;

  return (
    <div className="w-full max-w-4xl mx-auto px-2 py-8">
      <div className="relative">
        <h1 className="text-4xl font-bold mb-8 text-center text-purple-800">
          <span className="inline-block transform hover:scale-105 transition-transform duration-200">
            האתר של שקד
          </span>
        </h1>
        <div className="absolute -top-4 -left-4 w-16 h-16 bg-yellow-300 rounded-full opacity-50 animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-pink-300 rounded-full opacity-50 animate-bounce" style={{ animationDelay: '0.5s' }}></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img.public_id} className="overflow-hidden rounded-lg shadow-lg bg-white transform hover:scale-105 transition-all duration-200">
            <div className="relative aspect-[3/4]">
              <Image
                src={getTransformedUrl(img.url)}
                alt={img.public_id}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover"
                priority={false}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery; 