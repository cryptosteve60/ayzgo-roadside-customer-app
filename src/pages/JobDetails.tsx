
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import MapView from "@/components/MapView";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowLeft,
  CircleCheckIcon,
  Clock,
  MapPin,
  Phone,
  Star,
  User
} from "lucide-react";
import { toast } from "sonner";
import { getServiceIcon, getServiceTitle } from "@/utils/serviceTypeUtils";
import { getStatusColor, getStatusText, isHelperAssigned, isHelperEnRoute, isHelperArrived, isJobCompleted } from "@/utils/statusUtils";

const JobDetails: React.FC = () => {
  const navigate = useNavigate();
  const { jobId } = useParams<{ jobId: string }>();
  const { currentRequest, requestHistory } = useApp();
  
  // Find the job in current request or history
  const job = currentRequest?.id === jobId 
    ? currentRequest 
    : requestHistory.find((j) => j.id === jobId);
  
  if (!job) {
    return (
      <div className="min-h-screen bg-background flex flex-col justify-center items-center p-4">
        <h1 className="text-xl font-bold mb-4">Request Not Found</h1>
        <Button onClick={() => navigate("/")}>Return Home</Button>
      </div>
    );
  }
  
  const handleContactHelper = () => {
    toast.success("Contacting your helper...");
    // Future: Implement actual contact functionality
  };
  
  const handleCancelRequest = () => {
    toast.success("Request cancelled");
    navigate("/");
  };
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="flex items-center gap-3 p-4 border-b">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate(-1)}
        >
          <ArrowLeft />
        </Button>
        <h1 className="text-lg font-bold">Request Details</h1>
      </header>
      
      <main className="flex-1 p-4 flex flex-col gap-5">
        {/* Status Card */}
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className={`h-3 w-3 rounded-full ${getStatusColor(job.status)}`}></div>
            <span className="font-medium">{getStatusText(job.status)}</span>
          </div>
        </Card>
        
        {/* Map */}
        <MapView height="h-[200px]" showJobLocation={true} />
        
        {/* Service Details */}
        <div>
          <h2 className="font-bold mb-2">Service Details</h2>
          <Card className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-accent rounded-md">
                {getServiceIcon(job.serviceType)}
              </div>
              <div className="flex-1">
                <h3 className="font-bold">{getServiceTitle(job.serviceType)}</h3>
              </div>
              <div className="font-bold text-primary">${job.price}</div>
            </div>
            
            <div className="flex items-center gap-2 mb-3 text-sm">
              <MapPin size={14} className="text-muted-foreground" />
              <span className="text-muted-foreground">
                {job.customerLocation.address || "Your Location"}
              </span>
            </div>
            
            <div className="flex items-center gap-2 mb-3 text-sm">
              <Clock size={14} className="text-muted-foreground" />
              <span className="text-muted-foreground">
                {job.estimatedArrival 
                  ? `ETA: ${new Date(job.estimatedArrival).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`
                  : "Arrival time will be updated soon"}
              </span>
            </div>
            
            <div className="p-3 bg-secondary/50 rounded-md">
              <p className="text-sm">{job.description}</p>
            </div>
          </Card>
        </div>
        
        {/* Helper Details - Only show if helper is assigned */}
        {(job.driverName || job.status !== "requested") && (
          <div>
            <h2 className="font-bold mb-2">Your Helper</h2>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center">
                  <User className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold">{job.driverName || "Helper Assigned"}</h3>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                    <span className="text-xs">4.9</span>
                  </div>
                </div>
                <Button variant="outline" size="icon" onClick={handleContactHelper}>
                  <Phone size={16} />
                </Button>
              </div>
            </Card>
          </div>
        )}
        
        {/* Progress Timeline */}
        {job.status !== "cancelled" && (
          <div>
            <h2 className="font-bold mb-2">Progress</h2>
            <div className="relative pl-6 border-l-2 border-dashed border-muted space-y-4">
              {/* Requested */}
              <div className="relative">
                <div className="absolute -left-[1.65rem] h-6 w-6 rounded-full bg-green-500 flex items-center justify-center">
                  <CircleCheckIcon className="h-4 w-4 text-white" />
                </div>
                <p className="font-medium">Service Requested</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(job.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </p>
              </div>
              
              {/* Helper Found */}
              <div className="relative">
                <div className={`absolute -left-[1.65rem] h-6 w-6 rounded-full flex items-center justify-center ${
                  isHelperAssigned(job.status) ? "bg-green-500" : "bg-secondary border border-muted"
                }`}>
                  {isHelperAssigned(job.status) && (
                    <CircleCheckIcon className="h-4 w-4 text-white" />
                  )}
                </div>
                <p className={`font-medium ${!isHelperAssigned(job.status) ? "text-muted-foreground" : ""}`}>
                  Helper Found
                </p>
                {job.acceptedAt && (
                  <p className="text-xs text-muted-foreground">
                    {new Date(job.acceptedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </p>
                )}
              </div>
              
              {/* En Route */}
              <div className="relative">
                <div className={`absolute -left-[1.65rem] h-6 w-6 rounded-full flex items-center justify-center ${
                  isHelperEnRoute(job.status) ? "bg-green-500" : "bg-secondary border border-muted"
                }`}>
                  {isHelperEnRoute(job.status) && (
                    <CircleCheckIcon className="h-4 w-4 text-white" />
                  )}
                </div>
                <p className={`font-medium ${!isHelperEnRoute(job.status) ? "text-muted-foreground" : ""}`}>
                  Helper En Route
                </p>
              </div>

              {/* Arrived */}
              <div className="relative">
                <div className={`absolute -left-[1.65rem] h-6 w-6 rounded-full flex items-center justify-center ${
                  isHelperArrived(job.status) ? "bg-green-500" : "bg-secondary border border-muted"
                }`}>
                  {isHelperArrived(job.status) && (
                    <CircleCheckIcon className="h-4 w-4 text-white" />
                  )}
                </div>
                <p className={`font-medium ${!isHelperArrived(job.status) ? "text-muted-foreground" : ""}`}>
                  Helper Arrived
                </p>
              </div>

              {/* Completed */}
              <div className="relative">
                <div className={`absolute -left-[1.65rem] h-6 w-6 rounded-full flex items-center justify-center ${
                  isJobCompleted(job.status) ? "bg-green-500" : "bg-secondary border border-muted"
                }`}>
                  {isJobCompleted(job.status) && (
                    <CircleCheckIcon className="h-4 w-4 text-white" />
                  )}
                </div>
                <p className={`font-medium ${!isJobCompleted(job.status) ? "text-muted-foreground" : ""}`}>
                  Service Completed
                </p>
                {job.completedAt && (
                  <p className="text-xs text-muted-foreground">
                    {new Date(job.completedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* Actions */}
        <div className="mt-auto space-y-2">
          {job.status === "completed" ? (
            <Button className="w-full" onClick={() => navigate("/")}>
              Back to Home
            </Button>
          ) : (
            <>
              <Button className="w-full" onClick={handleContactHelper}>
                Contact Helper
              </Button>
              <Button variant="outline" className="w-full" onClick={handleCancelRequest}>
                Cancel Request
              </Button>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default JobDetails;
