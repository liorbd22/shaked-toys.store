"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
function getTransformedUrl(url: string) {
    // Insert transformation after '/upload/'
    return url.replace('/upload/', '/upload/c_fill,g_auto,h_320,w_300/'); // adjust h_80/w_300 as needed
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
    <div className="w-full max-w-6xl mx-auto mt-12">
      <h1 className="text-2xl font-bold mb-6 text-center">האתר של שקד</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img.public_id} className="overflow-hidden rounded shadow">
            <Image
              src={getTransformedUrl(img.url)}
              alt={img.public_id}
              className="w-full h-80 object-cover hover:scale-105 transition-transform duration-200"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery; 