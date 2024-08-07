import React from "react";
import styles from "./ImageCard.module.css";

interface ImageCardProps {
  src: string;
  alt: string;
}

const ImageCard: React.FC<ImageCardProps> = ({ src, alt }) => {
  return (
    <div>
      <img src={src} alt={alt} className={styles.img} />
    </div>
  );
};

export default ImageCard;
