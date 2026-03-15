import { motion } from "framer-motion";
import { Coffee, UtensilsCrossed, Sandwich } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

const iconMap: Record<string, React.ElementType> = { Coffee, UtensilsCrossed, Sandwich };

interface CateringCompany {
  id: string;
  name: string;
  type: string;
  location: string;
  icon: string;
}

const Catering = () => {
  const [companies, setCompanies] = useState<CateringCompany[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("catering_companies").select("*").then(({ data }) => {
      setCompanies(data || []);
      setLoading(false);
    });
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-12 px-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground mb-2">Catering Companies</h1>
        <p className="text-muted-foreground mb-10">Find catering services for meetups, hackathons, and community events.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-card rounded-xl p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <Skeleton className="w-12 h-12 rounded-xl" />
                  <div className="space-y-2"><Skeleton className="h-4 w-24" /><Skeleton className="h-3 w-16" /></div>
                </div>
                <Skeleton className="h-4 w-32" />
              </div>
            ))
          : companies.map((c, i) => {
              const Icon = iconMap[c.icon] || Coffee;
              return (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="bg-card rounded-xl shadow-card hover:shadow-card-hover transition-all duration-200 p-6"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center text-accent-foreground">
                      <Icon size={22} />
                    </div>
                    <div>
                      <h3 className="text-foreground font-semibold text-sm">{c.name}</h3>
                      <p className="text-muted-foreground text-xs">{c.location}</p>
                    </div>
                  </div>
                  <span className="inline-block bg-accent text-accent-foreground px-2 py-0.5 rounded text-xs font-medium mb-5">
                    {c.type}
                  </span>
                  <button className="w-full py-2 bg-foreground text-background rounded-lg text-sm font-medium transition-colors hover:opacity-90">
                    Contact
                  </button>
                </motion.div>
              );
            })}
      </div>
    </div>
  );
};

export default Catering;
