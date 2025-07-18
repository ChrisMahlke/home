import React from 'react';
import { Github, Linkedin, ArrowUpRight } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-8">
      <div className="max-w-2xl w-full">
        {/* Main Content */}
        {/* Links */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors duration-200 group"
          >
            <Github className="w-5 h-5" />
            <span className="font-medium">GitHub</span>
            <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </a>
          
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors duration-200 group"
          >
            <Linkedin className="w-5 h-5" />
            <span className="font-medium">LinkedIn</span>
            <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </a>
        </div>

      </div>
    </div>
  );
}

export default App;