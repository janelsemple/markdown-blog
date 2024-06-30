// components/Loading.tsx
import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
      <div className="loader border-4 border-t-4 border-t-blue-500 border-gray-200 rounded-full w-16 h-16 animate-spin"></div>
      <style jsx>{`
        .loader {
          border-top-color: #3498db;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Loading;
