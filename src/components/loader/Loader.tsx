import './Loader.scss';
import React, { FunctionComponent, ReactElement } from 'react';

export enum LoadStatus {
  DONE = 'SUCCESS',
  LOADING = 'LOADING',
  ERROR = 'ERROR',
}

const Loader: FunctionComponent<{
  status: LoadStatus;
}> = ({ status }) => {
  function renderContent(): ReactElement | undefined {
    switch (status) {
      case LoadStatus.ERROR:
        return (
          <div className="loader__warning">
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="exclamation-circle"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="loader__warning-icon"
            >
              <path
                fill="currentColor"
                d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"
              />
            </svg>
            <h3>Something went wrong, please try later</h3>
          </div>
        );
      case LoadStatus.LOADING:
        return (
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="circle-notch"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="loader__spinner"
          >
            <path
              fill="currentColor"
              d="M288 39.056v16.659c0 10.804 7.281 20.159 17.686 23.066C383.204 100.434 440 171.518 440 256c0 101.689-82.295 184-184 184-101.689 0-184-82.295-184-184 0-84.47 56.786-155.564 134.312-177.219C216.719 75.874 224 66.517 224 55.712V39.064c0-15.709-14.834-27.153-30.046-23.234C86.603 43.482 7.394 141.206 8.003 257.332c.72 137.052 111.477 246.956 248.531 246.667C393.255 503.711 504 392.788 504 256c0-115.633-79.14-212.779-186.211-240.236C302.678 11.889 288 23.456 288 39.056z"
            />
          </svg>
        );
      default:
        return undefined;
    }
  }

  return <div className={`loader loader--${status}`}>{renderContent()}</div>;
};

export default Loader;
