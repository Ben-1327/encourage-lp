import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ChevronRight, Clock, Calendar, Users, TrendingUp, ShieldCheck, HelpCircle, ArrowRight, Star, BookOpen, Target, Award, Video, School, MessageCircle, BarChart, Zap } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";

// Animation variants - Subtle & Smooth
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Stats Counter Component - Liquid Glass Style
function StatCounter({ end, suffix = "", label, delay = 0 }: { end: number; suffix?: string; label: string; delay?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    
    hasAnimated.current = true;
    const timer = setTimeout(() => {
      let startTime: number | null = null;
      const duration = 2000;

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentCount = Math.floor(end * easeOutQuart);
        
        setCount(currentCount);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };

      requestAnimationFrame(animate);
    }, delay);

    return () => clearTimeout(timer);
  }, [isInView, end, delay]);

  return (
    <div ref={ref} className="cursor-default">
      <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">
        {count}{suffix}
      </div>
      <div className="text-sm text-slate-700 font-medium">{label}</div>
    </div>
  );
}

// Hero Section Component
function HeroSection({ scrollToConsultation }: { scrollToConsultation: () => void }) {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src="/images/hero-bg.png" 
          alt="大学受験エンカレッジ" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-slate-900/75" />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 min-h-screen flex flex-col justify-center py-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mb-20"
        >
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight text-white mb-8">
            大学受験のプロが365日学習管理。<br />
            「不安」を自信に変えて、<br />
            <span className="text-yellow-400">志望校合格へ。</span>
          </h1>
          
          <Button 
            size="lg" 
            onClick={scrollToConsultation}
            className="bg-yellow-500 hover:bg-yellow-400 text-slate-900 h-16 px-10 text-xl font-bold shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300 group"
          >
            <span className="flex items-center gap-3">
              かんたん60秒 / 無料カウンセリングを予約
              <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </span>
          </Button>
        </motion.div>

        {/* Stats Overlay Band - Liquid Glass */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-5xl mx-auto w-full"
        >
          <div className="liquid-glass px-8 lg:px-12 py-8 rounded-3xl">
            {/* Internal subtle gradient for contrast */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/10 to-transparent rounded-3xl pointer-events-none" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative z-10">
              <StatCounter end={100} suffix="%" label="3年連続 大学進学率" delay={0} />
              <StatCounter end={365} label="徹底した学習管理" delay={200} />
              <StatCounter end={1} label="1日単位の学習計画" delay={400} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="flex flex-col items-center gap-2 text-white/60">
          <span className="text-xs uppercase tracking-wider">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronRight className="h-5 w-5 rotate-90" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConsultation = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    toast.success("無料カウンセリングの予約を受け付けました", {
      description: "担当者より24時間以内にご連絡いたします。",
    });
  };

  const scrollToConsultation = () => {
    document.getElementById('consultation-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background font-sans text-slate-800 selection:bg-primary/10">
      {/* Header - Glassmorphism */}
      <header className="fixed top-0 w-full z-50 glass-premium border-b border-slate-100">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">E</div>
            <span className="font-heading font-bold text-lg tracking-tight text-primary">大学受験エンカレッジ</span>
          </div>
          <Button 
            onClick={scrollToConsultation}
            className="hidden md:flex bg-primary hover:bg-primary/90 text-white shadow-sm hover:shadow-md transition-all duration-300"
          >
            無料カウンセリングを予約
          </Button>
        </div>
      </header>

      <main className="pt-16">
        {/* Hero Section - Background Image with Stats Overlay Band */}
        <HeroSection scrollToConsultation={scrollToConsultation} />

        {/* Problem → Study Planning Need Section (Vertical Story) */}
        <section className="py-24 bg-white relative overflow-hidden">
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-[0.02]">
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, #1e40af 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                大学受験の不安はありませんか？
              </h2>
              <p className="text-slate-600 text-lg">多くの受験生が同じ悩みに直面しています</p>
            </motion.div>

            {/* Vertical Story: Anxieties → Bridge → Tags → Link */}
            <div className="max-w-4xl mx-auto">
              
              {/* Step 1: Anxieties (Vertical, Center-aligned) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="space-y-6 mb-24"
              >
                {[
                  { icon: TrendingUp, text: "高校に入ってから成績が低下", color: "text-red-600", bg: "bg-red-50" },
                  { icon: HelpCircle, text: "何から手をつければ良いか分からない", color: "text-orange-600", bg: "bg-orange-50" },
                  { icon: Clock, text: "勉強が3日坊主で終わる", color: "text-amber-600", bg: "bg-amber-50" }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center justify-center gap-5"
                  >
                    <div className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center ${item.color} flex-shrink-0`}>
                      <item.icon className="h-7 w-7" />
                    </div>
                    <div className="pt-2">
                      <p className="text-lg font-medium text-slate-800 leading-relaxed text-center">{item.text}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Step 2: Bridge Copy (Study Planning Need) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                viewport={{ once: true }}
                className="relative py-12"
              >
                {/* Subtle decorative background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-blue-50/30 rounded-3xl -mx-8" />
                
                <div className="relative z-10 text-center px-8 space-y-8">
                  <p className="text-2xl lg:text-3xl font-semibold text-slate-800 leading-relaxed">
                    積み上げが重要な大学受験では、学習計画が<br className="hidden sm:block" />
                    <span className="text-primary font-bold border-b-4 border-primary/30">「継続と復習」</span>を支え、成果を安定させます。
                  </p>

                  {/* Step 3: Reassurance Tags - Frosted Glass Labels */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-4 pt-4"
                  >
                    {[
                      { text: "迷いを減らす", delay: 0 },
                      { text: "復習まで設計", delay: 0.1 },
                      { text: "毎日調整できる", delay: 0.2 }
                    ].map((tag, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 + tag.delay }}
                        viewport={{ once: true }}
                        className="bg-white/15 backdrop-blur-md border border-white/20 px-6 py-3 rounded-full text-sm font-medium text-slate-700"
                      >
                        {tag.text}
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Step 4: Link Label (Non-button) */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    viewport={{ once: true }}
                    className="flex items-center justify-center gap-2 text-slate-600 pt-4"
                  >
                    <ArrowRight className="h-4 w-4 text-primary" />
                    <span className="text-base font-medium">その計画を「続く形」に整える仕組みがあります</span>
                  </motion.div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* Solution + Success Stories (Story Strip Format) */}
        <section className="py-24 bg-slate-50 relative">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="bg-primary text-white mb-6 text-sm px-6 py-2">SOLUTION</Badge>
              <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight max-w-4xl mx-auto">
                大学受験エンカレッジは、元大手予備校校舎長が1日単位で学習管理。<br />
                最短距離の合格を実現します。
              </h2>
              <p className="text-slate-600 text-lg">合格までのストーリー</p>
            </motion.div>

            {/* Story Boards - 3 Success Patterns */}
            <div className="space-y-16 max-w-7xl mx-auto">
              {[
                {
                  title: "E判定から逆転合格",
                  stages: [
                    { label: "Before", icon: BookOpen, color: "from-red-50 to-red-100", text: "模試判定E・不安", accent: "text-red-600" },
                    { label: "Turning Point", icon: Target, color: "from-blue-50 to-blue-100", text: "戦略的カリキュラム", accent: "text-blue-600" },
                    { label: "After", icon: Award, color: "from-green-50 to-green-100", text: "第一志望合格", accent: "text-green-600" }
                  ]
                },
                {
                  title: "部活引退後からスタート",
                  stages: [
                    { label: "Before", icon: Users, color: "from-orange-50 to-orange-100", text: "時間が限られる", accent: "text-orange-600" },
                    { label: "Turning Point", icon: Clock, color: "from-purple-50 to-purple-100", text: "効率重視プラン", accent: "text-purple-600" },
                    { label: "After", icon: Star, color: "from-yellow-50 to-yellow-100", text: "間に合って合格", accent: "text-yellow-600" }
                  ]
                },
                {
                  title: "苦手科目を克服",
                  stages: [
                    { label: "Before", icon: BarChart, color: "from-slate-50 to-slate-100", text: "科目バランス悪い", accent: "text-slate-600" },
                    { label: "Turning Point", icon: Zap, color: "from-teal-50 to-teal-100", text: "弱点集中対策", accent: "text-teal-600" },
                    { label: "After", icon: TrendingUp, color: "from-emerald-50 to-emerald-100", text: "全科目得点UP", accent: "text-emerald-600" }
                  ]
                }
              ].map((story, storyIdx) => (
                <motion.div
                  key={storyIdx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: storyIdx * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-3xl p-8 lg:p-12 relative overflow-hidden"
                >
                  {/* Story Title */}
                  <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-8 text-center">
                    {story.title}
                  </h3>

                  {/* 3-Stage Story Strip */}
                  <div className="grid md:grid-cols-3 gap-8">
                    {story.stages.map((stage, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 + idx * 0.15 }}
                        viewport={{ once: true }}
                        className="relative group"
                      >
                        {/* Stage Label */}
                        <div className="absolute -top-4 left-6 z-10">
                          <span className="inline-block bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-full">
                            {stage.label}
                          </span>
                        </div>

                        {/* Content */}
                        <div className={`bg-gradient-to-br ${stage.color} rounded-2xl p-8 h-full flex flex-col items-center justify-center text-center space-y-4 group-hover:scale-105 transition-transform duration-300`}>
                          {/* Icon Placeholder - Replace with Canva */}
                          <div className="w-32 h-32 flex items-center justify-center">
                            <stage.icon className={`h-20 w-20 ${stage.accent}`} />
                          </div>
                          
                          {/* Text */}
                          <p className={`text-lg font-bold ${stage.accent}`}>
                            {stage.text}
                          </p>

                          <p className="text-xs text-slate-500 italic">
                            [Canva画像差替え枠]
                          </p>
                        </div>

                        {/* Arrow between stages */}
                        {idx < 2 && (
                          <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                            <ArrowRight className="h-8 w-8 text-slate-400" />
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="mt-16 text-center"
            >
              <Button 
                onClick={scrollToConsultation}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white h-14 px-10 text-lg shadow-lg hover:shadow-xl transition-all group"
              >
                あなたの合格ストーリーを始める
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Why Learning Management - Infographic Band */}
        <section className="py-24 bg-white relative overflow-hidden">
          {/* Background Illustration - Subtle */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute top-10 left-10 w-64 h-64">
              <BookOpen className="w-full h-full text-primary" />
            </div>
            <div className="absolute bottom-10 right-10 w-64 h-64">
              <Target className="w-full h-full text-yellow-500" />
            </div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6">
                なぜ大学受験に学習管理が必要なのか？
              </h2>
              
              {/* Conclusion Label - Info badge, not a button */}
              <div className="inline-flex items-center gap-2 info-badge text-slate-700 text-sm">
                <Zap className="h-4 w-4" />
                結論：大学受験は"設計と継続"で差がつく。だから管理が必要
              </div>
            </motion.div>

            {/* Horizontal Infographic Band */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="max-w-7xl mx-auto"
            >
              <div className="bg-gradient-to-r from-blue-50 via-white to-yellow-50 rounded-3xl p-1 relative">
                <div className="bg-white rounded-3xl p-8 lg:p-12 relative overflow-hidden">
                  <div className="grid md:grid-cols-3 gap-0 divide-x-0 md:divide-x divide-slate-100">
                    {[
                      {
                        icon: School,
                        tag: "分岐",
                        title: "大学学部・試験方式",
                        subtitle: "求められる力が異なる",
                        color: "text-blue-600",
                        bgColor: "bg-blue-50"
                      },
                      {
                        icon: BookOpen,
                        tag: "広い",
                        title: "学習範囲・深さ",
                        subtitle: "高校受験と段違い",
                        color: "text-purple-600",
                        bgColor: "bg-purple-50"
                      },
                      {
                        icon: Video,
                        tag: "迷子",
                        title: "教材・ツール",
                        subtitle: "溢れている",
                        color: "text-amber-600",
                        bgColor: "bg-amber-50"
                      }
                    ].map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                        viewport={{ once: true }}
                        className="px-6 lg:px-10 py-6 text-center group cursor-default"
                      >
                        {/* Icon */}
                        <div className={`inline-flex items-center justify-center w-20 h-20 ${item.bgColor} rounded-2xl mb-6 ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                          <item.icon className="h-10 w-10" />
                        </div>

                        {/* Tag - Small badge for instant meaning */}
                        <div className="inline-block bg-slate-100 text-slate-600 text-xs font-bold px-2 py-1 rounded mb-3">
                          {item.tag}
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-slate-900 mb-2">
                          {item.title}
                        </h3>

                        {/* Subtitle */}
                        <p className={`text-sm font-medium ${item.color}`}>
                          {item.subtitle}
                        </p>

                        {/* Hover indicator */}
                        <div className={`mt-4 h-1 w-0 group-hover:w-full ${item.bgColor} transition-all duration-300 rounded-full mx-auto`} />
                      </motion.div>
                    ))}
                  </div>

                  {/* Bottom Summary */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    viewport={{ once: true }}
                    className="mt-10 pt-10 border-t border-slate-100 text-center"
                  >
                    <p className="text-lg text-slate-700 max-w-3xl mx-auto">
                      だからこそ、<span className="font-bold text-primary text-xl">プロによる学習管理</span>が
                      合格への最短ルートになります
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Anxiety → Cause Tag → Solution (Speech Bubble Style) */}
        <section className="py-24 bg-slate-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
                他にもこんな不安も・・・
              </h2>
            </motion.div>

            <div className="max-w-6xl mx-auto space-y-10">
              {[
                {
                  anxiety: "映像授業をたくさん受けてるけど伸びない...",
                  cause: "復習設計がない",
                  solution: "復習スケジュールまで徹底管理"
                },
                {
                  anxiety: "集団塾に通ってるけど成績が上がらない...",
                  cause: "レベルが合わない",
                  solution: "個別最適化カリキュラム"
                }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  viewport={{ once: true }}
                  className="flex flex-col md:flex-row items-center gap-6 bg-white p-6 lg:p-8 rounded-2xl"
                >
                  {/* Speech Bubble - Anxiety */}
                  <div className="relative bg-orange-50 border border-orange-200 px-6 py-4 rounded-2xl flex-1 max-w-sm">
                    <p className="text-slate-800 font-medium">{item.anxiety}</p>
                    {/* Triangle pointer */}
                    <div className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-l-8 border-l-orange-200 border-b-8 border-b-transparent" />
                  </div>

                  {/* Cause Tag - Info badge (not a button) */}
                  <div className="info-badge text-slate-700 whitespace-nowrap flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs font-bold">原因:</span>
                    <span className="font-medium">{item.cause}</span>
                  </div>

                  {/* Arrow */}
                  <div className="hidden md:block text-primary flex-shrink-0">
                    <ArrowRight className="h-8 w-8" />
                  </div>

                  {/* Solution with check */}
                  <div className="frosted-glass border border-primary/30 px-6 py-4 rounded-2xl flex-1 max-w-sm">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-bold text-primary uppercase mb-1">Solution</div>
                        <p className="text-slate-800 font-medium">{item.solution}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Statement Banner - Companion Message */}
        <section className="relative py-32 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img 
              src="/images/counseling.png" 
              alt="プロによる伴走" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/90 to-slate-900/85" />
          </div>

          {/* Quote Mark Background */}
          <div className="absolute top-10 left-10 text-primary/10 text-[200px] font-serif leading-none">"</div>

          {/* Content */}
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-5xl mx-auto text-center"
            >
              <h2 className="text-3xl lg:text-6xl font-bold text-white leading-tight mb-8">
                大学受験エンカレッジでは<br className="hidden lg:block" />
                生徒一人ひとりに、
                <span className="block mt-4 text-yellow-400">
                  大学受験予備校での<br className="lg:hidden" />校舎長経験がある<br className="hidden lg:block" />
                  スタッフが伴走。
                </span>
              </h2>

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-full"
              >
                <ShieldCheck className="h-6 w-6 text-yellow-400" />
                <span className="text-white font-bold">元大手予備校 校舎長経験</span>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Block 9: Benefit (Short) */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block p-8 lg:p-12 bg-white rounded-2xl border-2 border-primary shadow-lg">
                <p className="text-xl lg:text-2xl font-bold text-slate-900 leading-relaxed">
                  1日単位で学習計画を作成し、<br className="hidden md:block" />
                  最短ルートでの受験勉強を実現し<br className="hidden md:block" />
                  志望校合格を後押しします。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA (Middle) */}
        <section className="py-16 bg-gradient-to-br from-primary to-blue-700">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              まずは無料カウンセリング
            </h2>
            <p className="text-white/90 mb-8 text-lg">
              あなたの学習の悩みを解決するヒントが見つかります
            </p>
            <Button 
              onClick={scrollToConsultation}
              size="lg"
              className="bg-yellow-500 hover:bg-yellow-400 text-slate-900 h-14 px-8 text-lg font-bold shadow-lg"
            >
              かんたん60秒 / 無料カウンセリングを予約 <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>

        {/* Block 10: Strengths (6 Items) - Detailed & Visual */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                大学受験エンカレッジの強み
              </h2>
              <p className="text-slate-600">6つの強みであなたの合格を徹底サポート</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                { icon: Target, title: "合格逆算カリキュラム作成", desc: "志望校合格から逆算して、最短ルートの学習計画を作成します。" },
                { icon: Video, title: "映像授業も積極活用し最適化", desc: "映像授業と参考書を組み合わせた、効率的な学習を実現します。" },
                { icon: Users, title: "現役難関大生との個別指導で毎週「解ける状態」まで伴走", desc: "東大・京大・早慶などの難関大生が、分からないを解決します。" },
                { icon: MessageCircle, title: "元予備校校舎長と週1回の学習会議", desc: "プロの視点で進捗を確認し、最適な学習プランを提供します。" },
                { icon: ShieldCheck, title: "専属コンサルタントが徹底管理", desc: "あなた専属のコンサルタントが、合格まで徹底サポートします。" },
                { icon: BookOpen, title: "全国どこでも受講可能", desc: "オンラインなので、全国どこからでも受講できます。" }
              ].map((strength, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="frosted-glass p-8 rounded-2xl"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <strength.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">{strength.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {strength.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Integrated: Promise → Anxiety → Solution (Continuation Mechanism) */}
        <section className="py-24 bg-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-[0.02]">
            <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(to right, #1e40af 1px, transparent 1px), linear-gradient(to bottom, #1e40af 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl mx-auto">
              {/* Promise */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <div className="inline-block bg-gradient-to-r from-primary to-blue-600 text-white px-8 py-6 rounded-3xl mb-8">
                  <p className="text-2xl lg:text-3xl font-bold leading-tight">
                    1日単位の学習計画で<br />
                    「何をすれば良いか分からない」を<span className="text-yellow-400">今すぐ解決</span>
                  </p>
                </div>
              </motion.div>

              {/* Connection Line with Anxiety */}
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex justify-center my-8"
              >
                <div className="h-16 w-1 bg-gradient-to-b from-primary to-orange-500" />
              </motion.div>

              {/* Anxiety */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <div className="inline-flex items-center gap-4 bg-orange-50 border-2 border-orange-300 px-8 py-6 rounded-3xl">
                  <HelpCircle className="h-10 w-10 text-orange-600 flex-shrink-0" />
                  <p className="text-xl lg:text-2xl font-bold text-slate-900">
                    でも、毎日努力し続けられるか不安...
                  </p>
                </div>
              </motion.div>

              {/* Bridge Line */}
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
                className="flex justify-center my-8"
              >
                <div className="h-16 w-1 bg-gradient-to-b from-orange-500 to-green-500" />
              </motion.div>

              {/* Solution: Continuation Mechanism */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl p-8 lg:p-12"
              >
                <div className="text-center mb-10">
                  <Badge className="bg-green-600 text-white mb-4 text-sm px-6 py-2">継続の仕組み</Badge>
                  <h3 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                    学習を継続し続けるためのサポート
                  </h3>
                  <p className="text-slate-600 text-lg">安心して学習を続けられる環境を用意しています</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  {/* Mock Image */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                      <img src="/images/sheet-mock.png" alt="学習管理用シート" className="w-full h-auto" />
                      <div className="absolute top-4 right-4 bg-yellow-500 text-slate-900 text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                        学習管理シート
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 mt-3 text-center italic">
                      ※Canva等で作成した図解に差替え可能
                    </p>
                  </motion.div>

                  {/* Features */}
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                  >
                    {[
                      { icon: Calendar, title: "1日単位の学習管理", desc: "今日何をすべきか明確に" },
                      { icon: CheckCircle2, title: "進捗可視化シート", desc: "達成感を実感できる" },
                      { icon: Users, title: "週1回の面談", desc: "プロが進捗を確認" },
                      { icon: MessageCircle, title: "毎日の報告", desc: "サボらない環境" }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-4 bg-white p-4 rounded-xl">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary flex-shrink-0">
                          <item.icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                          <p className="text-sm text-slate-600">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Block 14: Comparison Section - Table */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">他の塾・予備校とはここが違う！</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] border-collapse">
                <thead>
                  <tr>
                    <th className="p-4 text-left bg-slate-50 border-b border-slate-200 w-1/4"></th>
                    <th className="p-4 text-center bg-blue-50 border-b-2 border-primary w-1/4 rounded-t-lg">
                      <div className="text-primary font-bold text-lg">エンカレッジ</div>
                      <div className="text-xs text-primary/80">学習管理特化</div>
                    </th>
                    <th className="p-4 text-center bg-slate-50 border-b border-slate-200 w-1/4 text-slate-500">大手予備校</th>
                    <th className="p-4 text-center bg-slate-50 border-b border-slate-200 w-1/4 text-slate-500">映像授業塾</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: "学習計画", enc: "1日単位で作成", other1: "生徒任せ", other2: "大まかな目安のみ" },
                    { label: "進捗管理", enc: "週1回徹底チェック", other1: "模試の時だけ", other2: "視聴状況のみ" },
                    { label: "質問対応", enc: "いつでもLINEで", other1: "待ち時間が長い", other2: "できない場合も" },
                    { label: "講師の質", enc: "プロ×難関大生", other1: "学生バイト中心", other2: "映像のみ" },
                    { label: "場所", enc: "全国どこでも", other1: "通塾が必要", other2: "通塾が必要" },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                      <td className="p-4 font-bold text-slate-700">{row.label}</td>
                      <td className="p-4 text-center bg-blue-50/30 font-bold text-primary border-x border-blue-100">
                        {row.enc}
                      </td>
                      <td className="p-4 text-center text-slate-500">{row.other1}</td>
                      <td className="p-4 text-center text-slate-500">{row.other2}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Block 15: Uniqueness - Convergence System (No = symbol) */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                エンカレッジの独自体制
              </h2>
              <p className="text-slate-600">2つの専門性が合流し、強力なサポートを実現</p>
            </motion.div>

            <div className="max-w-5xl mx-auto">
              {/* Y-shape Convergence Layout */}
              <div className="relative">
                {/* Two Sources */}
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="frosted-glass p-8 rounded-2xl"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                        <ShieldCheck className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">学習管理</h3>
                    </div>
                    <p className="text-slate-700">予備校校舎長経験者がトータルサポート</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="frosted-glass p-8 rounded-2xl"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                        <Users className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">個別指導</h3>
                    </div>
                    <p className="text-slate-700">難関大在籍の現役大学生講師</p>
                  </motion.div>
                </div>

                {/* Convergence Lines */}
                <div className="hidden md:flex justify-center mb-8 relative h-16">
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 80" preserveAspectRatio="none">
                    <path
                      d="M 100 0 Q 100 40 200 80"
                      stroke="url(#gradient1)"
                      strokeWidth="3"
                      fill="none"
                      opacity="0.6"
                    />
                    <path
                      d="M 300 0 Q 300 40 200 80"
                      stroke="url(#gradient1)"
                      strokeWidth="3"
                      fill="none"
                      opacity="0.6"
                    />
                    <defs>
                      <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#1e40af" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#1e40af" stopOpacity="0.8" />
                      </linearGradient>
                    </defs>
                  </svg>
                  
                  {/* Connection Label - Not a button */}
                  <div className="info-badge absolute bottom-0 left-1/2 -translate-x-1/2 text-slate-700">
                    連携
                  </div>
                </div>

                {/* Result / Goal */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-blue-50 to-white p-8 lg:p-10 rounded-2xl border-2 border-primary/30 text-center"
                >
                  <div className="inline-flex items-center gap-3 mb-4">
                    <CheckCircle2 className="h-8 w-8 text-primary" />
                    <span className="text-sm font-bold text-primary uppercase tracking-wider">Result</span>
                  </div>
                  <p className="text-2xl lg:text-3xl font-bold text-slate-900">
                    一丸で第一志望合格をサポート
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA (Middle 2) */}
        <section className="py-16 bg-gradient-to-br from-blue-700 to-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              あなたも合格への第一歩を
            </h2>
            <p className="text-white/90 mb-8 text-lg">
              無理な勧誘は一切ありません。まずはお気軽にご相談ください。
            </p>
            <Button 
              onClick={scrollToConsultation}
              size="lg"
              className="bg-yellow-500 hover:bg-yellow-400 text-slate-900 h-14 px-8 text-lg font-bold shadow-lg"
            >
              かんたん60秒 / 無料カウンセリングを予約 <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>

        {/* Block 15: Results & Reviews */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge className="bg-yellow-500 text-slate-900 mb-4 hover:bg-yellow-500 text-lg px-6 py-2">確かな実績</Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                開校から3年連続で大学進学率100%！
              </h2>
              <p className="text-slate-600 text-lg">数多くの合格者を輩出しています</p>
            </div>

            {/* Statistics */}
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
              <div className="text-center p-8 bg-blue-50 rounded-xl border border-blue-100">
                <div className="text-5xl font-bold text-primary mb-2">100%</div>
                <p className="text-slate-700 font-bold">3年連続 大学進学率</p>
              </div>
              <div className="text-center p-8 bg-yellow-50 rounded-xl border border-yellow-100">
                <div className="text-5xl font-bold text-yellow-600 mb-2">98%</div>
                <p className="text-slate-700 font-bold">生徒満足度</p>
              </div>
              <div className="text-center p-8 bg-green-50 rounded-xl border border-green-100">
                <div className="text-5xl font-bold text-green-600 mb-2">200+</div>
                <p className="text-slate-700 font-bold">合格実績数</p>
              </div>
            </div>

            {/* Reviews */}
            <div className="max-w-5xl mx-auto">
              <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">合格者の声</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <p className="text-slate-700 mb-4 leading-relaxed">
                    「1日単位の学習計画のおかげで、何をすればいいか迷わなくなりました。結果、E判定から逆転合格できました！」
                  </p>
                  <p className="text-sm text-slate-500">早稲田大学 合格 / Aさん</p>
                </div>

                <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <p className="text-slate-700 mb-4 leading-relaxed">
                    「部活引退後からのスタートでしたが、効率的な学習プランで第一志望に合格！先生方のサポートに感謝しています。」
                  </p>
                  <p className="text-sm text-slate-500">慶應義塾大学 合格 / Bさん</p>
                </div>

                <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <p className="text-slate-700 mb-4 leading-relaxed">
                    「週1回の面談で進捗を確認してもらえるので、モチベーションを維持できました。継続できる仕組みが素晴らしいです。」
                  </p>
                  <p className="text-sm text-slate-500">東京大学 合格 / Cさん</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Block 16: Representative Message */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">代表メッセージ</h2>
              </div>

              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="relative rounded-xl overflow-hidden shadow-xl border border-slate-200 bg-white p-2">
                  <img src="/images/founder.png" alt="代表" className="w-full h-auto rounded-lg" />
                  <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    代表写真
                  </div>
                </div>

                <div className="space-y-6">
                  <p className="text-slate-700 leading-relaxed text-lg">
                    大学受験は人生の大きな転換点です。しかし、多くの受験生が「何をすればいいか分からない」という不安を抱えています。
                  </p>
                  <p className="text-slate-700 leading-relaxed text-lg">
                    私たちエンカレッジは、そんな不安を「自信」に変えるために存在します。
                  </p>

                  <div className="space-y-4 mt-8">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">1</div>
                      <div>
                        <h4 className="font-bold text-slate-900 mb-1">想い</h4>
                        <p className="text-sm text-slate-600">すべての受験生に最短ルートの合格を</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">2</div>
                      <div>
                        <h4 className="font-bold text-slate-900 mb-1">方針</h4>
                        <p className="text-sm text-slate-600">1日単位の徹底した学習管理で確実に成長</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">3</div>
                      <div>
                        <h4 className="font-bold text-slate-900 mb-1">約束</h4>
                        <p className="text-sm text-slate-600">合格まで全力でサポートし続けます</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 p-6 bg-white rounded-lg border-l-4 border-primary">
                    <p className="text-slate-700 italic">
                      「諦める前に、まず一度ご相談ください。必ず道は開けます。」
                    </p>
                    <p className="text-sm text-slate-500 mt-2 text-right">- 代表 ○○ ○○</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Metro Map Style - Journey to Success */}
        <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-4">
                ご利用の流れ
              </h2>
              <p className="text-slate-600 text-lg">無理な勧誘は一切ありません。まずはお気軽にご相談ください。</p>
            </motion.div>

            <div className="max-w-7xl mx-auto">
              {/* Metro Line Container */}
              <div className="relative">
                {/* Main Line */}
                <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-2 bg-gradient-to-r from-primary via-blue-500 to-green-500 rounded-full -translate-y-1/2" />

                {/* Stations */}
                <div className="grid lg:grid-cols-4 gap-8 lg:gap-4">
                  {[
                    { 
                      step: "01", 
                      title: "お申し込み", 
                      desc: "フォームから60秒で予約完了",
                      icon: CheckCircle2,
                      color: "from-blue-500 to-blue-600"
                    },
                    { 
                      step: "02", 
                      title: "事前アンケート", 
                      desc: "現状の成績や志望校をお聞かせください",
                      icon: BookOpen,
                      color: "from-purple-500 to-purple-600"
                    },
                    { 
                      step: "03", 
                      title: "日程調整", 
                      desc: "ご都合の良い日時を調整いたします",
                      icon: Calendar,
                      color: "from-amber-500 to-amber-600"
                    },
                    { 
                      step: "04", 
                      title: "無料カウンセリング", 
                      desc: "現状分析と学習プランをご提案",
                      icon: Users,
                      color: "from-green-500 to-green-600"
                    }
                  ].map((station, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: idx * 0.15 }}
                      viewport={{ once: true }}
                      className="relative"
                    >
                      {/* Station Marker */}
                      <div className="flex justify-center mb-6 lg:mb-8">
                        <div className={`w-20 h-20 bg-gradient-to-br ${station.color} rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg relative z-10 ring-4 ring-white`}>
                          {station.step}
                        </div>
                      </div>

                      {/* Station Info Card */}
                      <div className="bg-white rounded-2xl p-6 border-2 border-slate-100 hover:border-primary/30 hover:shadow-lg transition-all duration-300 group">
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`w-12 h-12 bg-gradient-to-br ${station.color} rounded-xl flex items-center justify-center text-white`}>
                            <station.icon className="h-6 w-6" />
                          </div>
                          <h3 className="text-lg font-bold text-slate-900">{station.title}</h3>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">{station.desc}</p>
                        
                        {/* Hover indicator */}
                        <div className="mt-4 h-1 w-0 group-hover:w-full bg-gradient-to-r from-primary to-blue-500 transition-all duration-300 rounded-full" />
                      </div>

                      {/* Arrow between stations (mobile only) */}
                      {idx < 3 && (
                        <div className="lg:hidden flex justify-center my-6">
                          <ArrowRight className="h-8 w-8 text-primary rotate-90" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Destination Label - NOT a button */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  viewport={{ once: true }}
                  className="mt-12 text-center"
                >
                  <div className="inline-flex items-center gap-3 frosted-glass px-6 py-3 rounded-xl border border-yellow-500/30">
                    <CheckCircle2 className="h-5 w-5 text-yellow-600" />
                    <span className="text-slate-900 font-bold text-lg">志望校合格へ</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section - Enhanced */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">よくあるご質問</h2>
              <p className="text-slate-600">不安や疑問を解消してから始めましょう</p>
            </div>
            
            <Accordion type="single" collapsible className="w-full space-y-4">
              {[
                { q: "本当に成績が伸びますか？", a: "はい。正しい計画と実行があれば成績は必ず伸びます。エンカレッジでは「計画倒れ」を防ぐ徹底的な管理を行うため、98%の生徒が成績向上を実感しています。" },
                { q: "部活が忙しいのですが対応できますか？", a: "部活生こそ効率的な学習が必要です。通学時間や隙間時間を活用した、あなたの生活リズムに合わせた現実的なプランを作成します。部活と両立しながら合格した実績も多数あります。" },
                { q: "オンラインでサボってしまいませんか？", a: "毎日の報告義務と週1回の面談があるため、サボることが難しい環境です。また、講師が常に伴走することでモチベーション維持もサポートします。オンラインだからこそ、記録が残り進捗管理がしやすいというメリットもあります。" },
                { q: "志望校がまだ決まっていないのですが大丈夫ですか？", a: "大丈夫です。将来の夢や興味のある分野から、あなたに合った大学・学部を一緒に探しましょう。志望校選びも含めてサポートします。" },
                { q: "料金はどのくらいかかりますか？", a: "コースやプランによって異なります。無料カウンセリングの際に、あなたに最適なプランと料金をご提案いたします。無理な勧誘は一切ありませんので、安心してご相談ください。" },
                { q: "いつから始めるのが良いですか？", a: "早ければ早いほど良いです。ただし、どのタイミングからでも最適な学習プランを作成できます。「今からでは遅い」ということはありません。思い立った今が始め時です。" },
                { q: "保護者も一緒にカウンセリングを受けられますか？", a: "はい、もちろんです。むしろ保護者の方にもご参加いただくことをおすすめしています。お子様の学習状況を共有し、ご家庭でもサポートしていただけるようご説明いたします。" },
              ].map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="bg-white rounded-lg border border-slate-200 px-6">
                  <AccordionTrigger className="text-left font-bold text-slate-800 hover:text-primary hover:no-underline py-5">
                    <span className="flex items-center gap-3">
                      <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs flex-shrink-0">Q</span>
                      {item.q}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 leading-relaxed pb-5 pl-9">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Block 18: Closing Section */}
        <section className="py-20 bg-gradient-to-br from-primary via-blue-700 to-blue-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-[0.05]" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                  思った時が変わるチャンス！
                </h2>
                <p className="text-xl lg:text-2xl text-white/90 leading-relaxed mb-8">
                  最短ルートで志望校に合格する、<br />
                  あなただけの受験戦略・学習計画を<br className="md:hidden" />オーダーメイドで作成します。
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
                  <Button 
                    onClick={scrollToConsultation}
                    size="lg"
                    className="bg-yellow-500 hover:bg-yellow-400 text-slate-900 h-16 px-10 text-xl font-bold shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300"
                  >
                    今すぐ無料カウンセリングを予約 <ArrowRight className="ml-2 h-6 w-6" />
                  </Button>
                </div>
                <p className="text-white/70 mt-6 text-sm">
                  ※無理な勧誘は一切ありません / オンライン対応 / かんたん60秒
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section - Consultation Form */}
        <section id="consultation-form" className="py-20 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-[0.05]" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 lg:p-12">
              <div className="text-center mb-10">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">無料カウンセリングを予約</h2>
                <p className="text-slate-300 text-lg mb-4">
                  無理な勧誘は一切ありません。<br/>
                  あなたの学習の悩みを解決するヒントをお持ち帰りください。
                </p>
                <div className="info-badge inline-flex items-center gap-2 text-slate-100">
                  <Clock className="h-3.5 w-3.5" />
                  <span>かんたん60秒で完了</span>
                </div>
              </div>

              <form onSubmit={handleConsultation} className="space-y-6 max-w-md mx-auto">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">お名前</label>
                  <input 
                    required
                    type="text" 
                    placeholder="山田 太郎"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">メールアドレス</label>
                  <input 
                    required
                    type="email" 
                    placeholder="example@email.com"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">現在の学年</label>
                  <select className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all [&>option]:text-slate-900">
                    <option value="">選択してください</option>
                    <option value="koko3">高校3年生</option>
                    <option value="koko2">高校2年生</option>
                    <option value="koko1">高校1年生</option>
                    <option value="ronin">既卒生</option>
                    <option value="hogo">保護者</option>
                  </select>
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full h-14 text-lg font-bold bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 transition-all duration-300"
                >
                  {isSubmitting ? "送信中..." : "無料カウンセリングを予約する"}
                </Button>
                <p className="text-xs text-center text-slate-400">
                  ※個人情報は厳重に管理いたします。
                </p>
              </form>
            </div>
          </div>
        </section>

        {/* Mobile Sticky CTA */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] md:hidden z-50">
          <Button 
            onClick={scrollToConsultation}
            className="w-full h-12 text-lg font-bold bg-primary hover:bg-primary/90 text-white shadow-md"
          >
            無料カウンセリングを予約
          </Button>
        </div>

        {/* Footer */}
        <footer className="bg-slate-950 text-slate-400 py-12 pb-24 md:pb-12 border-t border-slate-900">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">E</div>
              <span className="font-heading font-bold text-lg tracking-tight text-white">大学受験エンカレッジ</span>
            </div>
            <p className="text-sm mb-8">
              〒000-0000 東京都渋谷区...<br/>
              お問い合わせ: info@example.com
            </p>
            <div className="text-xs text-slate-600">
              &copy; 2025 Encourage. All rights reserved.
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
