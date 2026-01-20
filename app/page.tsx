"use client";

import Link from 'next/link';
import { Navbar } from './components/Navbar';
import { ArrowRight, Bot, Zap, Share2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LandingPage() {
  // Animation Variants
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerContainer = {
    animate: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-indigo-200/40 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -80, 0],
            y: [0, 100, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] bg-purple-200/30 rounded-full blur-[100px]"
        />
      </div>

      <Navbar />

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold mb-8 shadow-sm"
        >
          <Sparkles className="w-4 h-4 animate-pulse" />
          The Future of Workflow Automation
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-8xl font-black tracking-tight mb-8"
        >
          Build AI Agents <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
            with simple words.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Orchestrate complex workflows using natural language.
          Connect your favorite apps and let AI handle the logic.
          Seamlessly integrated with n8n.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/signup"
              className="group w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-full font-bold shadow-xl shadow-indigo-500/40 flex items-center justify-center gap-2 overflow-hidden relative"
            >
              <span className="relative z-10 flex items-center gap-2">
                Start Building Free <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </motion.div>

          <motion.a
            whileHover={{ backgroundColor: "rgba(255,255,255,1)" }}
            href="https://n8n.io"
            target="_blank"
            className="w-full sm:w-auto px-8 py-4 bg-white/50 backdrop-blur-md text-slate-700 border border-slate-200 rounded-full font-medium transition-all flex items-center justify-center"
          >
            Read Documentation
          </motion.a>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                title: "Natural Language",
                desc: '"Create a workflow that scrapes TechCrunch every morning and summarizes it to Slack." Just say it.',
                icon: <Bot className="w-6 h-6 text-blue-600" />,
                color: "bg-blue-100"
              },
              {
                title: "Instant Deployment",
                desc: "Connects directly to your local n8n instance. Workflows are pushed instantly via API and ready to activate.",
                icon: <Zap className="w-6 h-6 text-purple-600" />,
                color: "bg-purple-100"
              },
              {
                title: "Open Ecosystem",
                desc: "Built on open standards. Export your agents as standard n8n JSON. No vendor lock-in.",
                icon: <Share2 className="w-6 h-6 text-green-600" />,
                color: "bg-green-100"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="p-8 rounded-3xl bg-white/70 backdrop-blur-lg border border-white/50 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all group"
              >
                <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Fancy Bottom Decorative Element */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
    </div>
  );
}
