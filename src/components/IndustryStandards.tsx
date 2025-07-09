
export default function IndustryStandards() {
  return (
    <section className="py-8 bg-secondary/30">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Industry Standards & Certifications</h2>
          <p className="text-muted-foreground">
            All our service providers are certified and follow strict industry standards for your safety and peace of mind.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-primary font-bold text-xl">24/7</span>
            </div>
            <h3 className="font-semibold mb-2">Available Around the Clock</h3>
            <p className="text-sm text-muted-foreground">Emergency roadside assistance available 24 hours a day, 7 days a week.</p>
          </div>
          
          <div className="text-center p-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-primary font-bold text-xl">✓</span>
            </div>
            <h3 className="font-semibold mb-2">Licensed & Insured</h3>
            <p className="text-sm text-muted-foreground">All service providers are fully licensed, insured, and background checked.</p>
          </div>
          
          <div className="text-center p-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-primary font-bold text-xl">⚡</span>
            </div>
            <h3 className="font-semibold mb-2">Fast Response Time</h3>
            <p className="text-sm text-muted-foreground">Average response time under 30 minutes in most service areas.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
