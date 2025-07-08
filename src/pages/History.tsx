
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { 
  History as HistoryIcon, 
  Search, 
  Star, 
  Calendar, 
  MapPin, 
  Receipt, 
  RotateCcw,
  Download,
  Filter
} from "lucide-react";
import { useState } from "react";

export default function History() {
  const navigate = useNavigate();
  const { requestHistory } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredHistory = requestHistory.filter((request) => {
    const matchesSearch = request.serviceType.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         request.customerLocation.address?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "all" || request.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-500";
      case "cancelled": return "bg-red-500";
      case "in_progress": return "bg-blue-500";
      default: return "bg-gray-500";
    }
  };

  const formatServiceType = (type: string) => {
    return type.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const totalSpent = requestHistory
    .filter(r => r.status === 'completed')
    .reduce((sum, r) => sum + (r.price || 0), 0);

  const totalServices = requestHistory.filter(r => r.status === 'completed').length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-40">
        <div className="container max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <HistoryIcon className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold">Service History</h1>
            </div>
            <Button variant="outline" onClick={() => navigate("/")}>
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      <div className="container max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">{totalServices}</div>
            <p className="text-muted-foreground">Services Completed</p>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">${totalSpent}</div>
            <p className="text-muted-foreground">Total Spent</p>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {requestHistory.length > 0 && totalServices > 0 ? (totalSpent / totalServices).toFixed(0) : 0}
            </div>
            <p className="text-muted-foreground">Avg. Service Cost</p>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search services, locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button 
                variant={filterStatus === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("all")}
              >
                All
              </Button>
              <Button 
                variant={filterStatus === "completed" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("completed")}
              >
                Completed
              </Button>
              <Button 
                variant={filterStatus === "cancelled" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("cancelled")}
              >
                Cancelled
              </Button>
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </Card>

        {/* Service History List */}
        <div className="space-y-4">
          {filteredHistory.length === 0 ? (
            <Card className="p-12 text-center">
              <HistoryIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No service history found</h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery ? "Try adjusting your search terms" : "Request your first service to see history here"}
              </p>
              <Button onClick={() => navigate("/services")}>
                Browse Services
              </Button>
            </Card>
          ) : (
            filteredHistory.map((request) => (
              <Card key={request.id} className="p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">
                        {formatServiceType(request.serviceType)}
                      </h3>
                      <Badge 
                        className={`${getStatusColor(request.status)} text-white`}
                      >
                        {request.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(request.createdAt).toLocaleDateString()}</span>
                      </div>
                      {request.customerLocation.address && (
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{request.customerLocation.address}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Receipt className="h-4 w-4" />
                        <span className="font-semibold text-primary">${request.price || 0}</span>
                      </div>
                    </div>

                    {request.status === 'completed' && request.rating && (
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star} 
                              className={`h-4 w-4 ${
                                star <= (request.rating || 0) 
                                  ? 'text-yellow-500 fill-current' 
                                  : 'text-gray-300'
                              }`} 
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          Rated {request.rating || 'Not rated'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 flex-wrap">
                  {request.status === 'completed' && (
                    <>
                      <Button variant="outline" size="sm">
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Book Again
                      </Button>
                      <Button variant="outline" size="sm">
                        <Receipt className="h-4 w-4 mr-2" />
                        View Receipt
                      </Button>
                      {!request.rating && (
                        <Button variant="outline" size="sm">
                          <Star className="h-4 w-4 mr-2" />
                          Rate Service
                        </Button>
                      )}
                    </>
                  )}
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
