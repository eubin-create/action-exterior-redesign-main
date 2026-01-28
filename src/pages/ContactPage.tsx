import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { useState } from "react";
import { toast } from "sonner";

const services = [
  "Roof Replacement",
  "Roof Repair",
  "Metal Roofing",
  "Emergency Repair",
  "Siding",
  "Windows",
  "Gutters",
];

const timeSlots = [
  "8:00 AM - 10:00 AM",
  "10:00 AM - 12:00 PM",
  "12:00 PM - 2:00 PM",
  "2:00 PM - 4:00 PM",
  "4:00 PM - 6:00 PM",
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Thank you! We'll be in touch within 24 hours.");
    }, 1500);
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-20 bg-hero-gradient">
        <div className="container">
          <div className="max-w-3xl">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
              Get A Free Inspection
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mt-2 mb-6">
              Book Now
            </h1>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              Get a FREE Estimate • All Services Come With a 3 Year Warranty
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Ready to Start Your Project?
              </h2>
              <p className="text-muted-foreground mb-8">
                Let's make your vision a reality. Fill out the form below and
                we'll get back to you within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      required
                      className="bg-white border-primary/20 focus:border-accent"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      required
                      className="bg-white border-primary/20 focus:border-accent"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      required
                      className="bg-white border-primary/20 focus:border-accent"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      required
                      className="bg-white border-primary/20 focus:border-accent"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address *</Label>
                  <Input
                    id="address"
                    placeholder="123 Main Street"
                    required
                    className="bg-secondary border-border"
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      placeholder="Austin"
                      className="bg-white border-primary/20 focus:border-accent"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Select>
                      <SelectTrigger className="bg-secondary border-border">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="TX">Texas</SelectItem>
                        <SelectItem value="OK">Oklahoma</SelectItem>
                        <SelectItem value="LA">Louisiana</SelectItem>
                        <SelectItem value="AR">Arkansas</SelectItem>
                        <SelectItem value="NM">New Mexico</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip">Zip Code</Label>
                    <Input
                      id="zip"
                      placeholder="78701"
                      className="bg-white border-primary/20 focus:border-accent"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Best Day for Estimate *</Label>
                    <Input
                      type="date"
                      required
                      className="bg-white border-primary/20 focus:border-accent"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Best Time of Day *</Label>
                    <Select>
                      <SelectTrigger className="bg-secondary border-border">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((slot) => (
                          <SelectItem key={slot} value={slot}>
                            {slot}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Services Interested In</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                    {services.map((service) => (
                      <div key={service} className="flex items-center gap-2">
                        <Checkbox id={service} />
                        <Label
                          htmlFor={service}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {service}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Additional Details</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us more about your project..."
                    className="bg-secondary border-border min-h-[120px]"
                  />
                </div>

                <div className="flex items-start gap-2">
                  <Checkbox id="consent" required />
                  <Label htmlFor="consent" className="text-sm font-normal">
                    I agree to receive information text messages about my
                    estimate and project.
                  </Label>
                </div>

                <Button
                  type="submit"
                  variant="cta"
                  size="xl"
                  disabled={isSubmitting}
                  className="w-full md:w-auto"
                >
                  {isSubmitting ? "Submitting..." : "Submit Request"}
                </Button>
              </form>
            </div>

            {/* Contact Info Sidebar */}
            <div className="space-y-8">
              <div className="bg-primary text-primary-foreground rounded-lg p-8">
                <h3 className="text-xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Phone className="h-6 w-6 text-accent shrink-0" />
                    <div>
                      <p className="font-semibold">Phone</p>
                      <a
                        href="tel:+15551234567"
                        className="text-primary-foreground/80 hover:text-accent"
                      >
                        (555) 123-4567
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="h-6 w-6 text-accent shrink-0" />
                    <div>
                      <p className="font-semibold">Email</p>
                      <a
                        href="mailto:info@cowboyroofing.com"
                        className="text-primary-foreground/80 hover:text-accent"
                      >
                        info@cowboyroofing.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-accent shrink-0" />
                    <div>
                      <p className="font-semibold">Address</p>
                      <p className="text-primary-foreground/80">
                        123 Main Street
                        <br />
                        Austin, TX 78701
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Clock className="h-6 w-6 text-accent shrink-0" />
                    <div>
                      <p className="font-semibold">Hours</p>
                      <p className="text-primary-foreground/80">
                        Mon-Fri: 8AM - 6PM
                        <br />
                        Sat: 9AM - 2PM
                        <br />
                        Emergency: 24/7
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-secondary rounded-lg p-8">
                <h3 className="text-xl font-bold text-foreground mb-4">
                  Services We Offer
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <span className="w-2 h-2 bg-accent rounded-full" />
                    Residential Exterior Services
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <span className="w-2 h-2 bg-accent rounded-full" />
                    Commercial Exterior Services
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <span className="w-2 h-2 bg-accent rounded-full" />
                    Roof Replacement & Repair
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <span className="w-2 h-2 bg-accent rounded-full" />
                    Metal Roofing
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <span className="w-2 h-2 bg-accent rounded-full" />
                    Storm & Emergency Repair
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <span className="w-2 h-2 bg-accent rounded-full" />
                    Siding & Windows
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <span className="w-2 h-2 bg-accent rounded-full" />
                    Gutter Services
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TestimonialsSection />
    </Layout>
  );
}
