import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

interface Speaker {
  id: string;
  name: string;
  expertise: string;
  company: string;
  bio: string;
  photo_url: string | null;
}

const Speakers = () => {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("speakers").select("*").then(({ data }) => {
      setSpeakers(data || []);
      setLoading(false);
    });
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-12 px-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground mb-2">Speakers</h1>
        <p className="text-muted-foreground mb-10">Discover experienced speakers for your events and community meetups.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-card rounded-xl p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <Skeleton className="w-12 h-12 rounded-full" />
                  <div className="space-y-2"><Skeleton className="h-4 w-24" /><Skeleton className="h-3 w-16" /></div>
                </div>
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-12 w-full" />
              </div>
            ))
          : speakers.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="bg-card rounded-xl shadow-card hover:shadow-card-hover transition-all duration-200 p-6"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-semibold text-sm">
                    {s.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <h3 className="text-foreground font-semibold text-sm">{s.name}</h3>
                    <p className="text-muted-foreground text-xs">{s.company}</p>
                  </div>
                </div>
                <span className="inline-block bg-accent text-accent-foreground px-2 py-0.5 rounded text-xs font-medium mb-3">
                  {s.expertise}
                </span>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">{s.bio}</p>
                <button className="w-full py-2 bg-foreground text-background rounded-lg text-sm font-medium transition-colors hover:opacity-90">
                  Send Message
                </button>
              </motion.div>
            ))}
      </div>
    </div>
  );
};

export default Speakers;
