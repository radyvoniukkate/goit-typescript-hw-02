import React from "react";
import ImageCard from "../ImageCard/ImageCard";
import styles from "./ImageGallery.module.css";

interface Image {
  id: string;
  urls: {
    thumb: string;
    regular: string;
  };
  alt_description: string;
}

interface ImageGalleryProps {
  images: Image[];
  onImageClick: (image: Image) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  onImageClick,
}) => {
  return (
    <>
      {images.length > 0 && (
        <ul className={styles.list}>
          {images.map((image, index) => (
            <li
              key={`${image.id}-${index}`}
              onClick={() => onImageClick(image)}
            >
              <ImageCard src={image.urls.thumb} alt={image.alt_description} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default ImageGallery;
