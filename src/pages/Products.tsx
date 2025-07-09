import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import Layout from "@/components/Layout";
import { Search, Car, Wrench, Shield, Sparkles, Camera, ShoppingBag, Star, MapPin, Clock, Phone, Navigation, ChevronDown, Utensils, Fuel, Cross, Hammer, Coffee, Store } from "lucide-react";
import { useState } from "react";
export default function Products() {
  const navigate = useNavigate();
  const {
    currentLocation
  } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("5");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const categories = [{
    id: "all",
    title: "All Categories",
    icon: ShoppingBag
  }, {
    id: "automotive",
    title: "Automotive Services",
    icon: Car
  }, {
    id: "restaurants",
    title: "Restaurants & Food",
    icon: Utensils
  }, {
    id: "gas",
    title: "Gas Stations",
    icon: Fuel
  }, {
    id: "pharmacy",
    title: "Pharmacies",
    icon: Cross
  }, {
    id: "retail",
    title: "Retail Stores",
    icon: Store
  }, {
    id: "services",
    title: "Professional Services",
    icon: Hammer
  }, {
    id: "cafes",
    title: "Cafes & Coffee",
    icon: Coffee
  }];
  const productCategories = [{
    id: "insurance",
    title: "Insurance",
    icon: Shield,
    description: "Compare and get quotes from top providers",
    color: "bg-blue-500",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=200&fit=crop",
    providers: [{
      name: "State Farm",
      rating: 4.5,
      discount: "Save up to 25%",
      distance: "0.8 miles",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=150&fit=crop",
      phone: "(555) 123-4567",
      address: "123 Main St"
    }, {
      name: "Geico",
      rating: 4.3,
      discount: "15% off first policy",
      distance: "1.2 miles",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=150&fit=crop",
      phone: "(555) 234-5678",
      address: "456 Oak Ave"
    }, {
      name: "Progressive",
      rating: 4.4,
      discount: "Bundle & save",
      distance: "2.1 miles",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=150&fit=crop",
      phone: "(555) 345-6789",
      address: "789 Pine St"
    }]
  }, {
    id: "carwash",
    title: "Car Wash & Detailing",
    icon: Sparkles,
    description: "Mobile car wash and local services",
    color: "bg-green-500",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=200&fit=crop",
    services: [{
      name: "Shine Mobile Wash",
      price: "$25-45",
      rating: 4.6,
      time: "30-45 min",
      distance: "0.3 miles",
      image: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=300&h=150&fit=crop",
      phone: "(555) 111-2222",
      address: "Mobile Service"
    }, {
      name: "Premium Auto Spa",
      price: "$80-150",
      rating: 4.8,
      time: "2-3 hours",
      distance: "1.5 miles",
      image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=300&h=150&fit=crop",
      phone: "(555) 222-3333",
      address: "321 Wash Blvd"
    }]
  }, {
    id: "mechanics",
    title: "Mechanics & Service",
    icon: Wrench,
    description: "Trusted local mechanics and service centers",
    color: "bg-orange-500",
    image: "https://images.unsplash.com/photo-1486754735734-325b5831c3ad?w=400&h=200&fit=crop",
    services: [{
      name: "Quick Lube Express",
      price: "$30-60",
      rating: 4.4,
      time: "20-30 min",
      distance: "0.7 miles",
      image: "https://images.unsplash.com/photo-1632823469102-10ad1bbd6e38?w=300&h=150&fit=crop",
      phone: "(555) 333-4444",
      address: "555 Service Rd"
    }, {
      name: "Master Mechanics",
      price: "$150-300",
      rating: 4.6,
      time: "1-2 hours",
      distance: "2.3 miles",
      image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=300&h=150&fit=crop",
      phone: "(555) 444-5555",
      address: "777 Repair Ave"
    }]
  }, {
    id: "accessories",
    title: "Auto Accessories",
    icon: ShoppingBag,
    description: "Essential car accessories and emergency kits",
    color: "bg-purple-500",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=200&fit=crop",
    products: [{
      name: "Emergency Road Kit",
      price: "$45-80",
      rating: 4.6,
      popular: true,
      distance: "1.1 miles",
      image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=300&h=150&fit=crop",
      store: "AutoZone",
      address: "888 Parts Way"
    }, {
      name: "Heavy Duty Jumper Cables",
      price: "$25-50",
      rating: 4.5,
      popular: true,
      distance: "0.9 miles",
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=150&fit=crop",
      store: "O'Reilly Auto Parts",
      address: "999 Auto St"
    }]
  }, {
    id: "protection",
    title: "Vehicle Protection",
    icon: Camera,
    description: "Security systems and protection services",
    color: "bg-red-500",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=200&fit=crop",
    services: [{
      name: "ProTech Security",
      price: "$150-300",
      rating: 4.8,
      warranty: "2 years",
      distance: "1.8 miles",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=300&h=150&fit=crop",
      phone: "(555) 555-6666",
      address: "111 Security Blvd"
    }]
  }, {
    id: "restaurants",
    title: "Restaurants & Food",
    icon: Utensils,
    description: "Local restaurants and food delivery",
    color: "bg-red-500",
    image: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=400&h=200&fit=crop",
    businesses: [{
      name: "Tony's Italian Bistro",
      rating: 4.6,
      cuisine: "Italian",
      distance: "0.5 miles",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=150&fit=crop",
      phone: "(555) 111-1111",
      address: "456 Food St"
    }, {
      name: "Dragon Palace Chinese",
      rating: 4.4,
      cuisine: "Chinese",
      distance: "0.7 miles",
      image: "https://images.unsplash.com/photo-1576867757603-05b134ebc379?w=300&h=150&fit=crop",
      phone: "(555) 222-2222",
      address: "789 Taste Ave"
    }]
  }, {
    id: "gas",
    title: "Gas Stations",
    icon: Fuel,
    description: "Nearby gas stations and fuel prices",
    color: "bg-yellow-500",
    image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=400&h=200&fit=crop",
    stations: [{
      name: "Shell Station",
      price: "$3.45/gal",
      rating: 4.2,
      distance: "0.3 miles",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=150&fit=crop",
      phone: "(555) 333-3333",
      address: "123 Gas Rd"
    }]
  }, {
    id: "pharmacy",
    title: "Pharmacies",
    icon: Cross,
    description: "Local pharmacies and health services",
    color: "bg-green-600",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=200&fit=crop",
    businesses: [{
      name: "CVS Pharmacy",
      rating: 4.3,
      services: "Pharmacy, Health",
      distance: "0.4 miles",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=300&h=150&fit=crop",
      phone: "(555) 444-4444",
      address: "321 Health Ave"
    }]
  }];
  const filteredCategories = selectedCategory === "all" ? productCategories : productCategories.filter(cat => cat.id === selectedCategory);
  return <Layout>
      <div className="min-h-screen bg-background">
        {/* Header with Orange Theme and Dropdown */}
        <header className="border-b bg-primary text-primary-foreground sticky top-0 z-40">
          
        </header>

        <div className="container max-w-7xl mx-auto px-4 py-8">
          <div className="space-y-8">
            {filteredCategories.map(category => <Card key={category.id} className="overflow-hidden">
                {/* Category Header with Image */}
                <div className="relative h-24 bg-gradient-to-r from-gray-900 to-gray-700">
                  <img src={category.image} alt={category.title} className="w-full h-full object-cover opacity-50" />
                  
                </div>

                <div className="p-4">
                  {/* Insurance Providers */}
                  {category.id === "insurance" && <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {category.providers?.map(provider => <Card key={provider.name} className="overflow-hidden hover:shadow-lg transition-shadow">
                          <img src={provider.image} alt={provider.name} className="w-full h-32 object-cover" />
                          <div className="p-4">
                            <div className="flex items-center justify-between mb-3">
                              <h3 className="font-semibold">{provider.name}</h3>
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                <span className="text-sm font-medium">{provider.rating}</span>
                              </div>
                            </div>
                            <Badge variant="secondary" className="mb-3">{provider.discount}</Badge>
                            <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                <span>{provider.distance}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Phone className="h-3 w-3" />
                                <span>{provider.phone}</span>
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground mb-3">{provider.address}</p>
                            <Button size="sm" className="w-full">Get Quote</Button>
                          </div>
                        </Card>)}
                    </div>}

                  {/* Services (Car Wash, Mechanics, Protection) */}
                  {category.services && <div className="grid md:grid-cols-2 gap-6">
                      {category.services.map(service => <Card key={service.name} className="overflow-hidden hover:shadow-lg transition-shadow">
                          <img src={service.image} alt={service.name} className="w-full h-32 object-cover" />
                          <div className="p-4">
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
                              {service.time && <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  <span>{service.time}</span>
                                </div>}
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                <span>{service.distance}</span>
                              </div>
                              {service.phone && <div className="flex items-center gap-1">
                                  <Phone className="h-3 w-3" />
                                  <span>{service.phone}</span>
                                </div>}
                            </div>
                            <p className="text-xs text-muted-foreground mb-3">{service.address}</p>
                            <Button size="sm" className="w-full">Book Now</Button>
                          </div>
                        </Card>)}
                    </div>}

                  {/* Products (Accessories) */}
                  {category.products && <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {category.products.map(product => <Card key={product.name} className="overflow-hidden hover:shadow-lg transition-shadow">
                          <img src={product.image} alt={product.name} className="w-full h-32 object-cover" />
                          <div className="p-4">
                            <div className="flex justify-between items-start mb-3">
                              <h3 className="font-semibold text-sm">{product.name}</h3>
                              {product.popular && <Badge variant="default" className="text-xs">Popular</Badge>}
                            </div>
                            <p className="text-primary font-bold mb-2">{product.price}</p>
                            <div className="flex items-center gap-1 mb-3">
                              <Star className="h-3 w-3 text-yellow-500 fill-current" />
                              <span className="text-xs">{product.rating}</span>
                            </div>
                            <div className="flex items-center gap-4 mb-3 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-2 w-2" />
                                <span>{product.distance}</span>
                              </div>
                              <span>{product.store}</span>
                            </div>
                            <p className="text-xs text-muted-foreground mb-3">{product.address}</p>
                            <Button size="sm" variant="outline" className="w-full">Add to Cart</Button>
                          </div>
                        </Card>)}
                    </div>}
                  {category.id === "restaurants" && <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {category.businesses?.map(business => <Card key={business.name} className="overflow-hidden hover:shadow-lg transition-shadow">
                          <img src={business.image} alt={business.name} className="w-full h-32 object-cover" />
                          <div className="p-4">
                            <div className="flex items-center justify-between mb-3">
                              <h3 className="font-semibold">{business.name}</h3>
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                <span className="text-sm font-medium">{business.rating}</span>
                              </div>
                            </div>
                            <Badge variant="secondary" className="mb-3">{business.cuisine}</Badge>
                            <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                <span>{business.distance}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Phone className="h-3 w-3" />
                                <span>{business.phone}</span>
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground mb-3">{business.address}</p>
                            <Button size="sm" className="w-full">Order Now</Button>
                          </div>
                        </Card>)}
                    </div>}
                  {category.id === "gas" && <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {category.stations?.map(station => <Card key={station.name} className="overflow-hidden hover:shadow-lg transition-shadow">
                          <img src={station.image} alt={station.name} className="w-full h-32 object-cover" />
                          <div className="p-4">
                            <div className="flex items-center justify-between mb-3">
                              <h3 className="font-semibold">{station.name}</h3>
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                <span className="text-sm font-medium">{station.rating}</span>
                              </div>
                            </div>
                            <Badge variant="secondary" className="mb-3">{station.price}</Badge>
                            <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                <span>{station.distance}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Phone className="h-3 w-3" />
                                <span>{station.phone}</span>
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground mb-3">{station.address}</p>
                            <Button size="sm" className="w-full">Get Directions</Button>
                          </div>
                        </Card>)}
                    </div>}
                  {category.id === "pharmacy" && <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {category.businesses?.map(business => <Card key={business.name} className="overflow-hidden hover:shadow-lg transition-shadow">
                          <img src={business.image} alt={business.name} className="w-full h-32 object-cover" />
                          <div className="p-4">
                            <div className="flex items-center justify-between mb-3">
                              <h3 className="font-semibold">{business.name}</h3>
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                <span className="text-sm font-medium">{business.rating}</span>
                              </div>
                            </div>
                            <Badge variant="secondary" className="mb-3">{business.services}</Badge>
                            <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                <span>{business.distance}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Phone className="h-3 w-3" />
                                <span>{business.phone}</span>
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground mb-3">{business.address}</p>
                            <Button size="sm" className="w-full">Visit Store</Button>
                          </div>
                        </Card>)}
                    </div>}
                </div>
              </Card>)}
          </div>
        </div>
      </div>
    </Layout>;
}