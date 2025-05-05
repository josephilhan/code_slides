import React from "react";
import "./LoadFromApi.css";

type Props = {
  isLoading: boolean;
  onLoad: () => void;
};

const LoadFromApi = (props: Props) => (
  <div className="load-from-api">
    <button 
      className="load-from-api-button"
      disabled={props.isLoading} 
      onClick={props.onLoad}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 6V3M15.79 7.78L17.9 5.67M17.9 18.33L15.79 16.22M12 21V18M7.78 15.79L5.67 17.9M18.33 17.9L16.22 15.79M3 12H6M7.78 8.21L5.67 6.1" 
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      Load Examples
    </button>
    {props.isLoading && (
      <div className="load-from-api-loader">
        <div className="loading-spinner"></div>
        Loading...
      </div>
    )}
  </div>
);

export default LoadFromApi;
