
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Truck, Home, Wrench, ShoppingBag, User, History, Gift } from "lucide-react";

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
            to="/history" 
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
              location.pathname === "/history" ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <History className="h-5 w-5" />
            <span className="text-xs">History</span>
          </Link>
          <Link 
            to="/rewards" 
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
              location.pathname === "/rewards" ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Gift className="h-5 w-5" />
            <span className="text-xs">Rewards</span>
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
