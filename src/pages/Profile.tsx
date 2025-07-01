
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  Mail, 
  Phone, 
  Car, 
  CreditCard, 
  Users, 
  Bell, 
  Shield,
  Edit,
  Plus,
  Trash2,
  Star,
  Clock,
  Activity
} from "lucide-react";
import VehicleHealthCard from "@/components/VehicleHealthCard";

export default function Profile() {
  const { customer, requestHistory } = useApp();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: customer?.name || "",
    email: customer?.email || "",
    phone: customer?.phone || ""
  });

  const [vehicles, setVehicles] = useState([
    { id: "1", year: "2020", make: "Honda", model: "Civic", color: "Blue", license: "ABC123" },
    { id: "2", year: "2018", make: "Toyota", model: "Camry", color: "Silver", license: "XYZ789" }
  ]);

  const [emergencyContacts, setEmergencyContacts] = useState([
    { id: "1", name: "Jane Doe", phone: "+1234567891", relationship: "Spouse" },
    { id: "2", name: "Bob Smith", phone: "+1234567892", relationship: "Brother" }
  ]);

  const [paymentMethods] = useState([
    { id: "1", type: "card", last4: "4242", brand: "Visa", isDefault: true },
    { id: "2", type: "card", last4: "8888", brand: "Mastercard", isDefault: false }
  ]);

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
      description: "Vehicle has been removed from your profile."
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-40">
        <div className="container max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">My Profile</h1>
            <Button variant="outline" onClick={() => navigate("/")}>
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      <div className="container max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Stats Dashboard */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="font-bold text-lg">{customer?.rating || 4.8}</span>
            </div>
            <p className="text-sm text-muted-foreground">Your Rating</p>
          </Card>
          
          <Card className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock className="h-5 w-5 text-primary" />
              <span className="font-bold text-lg">{requestHistory.length}</span>
            </div>
            <p className="text-sm text-muted-foreground">Services Used</p>
          </Card>
        </div>

        {/* Vehicle Health */}
        <VehicleHealthCard />

        {/* Personal Information */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <User className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Personal Information</h2>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
            >
              <Edit className="h-4 w-4 mr-2" />
              {isEditing ? "Save Changes" : "Edit Profile"}
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  disabled={!isEditing}
                  className="pl-10"
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  disabled={!isEditing}
                  className="pl-10"
                />
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            <div>
              <Label>Member Since</Label>
              <div className="text-sm text-muted-foreground mt-2">January 2024</div>
            </div>
          </div>
        </Card>

        {/* Recent Activity */}
        {requestHistory.length > 0 && (
          <Card className="p-6">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activity
            </h3>
            <div className="space-y-3">
              {requestHistory.slice(-5).reverse().map((request) => (
                <div key={request.id} className="flex justify-between items-center p-3 bg-secondary/30 rounded-md">
                  <div>
                    <p className="font-medium capitalize">
                      {request.serviceType.replace('_', ' ')} Service
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(request.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge 
                      variant={request.status === 'completed' ? 'default' : 'secondary'}
                    >
                      {request.status}
                    </Badge>
                    <p className="text-sm font-medium mt-1">${request.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Vehicles */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Car className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">My Vehicles</h2>
            </div>
            <Button variant="outline" size="sm" onClick={handleAddVehicle}>
              <Plus className="h-4 w-4 mr-2" />
              Add Vehicle
            </Button>
          </div>

          <div className="space-y-4">
            {vehicles.map((vehicle) => (
              <div key={vehicle.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">{vehicle.year} {vehicle.make} {vehicle.model}</h3>
                  <p className="text-sm text-muted-foreground">
                    {vehicle.color} • License: {vehicle.license}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRemoveVehicle(vehicle.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
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
            {emergencyContacts.map((contact) => (
              <div key={contact.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">{contact.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {contact.phone} • {contact.relationship}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            ))}
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
            {paymentMethods.map((method) => (
              <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">{method.brand} •••• {method.last4}</h3>
                    {method.isDefault && (
                      <span className="text-xs text-primary font-medium">Default</span>
                    )}
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            ))}
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
  );
}
