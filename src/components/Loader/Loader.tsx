import React from "react";
import { Circles } from "react-loader-spinner";

const Loader: React.FC = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <Circles color="#00BFFF" height={80} width={80} />
    </div>
  );
};

export default Loader;
