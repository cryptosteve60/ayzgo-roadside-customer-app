
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Truck } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Minimal Header */}
      <header className="flex justify-between items-center p-4 border-b bg-primary text-primary-foreground">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center">
            <Truck className="h-5 w-5 text-primary" />
          </div>
          <h1 className="text-lg font-bold">Ayzgo</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative">
        {children}
      </main>
      
      {/* Footer Navigation - Sticky at bottom */}
      <nav className="border-t p-4 bg-background sticky bottom-0 z-50">
        <div className="flex justify-around items-center">
          <Link 
            to="/" 
            className={`flex flex-col items-center gap-1 ${
              location.pathname === "/" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <div className={`h-6 w-6 rounded-full flex items-center justify-center ${
              location.pathname === "/" ? "bg-primary text-white" : "bg-secondary text-secondary-foreground"
            }`}>
              <span className="text-xs">H</span>
            </div>
            <span className="text-xs">Home</span>
          </Link>
          <Link 
            to="/services" 
            className={`flex flex-col items-center gap-1 ${
              location.pathname === "/services" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <div className={`h-6 w-6 rounded-full flex items-center justify-center ${
              location.pathname === "/services" ? "bg-primary text-white" : "bg-secondary text-secondary-foreground"
            }`}>
              <span className="text-xs">S</span>
            </div>
            <span className="text-xs">Services</span>
          </Link>
          <Link 
            to="/subscription" 
            className={`flex flex-col items-center gap-1 ${
              location.pathname === "/subscription" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <div className={`h-6 w-6 rounded-full flex items-center justify-center ${
              location.pathname === "/subscription" ? "bg-primary text-white" : "bg-secondary text-secondary-foreground"
            }`}>
              <span className="text-xs">P</span>
            </div>
            <span className="text-xs">Premium</span>
          </Link>
          <Link 
            to="/profile" 
            className={`flex flex-col items-center gap-1 ${
              location.pathname === "/profile" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <div className={`h-6 w-6 rounded-full flex items-center justify-center ${
              location.pathname === "/profile" ? "bg-primary text-white" : "bg-secondary text-secondary-foreground"
            }`}>
              <span className="text-xs">U</span>
            </div>
            <span className="text-xs">Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Layout;
