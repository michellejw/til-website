import React from "react";
import { Github, Globe } from "lucide-react";

interface SiteHeaderProps {
  logoUrl?: string;
}

const SiteHeader: React.FC<SiteHeaderProps> = ({
  logoUrl = "/api/placeholder/40/40",
}) => {
  return (
    <header className="border-b bg-white">
      <div className="max-w-6xl mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={logoUrl}
              alt="Site Logo"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h1 className="text-xl font-bold text-gray-900">TIL</h1>
              <p className="text-sm text-gray-600">
                Quick lessons from daily coding
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/yourusername/til-app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Github className="w-5 h-5" />
              <span className="hidden sm:inline">Source</span>
            </a>
            <a
              href="https://waveformanalytics.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Globe className="w-5 h-5" />
              <span className="hidden sm:inline">Website</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

interface SiteFooterProps {}

const SiteFooter: React.FC<SiteFooterProps> = () => {
  return (
    <footer className="border-t bg-white mt-12">
      <div className="max-w-6xl mx-auto px-8 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} Michelle Weirathmueller. All rights
            reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://yourwebsite.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Globe className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { SiteHeader, SiteFooter };
