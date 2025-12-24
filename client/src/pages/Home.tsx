import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ChevronRight, Clock, Calendar, Users, TrendingUp, ShieldCheck, HelpCircle, ArrowRight, Star, BookOpen, Target, Award, Video, School, MessageCircle, BarChart } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
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
        {/* Hero Section - Background Image */}
        <section className="relative min-h-[90vh] lg:min-h-[95vh] overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <img 
              src="/images/hero-bg.png" 
              alt="大学受験エンカレッジ" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/85 via-slate-900/75 to-slate-900/70" />
            <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-[0.02]" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10 min-h-[90vh] lg:min-h-[95vh] flex items-center">
            <div className="max-w-4xl">
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                className="space-y-6 lg:space-y-8"
              >
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight text-white">
                  大学受験のプロが365日学習管理。<br />
                  「不安」を自信に変えて、<br />
                  <span className="text-yellow-400">志望校合格へ。</span>
                </h1>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button 
                    size="lg" 
                    onClick={scrollToConsultation}
                    className="bg-yellow-500 hover:bg-yellow-400 text-slate-900 h-14 px-8 text-lg font-bold shadow-lg shadow-yellow-500/30 hover:shadow-xl hover:shadow-yellow-500/40 transition-all duration-300"
                  >
                    かんたん60秒 / 無料カウンセリングを予約 <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>

                <div className="pt-8 border-t border-white/20 grid grid-cols-3 gap-6 max-w-2xl">
                  <div>
                    <div className="text-3xl lg:text-4xl font-bold text-yellow-400">100%</div>
                    <div className="text-xs text-white/80 mt-1">3年連続<br/>大学進学率</div>
                  </div>
                  <div>
                    <div className="text-3xl lg:text-4xl font-bold text-yellow-400">365日</div>
                    <div className="text-xs text-white/80 mt-1">徹底した<br/>学習管理</div>
                  </div>
                  <div>
                    <div className="text-3xl lg:text-4xl font-bold text-yellow-400">1日単位</div>
                    <div className="text-xs text-white/80 mt-1">学習計画<br/>作成</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Block 2: Strengths Summary (3 Points) */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-primary mx-auto">
                  <Target className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">あなただけの合格逆算カリキュラム作成。</h3>
                <p className="text-sm text-slate-600">志望校から逆算した最適な学習プラン</p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-primary mx-auto">
                  <Calendar className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">1日単位の学習計画で"なにしよう"をなくす。</h3>
                <p className="text-sm text-slate-600">毎日やることが明確になります</p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 mx-auto">
                  <Award className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">3年連続で大学進学率100%。</h3>
                <p className="text-sm text-slate-600">確かな実績で安心してお任せください</p>
              </div>
            </div>
          </div>
        </section>

        {/* Block 3: Empathy - Anxiety Presentation */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">大学受験の不安はありませんか？</h2>
              <p className="text-slate-600">多くの受験生が同じ悩みに直面しています。</p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              {[
                "高校に入ってから成績が低下",
                "何から手をつければ良いか分からない",
                "勉強が3日坊主で終わる"
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex items-center gap-4 p-6 bg-white rounded-xl border-l-4 border-slate-300 shadow-sm"
                >
                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 flex-shrink-0">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <p className="text-lg text-slate-700">{item}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Block 4: Cause Presentation */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="p-8 lg:p-12 bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-blue-100 text-center">
                <p className="text-lg lg:text-xl font-medium text-slate-800 leading-relaxed">
                  大学受験では学習の難易度や幅が広く、<br className="hidden md:block" />
                  <span className="text-primary font-bold text-2xl">「学習計画」</span>と<span className="text-primary font-bold text-2xl">「学習のやり方」</span>で<br className="hidden md:block" />
                  大きな差が生まれてしまいます。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Block 5: Solution + Success Examples (3 Patterns) */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                大学受験エンカレッジは、<br className="md:hidden" />元大手予備校校舎長が1日単位で学習管理。<br />
                最短距離の合格を実現します。
              </h2>
              <p className="text-slate-600 text-lg mt-4">合格実績の実例</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Success Example 1 - Will be replaced with Canva illustration */}
              <div className="bg-white rounded-xl p-8 shadow-lg border border-slate-100 text-center">
                <div className="aspect-square bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl mb-6 flex items-center justify-center">
                  <div className="text-center">
                    <BookOpen className="h-16 w-16 text-primary mx-auto mb-2" />
                    <p className="text-xs text-slate-500">[イラスト枠]</p>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">E判定から逆転合格</h3>
                <p className="text-sm text-slate-600">模試の判定が悪くても、戦略次第で合格できます</p>
              </div>

              {/* Success Example 2 - Will be replaced with Canva illustration */}
              <div className="bg-white rounded-xl p-8 shadow-lg border border-slate-100 text-center">
                <div className="aspect-square bg-gradient-to-br from-yellow-100 to-yellow-50 rounded-xl mb-6 flex items-center justify-center">
                  <div className="text-center">
                    <Users className="h-16 w-16 text-yellow-600 mx-auto mb-2" />
                    <p className="text-xs text-slate-500">[イラスト枠]</p>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">部活引退後からスタート</h3>
                <p className="text-sm text-slate-600">限られた時間でも効率的な学習で合格</p>
              </div>

              {/* Success Example 3 - Will be replaced with Canva illustration */}
              <div className="bg-white rounded-xl p-8 shadow-lg border border-slate-100 text-center">
                <div className="aspect-square bg-gradient-to-br from-green-100 to-green-50 rounded-xl mb-6 flex items-center justify-center">
                  <div className="text-center">
                    <BarChart className="h-16 w-16 text-green-600 mx-auto mb-2" />
                    <p className="text-xs text-slate-500">[イラスト枠]</p>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">苦手科目を克服</h3>
                <p className="text-sm text-slate-600">科目の偏りを解消し、バランス良く得点</p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Button 
                onClick={scrollToConsultation}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white h-12 px-8 shadow-md"
              >
                まずは無料カウンセリング <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Block 6: Why Learning Management is Necessary (3 Points) */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
                なぜ大学受験に学習管理が必要なのか？
              </h2>
            </div>

            <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
              <div className="p-8 bg-slate-50 rounded-xl border border-slate-200">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">大学学部・試験方式で<br />求められる力が異なる</h3>
                <p className="text-sm text-slate-600">志望校に応じた最適な戦略が必要です</p>
              </div>

              <div className="p-8 bg-slate-50 rounded-xl border border-slate-200">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">学習範囲・深さが<br />高校受験と段違い</h3>
                <p className="text-sm text-slate-600">膨大な範囲を効率的に学ぶ必要があります</p>
              </div>

              <div className="p-8 bg-slate-50 rounded-xl border border-slate-200">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">教材・ツールが<br />溢れている</h3>
                <p className="text-sm text-slate-600">自分に合った教材選びが重要です</p>
              </div>
            </div>
          </div>
        </section>

        {/* Block 7: Additional Anxiety + Arrow Explanation */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-8 text-center">
                他にもこんな不安も・・・
              </h2>

              <div className="space-y-8">
                {/* Concern 1 */}
                <div className="bg-white rounded-xl p-8 border border-slate-200">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Video className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-slate-900 mb-2">映像授業をたくさん受講しているけど伸びない</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />
                    <ArrowRight className="h-8 w-8 text-primary flex-shrink-0 mx-4" />
                    <div className="w-full h-0.5 bg-gradient-to-r from-primary via-primary to-transparent" />
                  </div>
                  <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                    <p className="text-slate-700 leading-relaxed">
                      映像授業のインプットは効率的。ただし<span className="font-bold text-primary">復習（アウトプット）の計画性</span>が伸びを分けます。エンカレッジでは復習スケジュールまで徹底管理します。
                    </p>
                  </div>
                </div>

                {/* Concern 2 */}
                <div className="bg-white rounded-xl p-8 border border-slate-200">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <School className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-slate-900 mb-2">集団塾の授業に頑張って取り組んでいるけど...</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />
                    <ArrowRight className="h-8 w-8 text-primary flex-shrink-0 mx-4" />
                    <div className="w-full h-0.5 bg-gradient-to-r from-primary via-primary to-transparent" />
                  </div>
                  <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                    <p className="text-slate-700 leading-relaxed">
                      <span className="font-bold text-primary">レベルが合わないと伸びません。</span>あなたの現在の学力と志望校に合わせた個別カリキュラムが必要です。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Block 8: Companion Presentation */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="p-8 lg:p-12 bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-blue-100">
                <p className="text-lg lg:text-xl font-medium text-slate-800 leading-relaxed">
                  大学受験エンカレッジでは生徒一人ひとりに、<br />
                  <span className="text-primary font-bold text-2xl">大学受験予備校での校舎長経験があるスタッフが伴走。</span>
                </p>
              </div>
            </div>
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

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Strength 1 */}
              <div className="p-8 bg-slate-50 rounded-xl border border-slate-200 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4">
                  <Target className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">合格逆算カリキュラム作成</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  志望校合格から逆算して、最短ルートの学習計画を作成します。
                </p>
              </div>

              {/* Strength 2 */}
              <div className="p-8 bg-slate-50 rounded-xl border border-slate-200 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4">
                  <Video className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">映像授業も積極活用し最適化</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  映像授業と参考書を組み合わせた、効率的な学習を実現します。
                </p>
              </div>

              {/* Strength 3 */}
              <div className="p-8 bg-slate-50 rounded-xl border border-slate-200 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">現役難関大生との個別指導で毎週"解ける状態"まで伴走</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  東大・京大・早慶などの難関大生が、分からないを解決します。
                </p>
              </div>

              {/* Strength 4 */}
              <div className="p-8 bg-slate-50 rounded-xl border border-slate-200 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">元予備校校舎長と週1回の学習会議</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  プロの視点で進捗を確認し、最適な学習プランを提供します。
                </p>
              </div>

              {/* Strength 5 */}
              <div className="p-8 bg-slate-50 rounded-xl border border-slate-200 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">専属コンサルタントが徹底管理</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  あなた専属のコンサルタントが、合格まで徹底サポートします。
                </p>
              </div>

              {/* Strength 6 */}
              <div className="p-8 bg-slate-50 rounded-xl border border-slate-200 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">全国どこでも受講可能</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  オンラインなので、全国どこからでも受講できます。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Block 11: Benefit Enhancement */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="p-8 lg:p-12 bg-white rounded-2xl border-2 border-blue-100 shadow-lg">
                <p className="text-xl lg:text-2xl font-bold text-slate-900 leading-relaxed mb-6">
                  1日単位の学習計画、学習管理を通して、
                </p>
                <p className="text-2xl lg:text-3xl font-bold text-primary leading-relaxed">
                  「何をすれば良いか分からない」<br />
                  「毎日頑張れない」を<br className="md:hidden" />今すぐ脱出！
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Block 12: Empathy for Continuation Anxiety */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="p-8 lg:p-12 bg-orange-50 rounded-2xl border-2 border-orange-200">
                <HelpCircle className="h-16 w-16 text-orange-600 mx-auto mb-4" />
                <p className="text-2xl lg:text-3xl font-bold text-slate-900 leading-relaxed">
                  「でも、毎日努力し続けられるかも不安・・・」
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Block 13: Continuation Mechanism (Learning Management + Sheet) */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                学習を継続し続けるための<br className="md:hidden" />サポートがあります
              </h2>
              <p className="text-slate-600 text-lg">安心して学習を続けられる環境を用意しています</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              {/* Learning Management Sheet Mock */}
              <div className="order-2 lg:order-1">
                <div className="relative rounded-xl overflow-hidden shadow-xl border border-slate-200 bg-white p-2">
                  <img src="/images/sheet-mock.png" alt="学習管理用シート" className="w-full h-auto rounded-lg" />
                  <div className="absolute top-4 right-4 bg-yellow-500 text-slate-900 text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    学習管理シート
                  </div>
                </div>
                <p className="text-sm text-slate-500 mt-4 text-center">
                  ※イラスト/図解は差し替え可能（Canva等で作成）
                </p>
              </div>

              <div className="order-1 lg:order-2 space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">1</div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">1日単位の学習管理</h3>
                    <p className="text-slate-600 leading-relaxed">
                      毎日の学習内容を細かく管理。「今日何をすべきか」が明確になり、迷いなく学習を進められます。
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">2</div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">学習管理用シート</h3>
                    <p className="text-slate-600 leading-relaxed">
                      進捗を可視化するシートで、達成感を実感。モチベーションを維持しながら学習を続けられます。
                    </p>
                  </div>
                </div>

                <div className="p-6 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="text-slate-700">
                    <span className="font-bold text-primary">週1回の面談</span>と<span className="font-bold text-primary">毎日の報告</span>で、
                    サボらない環境を作ります。
                  </p>
                </div>
              </div>
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

        {/* Block 15: Uniqueness - System */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-8">
                エンカレッジの独自体制
              </h2>
              <div className="space-y-6">
                <div className="p-8 bg-white rounded-xl border border-slate-200 shadow-md">
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <ShieldCheck className="h-12 w-12 text-primary" />
                    <h3 className="text-2xl font-bold text-slate-900">学習管理</h3>
                  </div>
                  <p className="text-lg text-slate-700">予備校校舎長経験者がトータルサポート</p>
                </div>

                <div className="text-4xl font-bold text-primary">×</div>

                <div className="p-8 bg-white rounded-xl border border-slate-200 shadow-md">
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <Users className="h-12 w-12 text-primary" />
                    <h3 className="text-2xl font-bold text-slate-900">個別指導</h3>
                  </div>
                  <p className="text-lg text-slate-700">難関大在籍の現役大学生講師</p>
                </div>

                <div className="text-2xl font-bold text-primary mt-8">＝</div>

                <div className="p-8 bg-gradient-to-br from-blue-50 to-yellow-50 rounded-xl border-2 border-primary shadow-lg">
                  <p className="text-2xl font-bold text-slate-900">
                    一丸で第一志望合格をサポート
                  </p>
                </div>
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

        {/* Block 16: Flow Section - Timeline (Updated to 4 Steps) */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">ご利用の流れ</h2>
              <p className="text-slate-600 text-lg">まずは現状の悩みをお聞かせください。無理な勧誘は一切ありません。</p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Vertical Line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-200 md:left-1/2 md:-ml-px"></div>

                {[
                  { step: "01", title: "お申し込み", desc: "フォームから60秒で予約完了。", icon: <CheckCircle2 className="h-6 w-6" /> },
                  { step: "02", title: "事前アンケート", desc: "現状の成績や志望校をお聞かせください。", icon: <BookOpen className="h-6 w-6" /> },
                  { step: "03", title: "日程調整", desc: "ご都合の良い日時を調整いたします。", icon: <Calendar className="h-6 w-6" /> },
                  { step: "04", title: "無料カウンセリング", desc: "現状分析と学習プランをご提案します。", icon: <Users className="h-6 w-6" /> }
                ].map((item, i) => (
                  <div key={i} className={`relative flex items-center mb-12 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                    <div className="flex-1 md:w-1/2"></div>
                    <div className="absolute left-0 w-16 h-16 bg-white border-4 border-primary rounded-full flex items-center justify-center z-10 md:left-1/2 md:-ml-8 shadow-md">
                      <span className="text-xl font-bold text-primary">{item.step}</span>
                    </div>
                    <div className="flex-1 md:w-1/2 pl-24 md:pl-0 md:px-12">
                      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-primary">
                            {item.icon}
                          </div>
                          <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                        </div>
                        <p className="text-slate-600 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
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
                <Badge className="bg-yellow-500 text-slate-900 mb-4 hover:bg-yellow-500 text-lg px-6 py-2">かんたん60秒</Badge>
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">無料カウンセリングを予約</h2>
                <p className="text-slate-300 text-lg">
                  無理な勧誘は一切ありません。<br/>
                  あなたの学習の悩みを解決するヒントをお持ち帰りください。
                </p>
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
