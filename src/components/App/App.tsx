import React, { useState, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";
import { Toaster } from "react-hot-toast";
import Modal from "react-modal";
import Loader from "../Loader/Loader";

const UNSPLASH_ACCESS_KEY = "cKK3V8xFe4LRwa0CLxIkBARfrIXwlUVFm2uMWivIG-Y";

Modal.setAppElement("#root");

interface Image {
  id: string;
  urls: {
    thumb: string;
    regular: string;
  };
  alt_description: string;
}

const App: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  useEffect(() => {
    if (query === "") return;
    fetchImages(query, page);
  }, [query, page]);

  const fetchImages = (searchQuery: string, page: number) => {
    setIsLoading(true);
    setError(null);
    console.log("Fetching images...");

    fetch(
      `https://api.unsplash.com/search/photos?page=${page}&per_page=10&query=${searchQuery}&client_id=${UNSPLASH_ACCESS_KEY}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched data:", data);
        if (data.results.length === 0) {
          setError("No results found");
        } else {
          setImages((prevImages) =>
            page === 1 ? data.results : [...prevImages, ...data.results]
          );
        }
        setIsLoading(false);
        console.log("Fetch complete");
      })
      .catch((error) => {
        console.log("Fetch error:", error);
        setError(error.message);
        setIsLoading(false);
      });
  };

  const handleSearchSubmit = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (image: Image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <Toaster />
      <SearchBar onSubmit={handleSearchSubmit} />
      {error ? (
        <ErrorMessage message={error} />
      ) : (
        <>
          <ImageGallery images={images} onImageClick={openModal} />
          {isLoading && <Loader />}
          {images.length > 0 && !isLoading && (
            <LoadMoreBtn onClick={loadMore} />
          )}
        </>
      )}
      {selectedImage && (
        <ImageModal
          isOpen={!!selectedImage}
          onClose={closeModal}
          image={{
            src: selectedImage.urls.regular,
            alt: selectedImage.alt_description,
          }}
        />
      )}
    </div>
  );
};

export default App;
