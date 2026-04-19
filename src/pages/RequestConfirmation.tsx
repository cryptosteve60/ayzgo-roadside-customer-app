import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ServiceRequest } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import MapView from "@/components/MapView";
import { Star, User } from "lucide-react";
import { getServiceIcon, getServiceTitle } from "@/utils/serviceTypeUtils";
import { Card } from "@/components/ui/card";

const RequestConfirmation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const job = location.state?.job as ServiceRequest;
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [workerFound, setWorkerFound] = useState(false);
  const [workerDetails, setWorkerDetails] = useState<{
    name: string;
    rating: number;
    vehicle: string;
    eta: string;
  } | null>(null);
  
  // Redirect if no job data
  useEffect(() => {
    if (!job) {
      navigate("/");
    }
  }, [job, navigate]);
  
  // Simulate finding a worker after a delay
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed((prev) => {
        const newTime = prev + 1;
        
        // After 3 seconds, set worker found
        if (newTime === 3 && !workerFound) {
          setWorkerFound(true);
          clearInterval(timer);
          
          // Set mock worker details
          setWorkerDetails({
            name: "Mike Johnson",
            rating: 4.9,
            vehicle: "White Ford F-150",
            eta: "12 minutes"
          });
        }
        
        return newTime;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  if (!job) return null;
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="p-4 border-b text-center">
        <h1 className="text-lg font-bold">Request Confirmation</h1>
      </header>
      
      <main className="flex-1 p-4 flex flex-col gap-5">
        {/* Status Card */}
        <Card className="p-4 text-center">
          <div className="mb-4">
            {workerFound ? (
              <div className="h-16 w-16 rounded-full bg-green-500 flex items-center justify-center mx-auto">
                <User className="h-8 w-8 text-white" />
              </div>
            ) : (
              <div className="h-16 w-16 rounded-full border-4 border-t-primary border-r-primary border-b-gray-200 border-l-gray-200 animate-spin mx-auto"></div>
            )}
          </div>
          
          <h2 className="font-bold text-xl mb-1">
            {workerFound ? "Help is on the way!" : "Finding you help..."}
          </h2>
          <p className="text-muted-foreground">
            {workerFound 
              ? "We've matched you with a service provider" 
              : "We're connecting you with a nearby service provider"}
          </p>
        </Card>
        
        {/* Service Details */}
        <div>
          <h2 className="font-bold mb-3">Service Details</h2>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent rounded-md">
                {getServiceIcon(job.serviceType)}
              </div>
              <div className="flex-1">
                <h3 className="font-bold">{getServiceTitle(job.serviceType)}</h3>
                <p className="text-sm text-muted-foreground">
                  {job.customerLocation.address || "Current Location"}
                </p>
              </div>
              <div className="font-bold text-primary">${job.price}</div>
            </div>
          </Card>
        </div>
        
        {/* Map */}
        <div className="flex-1">
          <MapView height="h-[200px]" showJobLocation={true} />
        </div>
        
        {/* Worker Details */}
        {workerFound && workerDetails && (
          <Card className="p-4">
            <h2 className="font-bold mb-3">Your Service Provider</h2>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center">
                <User className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold">{workerDetails.name}</h3>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                  <span className="text-xs">{workerDetails.rating}</span>
                </div>
              </div>
              <div>
                <Button variant="outline" size="sm">Contact</Button>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="p-2 bg-secondary/50 rounded-md">
                <span className="text-xs text-muted-foreground">Vehicle</span>
                <p className="text-sm font-medium">{workerDetails.vehicle}</p>
              </div>
              <div className="p-2 bg-secondary/50 rounded-md">
                <span className="text-xs text-muted-foreground">ETA</span>
                <p className="text-sm font-medium">{workerDetails.eta}</p>
              </div>
            </div>
          </Card>
        )}
        
        {/* Actions */}
        <div className="mt-auto space-y-2">
          <Button className="app-button" onClick={() => navigate("/")}>
            {workerFound ? "Track Progress" : "Return to Home"}
          </Button>
          <Button variant="outline" className="w-full">
            Cancel Request
          </Button>
        </div>
      </main>
    </div>
  );
};

export default RequestConfirmation;
