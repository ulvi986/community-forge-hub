import { motion } from "framer-motion";
import { Globe, Code, Rocket } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

const iconMap: Record<string, React.ElementType> = { Globe, Code, Rocket };

interface Community {
  id: string;
  name: string;
  description: string;
  members: number;
  icon: string;
}

const Communities = () => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("communities").select("*").then(({ data }) => {
      setCommunities(data || []);
      setLoading(false);
    });
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-12 px-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground mb-2">Communities</h1>
        <p className="text-muted-foreground mb-10">Explore existing communities and collaborate with them.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-card rounded-xl p-6 space-y-4">
                <Skeleton className="w-10 h-10 rounded-lg" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-12 w-full" />
              </div>
            ))
          : communities.map((c, i) => {
              const Icon = iconMap[c.icon] || Globe;
              return (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="bg-card rounded-xl shadow-card hover:shadow-card-hover transition-all duration-200 p-6 relative"
                >
                  <span className="absolute top-4 right-4 text-xs font-medium text-muted-foreground tabular-nums bg-secondary px-2 py-0.5 rounded">
                    {c.members.toLocaleString()} members
                  </span>
                  <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center text-accent-foreground mb-4">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-foreground font-semibold text-sm mb-2">{c.name}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">{c.description}</p>
                  <button className="w-full py-2 bg-foreground text-background rounded-lg text-sm font-medium transition-colors hover:opacity-90">
                    View Community
                  </button>
                </motion.div>
              );
            })}
      </div>
    </div>
  );
};

export default Communities;
