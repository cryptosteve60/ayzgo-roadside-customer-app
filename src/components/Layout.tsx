
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Truck, Home, Wrench, ShoppingBag, User, Gift } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Enhanced Header with Rewards */}
      <header className="flex justify-between items-center p-4 border-b bg-primary text-primary-foreground">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center">
            <Truck className="h-5 w-5 text-primary" />
          </div>
          <h1 className="text-lg font-bold">Ayzgo</h1>
        </div>
        
        {/* Rewards Button in Header */}
        <Link 
          to="/rewards" 
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
            location.pathname === "/rewards" ? "bg-white/20" : "hover:bg-white/10"
          }`}
        >
          <Gift className="h-5 w-5" />
          <span className="text-sm font-medium">Rewards</span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative">
        {children}
      </main>
      
      {/* Simplified Footer Navigation - Only 4 main items */}
      <nav className="border-t p-2 bg-background sticky bottom-0 z-50">
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
