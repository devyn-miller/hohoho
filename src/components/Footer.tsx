import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full text-center py-4 text-white/80 text-sm">
      <div className="max-w-2xl mx-auto space-y-2">
        <p>© {currentYear} Devyn Miller. All Rights Reserved.</p>
        <div className="flex justify-center space-x-4">
          <a 
            href="https://github.com/Devyn-Miller" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a 
            href="https://linkedin.com/in/devyn-c-miller/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <a 
            href="https://devyn-miller.github.io/profile-/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Portfolio
          </a>
        </div>
      </div>
    </footer>
  );
};
