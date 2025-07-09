
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Truck, Home, Wrench, ShoppingBag, User } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Clean Header with Orange Theme */}
      <header className="flex justify-between items-center p-4 border-b bg-primary text-primary-foreground">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center">
            <Truck className="h-5 w-5 text-primary" />
          </div>
          <h1 className="text-lg font-bold">Ayzgo</h1>
        </div>
      </header>

      {/* Main Content with bottom padding to account for sticky footer */}
      <main className="flex-1 relative pb-20">
        {children}
      </main>
      
      {/* Sticky Footer Navigation - Always visible on all pages */}
      <nav className="fixed bottom-0 left-0 right-0 border-t p-2 bg-background z-50 shadow-lg">
        <div className="flex justify-around items-center">
          <Link 
            to="/" 
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
              location.pathname === "/" ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Home className="h-5 w-5" />
            <span className="text-xs">Home</span>
          </Link>
          <Link 
            to="/services" 
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
              location.pathname === "/services" ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Wrench className="h-5 w-5" />
            <span className="text-xs">Services</span>
          </Link>
          <Link 
            to="/products" 
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
              location.pathname === "/products" ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <ShoppingBag className="h-5 w-5" />
            <span className="text-xs">Products</span>
          </Link>
          <Link 
            to="/profile" 
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
              location.pathname === "/profile" ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <User className="h-5 w-5" />
            <span className="text-xs">Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Layout;
