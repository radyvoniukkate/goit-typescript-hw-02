export interface Image {
  id: string;
  urls: {
    thumb: string;
    regular: string;
  };
  alt_description: string;
}
