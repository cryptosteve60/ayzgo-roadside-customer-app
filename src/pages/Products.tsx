
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { 
  Search, 
  Car, 
  Wrench, 
  Shield, 
  Sparkles, 
  Camera, 
  ShoppingBag,
  Star,
  MapPin,
  Clock,
  Phone
} from "lucide-react";
import { useState } from "react";

export default function Products() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const productCategories = [
    {
      id: "insurance",
      title: "Insurance",
      icon: Shield,
      description: "Compare and get quotes from top providers",
      color: "bg-blue-500",
      providers: [
        { name: "State Farm", rating: 4.5, discount: "Save up to 25%" },
        { name: "Geico", rating: 4.3, discount: "15% off first policy" },
        { name: "Progressive", rating: 4.4, discount: "Bundle & save" },
        { name: "Allstate", rating: 4.2, discount: "Good hands discount" },
        { name: "USAA", rating: 4.7, discount: "Military members" }
      ]
    },
    {
      id: "carwash",
      title: "Car Wash & Detailing",
      icon: Sparkles,
      description: "Mobile car wash and local services",
      color: "bg-green-500",
      services: [
        { name: "Mobile Car Wash", price: "$25-45", rating: 4.6, time: "30-45 min" },
        { name: "Full Detail Package", price: "$80-150", rating: 4.8, time: "2-3 hours" },
        { name: "Interior Deep Clean", price: "$40-70", rating: 4.5, time: "1-2 hours" },
        { name: "Ceramic Coating", price: "$200-400", rating: 4.7, time: "4-6 hours" }
      ]
    },
    {
      id: "mechanics",
      title: "Mechanics & Service",
      icon: Wrench,
      description: "Trusted local mechanics and service centers",
      color: "bg-orange-500",
      services: [
        { name: "Oil Change Express", price: "$30-60", rating: 4.4, time: "20-30 min" },
        { name: "Brake Service", price: "$150-300", rating: 4.6, time: "1-2 hours" },
        { name: "Engine Diagnostics", price: "$100-150", rating: 4.5, time: "30-60 min" },
        { name: "Tire Installation", price: "$80-120", rating: 4.7, time: "45-60 min" }
      ]
    },
    {
      id: "accessories",
      title: "Auto Accessories",
      icon: ShoppingBag,
      description: "Essential car accessories and emergency kits",
      color: "bg-purple-500",
      products: [
        { name: "Emergency Kit", price: "$45-80", rating: 4.6, popular: true },
        { name: "Jumper Cables", price: "$25-50", rating: 4.5, popular: true },
        { name: "Phone Mount", price: "$15-35", rating: 4.3, popular: false },
        { name: "First Aid Kit", price: "$20-40", rating: 4.7, popular: true }
      ]
    },
    {
      id: "protection",
      title: "Vehicle Protection",
      icon: Camera,
      description: "Security systems and protection services",
      color: "bg-red-500",
      services: [
        { name: "Dash Cam Installation", price: "$150-300", rating: 4.8, warranty: "2 years" },
        { name: "Car Alarm System", price: "$200-500", rating: 4.6, warranty: "3 years" },
        { name: "GPS Tracker", price: "$100-200", rating: 4.5, warranty: "1 year" },
        { name: "Window Tinting", price: "$150-400", rating: 4.7, warranty: "Lifetime" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-40">
        <div className="container max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingBag className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold">Products & Services</h1>
            </div>
            <Button variant="outline" onClick={() => navigate("/")}>
              Back to Home
            </Button>
          </div>
          
          {/* Search Bar */}
          <div className="mt-4 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products and services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </header>

      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {productCategories.map((category) => (
            <Card key={category.id} className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-3 rounded-full ${category.color} text-white`}>
                  <category.icon className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">{category.title}</h2>
                  <p className="text-muted-foreground">{category.description}</p>
                </div>
              </div>

              {/* Insurance Providers */}
              {category.id === "insurance" && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.providers?.map((provider) => (
                    <Card key={provider.name} className="p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold">{provider.name}</h3>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">{provider.rating}</span>
                        </div>
                      </div>
                      <Badge variant="secondary" className="mb-3">{provider.discount}</Badge>
                      <Button size="sm" className="w-full">Get Quote</Button>
                    </Card>
                  ))}
                </div>
              )}

              {/* Services (Car Wash, Mechanics, Protection) */}
              {(category.services) && (
                <div className="grid md:grid-cols-2 gap-4">
                  {category.services.map((service) => (
                    <Card key={service.name} className="p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold">{service.name}</h3>
                          <p className="text-primary font-bold">{service.price}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm">{service.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                        {service.time && (
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{service.time}</span>
                          </div>
                        )}
                        {service.warranty && (
                          <div className="flex items-center gap-1">
                            <Shield className="h-3 w-3" />
                            <span>{service.warranty}</span>
                          </div>
                        )}
                      </div>
                      <Button size="sm" className="w-full">Book Now</Button>
                    </Card>
                  ))}
                </div>
              )}

              {/* Products (Accessories) */}
              {category.products && (
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {category.products.map((product) => (
                    <Card key={product.name} className="p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-semibold text-sm">{product.name}</h3>
                        {product.popular && (
                          <Badge variant="default" className="text-xs">Popular</Badge>
                        )}
                      </div>
                      <p className="text-primary font-bold mb-2">{product.price}</p>
                      <div className="flex items-center gap-1 mb-3">
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        <span className="text-xs">{product.rating}</span>
                      </div>
                      <Button size="sm" variant="outline" className="w-full">Add to Cart</Button>
                    </Card>
                  ))}
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
