
import { Button } from "@/components/ui/button";
import { Wrench } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ServicesHeader() {
  const navigate = useNavigate();
  
  return (
    <header className="border-b bg-primary text-primary-foreground sticky top-0 z-40">
      <div className="container max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wrench className="h-6 w-6" />
            <span className="font-semibold text-lg">Services</span>
          </div>
        </div>
      </div>
    </header>
  );
}
