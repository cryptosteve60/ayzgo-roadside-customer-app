import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { useToast } from "@/hooks/use-toast";
import { useVehicleHealth } from "@/hooks/useVehicleHealth";
import Layout from "@/components/Layout";
import { User, Mail, Phone, Car, CreditCard, Users, Bell, Shield, Edit, Plus, Trash2, Star, Clock, Activity, AlertTriangle, CheckCircle, Camera, FileText, Wrench, Calendar, MapPin, History as HistoryIcon, Receipt } from "lucide-react";

export default function Profile() {
  const {
    customer,
    requestHistory
  } = useApp();
  const {
    vehicles: vehicleHealthData,
    getOverdueItems,
    getUpcomingItems
  } = useVehicleHealth();
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: customer?.name || "",
    email: customer?.email || "",
    phone: customer?.phone || ""
  });
  const [vehicles, setVehicles] = useState([{
    id: "1",
    year: "2020",
    make: "Honda",
    model: "Civic",
    color: "Blue",
    license: "ABC123",
    vin: "1HGBH41JXMN109186",
    mileage: 45000,
    photos: [],
    insurance: "State Farm",
    registrationExpiry: "2025-03-15"
  }, {
    id: "2",
    year: "2018",
    make: "Toyota",
    model: "Camry",
    color: "Silver",
    license: "XYZ789",
    vin: "4T1BF1FK5GU260429",
    mileage: 62000,
    photos: [],
    insurance: "Geico",
    registrationExpiry: "2024-11-20"
  }]);
  const [emergencyContacts, setEmergencyContacts] = useState([{
    id: "1",
    name: "Jane Doe",
    phone: "+1234567891",
    relationship: "Spouse"
  }, {
    id: "2",
    name: "Bob Smith",
    phone: "+1234567892",
    relationship: "Brother"
  }]);
  const [paymentMethods] = useState([{
    id: "1",
    type: "card",
    last4: "4242",
    brand: "Visa",
    isDefault: true
  }, {
    id: "2",
    type: "card",
    last4: "8888",
    brand: "Mastercard",
    isDefault: false
  }]);
  const overdueItems = getOverdueItems();
  const upcomingItems = getUpcomingItems();
  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully."
    });
    setIsEditing(false);
  };
  const handleAddVehicle = () => {
    toast({
      title: "Add Vehicle",
      description: "Vehicle management coming soon!"
    });
  };
  const handleRemoveVehicle = (vehicleId: string) => {
    setVehicles(vehicles.filter(v => v.id !== vehicleId));
    toast({
      title: "Vehicle Removed",
      description: "Vehicle has been removed from your garage."
    });
  };
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };
  const formatServiceType = (type: string) => {
    return type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "cancelled":
        return "bg-red-500";
      case "in_progress":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };
  return <Layout>
      <div className="min-h-screen bg-background">
        {/* Header with Orange Theme */}
        <header className="border-b bg-primary text-primary-foreground sticky top-0 z-40">
          
        </header>

        <div className="container max-w-4xl mx-auto px-4 py-8 space-y-8">
          {/* Personal Information with Profile Picture */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <User className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-semibold">Personal Information</h2>
              </div>
              <Button variant="outline" size="sm" onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}>
                <Edit className="h-4 w-4 mr-2" />
                {isEditing ? "Save Changes" : "Edit Profile"}
              </Button>
            </div>

            {/* Profile Picture Section */}
            <div className="flex items-center gap-6 mb-6 pb-6 border-b">
              <div className="relative">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="" alt={formData.name} />
                  <AvatarFallback className="text-lg">
                    {getInitials(formData.name || "User")}
                  </AvatarFallback>
                </Avatar>
                <Button size="sm" variant="outline" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0" disabled={!isEditing}>
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">{formData.name || "User"}</h3>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="font-bold text-sm">{customer?.rating || 4.8}</span>
                  </div>
                </div>
                <p className="text-muted-foreground mb-2">Member since January 2024</p>
                {isEditing && <Button variant="link" size="sm" className="p-0 h-auto">
                    Change profile picture
                  </Button>}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={formData.name} onChange={e => setFormData({
                ...formData,
                name: e.target.value
              })} disabled={!isEditing} />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Input id="email" type="email" value={formData.email} onChange={e => setFormData({
                  ...formData,
                  email: e.target.value
                })} disabled={!isEditing} className="pl-10" />
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Input id="phone" type="tel" value={formData.phone} onChange={e => setFormData({
                  ...formData,
                  phone: e.target.value
                })} disabled={!isEditing} className="pl-10" />
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </div>
          </Card>

          {/* My Garage (Enhanced) */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Car className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-semibold">My Garage</h2>
              </div>
              <Button variant="outline" size="sm" onClick={handleAddVehicle}>
                <Plus className="h-4 w-4 mr-2" />
                Add Vehicle
              </Button>
            </div>

            <div className="space-y-6">
              {vehicles.map(vehicle => {
              const healthData = vehicleHealthData.find(v => v.make === vehicle.make && v.model === vehicle.model);
              return <Card key={vehicle.id} className="p-6 border-2">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex gap-4">
                      <div className="w-16 h-16 bg-secondary rounded-lg flex items-center justify-center">
                        <Car className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{vehicle.year} {vehicle.make} {vehicle.model}</h3>
                        <p className="text-muted-foreground">{vehicle.color} • {vehicle.license}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span>{vehicle.mileage.toLocaleString()} miles</span>
                          <span>VIN: {vehicle.vin.slice(-6)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {healthData && <Badge variant={healthData.healthScore >= 80 ? "default" : "destructive"}>
                          {healthData.healthScore}% Health
                        </Badge>}
                      <Button variant="outline" size="sm" onClick={() => handleRemoveVehicle(vehicle.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Vehicle Details Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-4 bg-secondary/30 rounded-lg">
                    <div>
                      <p className="text-xs text-muted-foreground">Insurance</p>
                      <p className="font-medium">{vehicle.insurance}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Registration</p>
                      <p className="font-medium">{new Date(vehicle.registrationExpiry).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Full VIN</p>
                      <p className="font-mono text-sm">{vehicle.vin}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Photos</p>
                      <Button variant="outline" size="sm" className="mt-1">
                        <Camera className="h-3 w-3 mr-1" />
                        Add
                      </Button>
                    </div>
                  </div>

                  {/* Vehicle Health Status */}
                  {healthData && <div className="space-y-3 pt-4 border-t">
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <Activity className="h-4 w-4 text-primary" />
                        Vehicle Health & Maintenance
                      </div>
                      
                      {overdueItems.length > 0 && <div className="space-y-2">
                          <div className="flex items-center gap-1">
                            <AlertTriangle className="h-4 w-4 text-red-500" />
                            <span className="text-sm font-medium text-red-600">Overdue Maintenance</span>
                          </div>
                          {overdueItems.slice(0, 2).map(item => <div key={item.id} className="text-xs bg-red-50 p-2 rounded border-l-2 border-red-500">
                              {item.name} - ${item.cost}
                            </div>)}
                        </div>}

                      {upcomingItems.length > 0 && <div className="space-y-2">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm font-medium text-yellow-600">Coming Up</span>
                          </div>
                          {upcomingItems.slice(0, 2).map(item => <div key={item.id} className="text-xs bg-yellow-50 p-2 rounded border-l-2 border-yellow-500">
                              {item.name} - ${item.cost}
                            </div>)}
                        </div>}

                      <div className="flex gap-2 flex-wrap">
                        <Button variant="outline" size="sm">
                          <Calendar className="h-4 w-4 mr-2" />
                          Schedule Service
                        </Button>
                        <Button variant="outline" size="sm">
                          <MapPin className="h-4 w-4 mr-2" />
                          Find Nearby
                        </Button>
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-2" />
                          Full Report
                        </Button>
                      </div>
                    </div>}
                </Card>;
            })}
            </div>
          </Card>

          {/* Service History Section */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <HistoryIcon className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-semibold">Service History</h2>
              </div>
              <Button variant="outline" size="sm" onClick={() => navigate("/history")}>
                View All History
              </Button>
            </div>

            <div className="space-y-4">
              {requestHistory.length === 0 ? <div className="text-center py-8">
                  <HistoryIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No service history</h3>
                  <p className="text-muted-foreground mb-4">Request your first service to see history here</p>
                  <Button onClick={() => navigate("/services")}>Browse Services</Button>
                </div> : requestHistory.slice(-3).reverse().map(request => <Card key={request.id} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">
                          {formatServiceType(request.serviceType)}
                        </h3>
                        <Badge className={`${getStatusColor(request.status)} text-white`}>
                          {request.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground mb-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(request.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Receipt className="h-3 w-3" />
                          <span className="font-semibold text-primary">${request.price || 0}</span>
                        </div>
                      </div>

                      {request.status === 'completed' && request.rating && <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map(star => <Star key={star} className={`h-3 w-3 ${star <= (request.rating || 0) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} />)}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {request.rating}/5
                          </span>
                        </div>}
                    </div>
                  </div>
                </Card>)}
            </div>
          </Card>

          {/* Payment Methods */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <CreditCard className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-semibold">Payment Methods</h2>
              </div>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Card
              </Button>
            </div>

            <div className="space-y-4">
              {paymentMethods.map(method => <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <h3 className="font-medium">{method.brand} •••• {method.last4}</h3>
                      {method.isDefault && <span className="text-xs text-primary font-medium">Default</span>}
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>)}
            </div>
          </Card>

          {/* Emergency Contacts */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Users className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-semibold">Emergency Contacts</h2>
              </div>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Contact
              </Button>
            </div>

            <div className="space-y-4">
              {emergencyContacts.map(contact => <div key={contact.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">{contact.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {contact.phone} • {contact.relationship}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>)}
            </div>
          </Card>

          {/* Settings */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Bell className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-semibold">Notifications</h2>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">SMS Updates</span>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Email Notifications</span>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Push Notifications</span>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-semibold">Privacy & Security</h2>
              </div>
              <div className="space-y-3">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  Change Password
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  Privacy Settings
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start text-red-600">
                  Delete Account
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>;
}
