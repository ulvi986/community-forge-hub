import { motion } from "framer-motion";
import { Sparkles, Bot, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const AIAssistant = () => {
  const { user } = useAuth();
  const firstName = user?.user_metadata?.first_name || "İstifadəçi";

  return (
    <div className="max-w-4xl mx-auto py-8 px-6 flex flex-col h-[calc(100vh-3.5rem)]">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-purple-500/10 flex items-center justify-center">
          <Sparkles size={20} className="text-primary" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-foreground">AI Community Builder</h1>
          <p className="text-xs text-muted-foreground">Sizin community köməkçiniz</p>
        </div>
      </div>

      <div className="flex-1 overflow-auto space-y-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex gap-3 max-w-[85%]"
        >
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0 mt-1">
            <Bot size={16} className="text-primary-foreground" />
          </div>
          <div className="bg-secondary rounded-2xl rounded-tl-md px-4 py-3">
            <p className="text-sm text-foreground leading-relaxed">
              Salam, <span className="font-semibold">{firstName}</span>! 👋
            </p>
            <p className="text-sm text-foreground leading-relaxed mt-2">
              Mən sizin Community AI Assistentinizəm. Sizə necə kömək edə bilərəm? 
              Community qurmaq, spikerlər tapmaq, mentorlarla əlaqə yaratmaq və ya tədbirlərinizi 
              planlaşdırmaq kimi məsələlərdə sizə yardımçı ola bilərəm.
            </p>
            <p className="text-sm text-foreground leading-relaxed mt-2">
              Hazırda mən hələ öyrənmə mərhələsindəyəm. Tezliklə API qoşulacaq və tam funksional olacağam! 🚀
            </p>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        className="flex gap-2"
      >
        <Input
          placeholder="Mesajınızı yazın..."
          className="flex-1"
          disabled
        />
        <Button disabled size="icon">
          <Send size={16} />
        </Button>
      </motion.div>
      <p className="text-[11px] text-muted-foreground text-center mt-2">
        AI Assistant tezliklə aktiv olacaq. API qoşulduqdan sonra tam işləyəcək.
      </p>
    </div>
  );
};

export default AIAssistant;
