
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Truck } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  return (
    <img 
      src="/placeholder.svg" 
      alt="App Background" 
      className="min-h-screen bg-background flex flex-col object-cover w-full"
    >
      {/* Header */}
      <header className="flex justify-between items-center p-4 border-b bg-primary text-primary-foreground">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center">
            <Truck className="h-5 w-5 text-primary" />
          </div>
          <h1 className="text-lg font-bold">Ayzgo</h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-primary-foreground/80">Roadside Assistance</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4">
        {children}
      </main>
      
      {/* Footer Navigation - Sticky */}
      <nav className="border-t p-4 bg-background sticky bottom-0">
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
            to="/profile" 
            className={`flex flex-col items-center gap-1 ${
              location.pathname === "/profile" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <div className={`h-6 w-6 rounded-full flex items-center justify-center ${
              location.pathname === "/profile" ? "bg-primary text-white" : "bg-secondary text-secondary-foreground"
            }`}>
              <span className="text-xs">P</span>
            </div>
            <span className="text-xs">Profile</span>
          </Link>
        </div>
      </nav>
    </img>
  );
};

export default Layout;
