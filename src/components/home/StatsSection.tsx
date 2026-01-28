import { MapPin, Home, Star, Clock, Building, Infinity as InfinityIcon } from "lucide-react";

const stats = [
  {
    icon: MapPin,
    value: "12",
    label: "Number of Territories",
  },
  {
    icon: Home,
    value: "1,000+",
    label: "Customers Served",
  },
  {
    icon: Building,
    value: "Texas",
    label: "Proudly Serving",
  },
  {
    icon: Star,
    value: "700+",
    label: "5 Star Reviews",
  },
  {
    icon: Clock,
    value: "24/7",
    label: "Inspections Availability",
  },
  {
    icon: InfinityIcon,
    value: "Endless",
    label: "The Possibilities",
  },
];

export function StatsSection() {
  return (
    <section className="py-16 bg-primary">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center animate-count-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/20 mb-4">
                <stat.icon className="h-6 w-6 text-accent" />
              </div>
              <p className="text-2xl md:text-3xl font-bold text-primary-foreground">
                {stat.value}
              </p>
              <p className="text-sm text-primary-foreground/70 mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
