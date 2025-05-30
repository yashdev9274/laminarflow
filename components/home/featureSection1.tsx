"use client"

import type React from "react"
import { motion } from "framer-motion"
import {
  Code,
  Users,
  Globe,
  Infinity,
  Clock,
  CheckCircle,
  Key,
  Download,
  Github,
  Gauge,
  MessageSquare,
  Settings,
} from "lucide-react"
import { twMerge } from "tailwind-merge"

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 2 } },
}

// Base Feature Card Component
interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  className?: string
  children?: React.ReactNode
}

const FeatureCard = ({ icon, title, description, className, children }: FeatureCardProps) => {
  return (
    <motion.div variants={cardVariants} className={twMerge("flex flex-col gap-y-6", className)}>
      <div className="flex h-full flex-col justify-between gap-y-8 rounded-2xl bg-[#101011] p-8 shadow-sm transition-transform hover:translate-y-[-4px] dark:border-gray-800 dark:bg-gray-900">
        <div className="flex flex-col gap-y-6">
          <span className="text-[#8c44ff] dark:text-blue-400">{icon}</span>
          <div className="flex flex-col gap-y-2">
            <h3 className="text-xl font-semibold text-white dark:text-white">{title}</h3>
            <p className="w-full flex-grow text-gray-500 dark:text-gray-400 md:max-w-96">{description}</p>
          </div>
        </div>
        {children}
      </div>
    </motion.div>
  )
}

// Customer Card Component
const CustomerCard = ({ name = "John Doe", plan = "Premium Plan", period = "Monthly" }) => {
  return (
    <div className="flex items-center gap-x-4 rounded-lg bg-zinc-900 p-4 dark:border-gray-700 dark:bg-gray-800">
      <div className="h-12 w-12 overflow-hidden rounded-full bg-[#8c44ff] flex items-center justify-center">
        <span className="text-white font-medium">
          JD
        </span>
      </div>
      <div className="flex flex-col">
        <span className="font-medium text-neutral-100 dark:text-white">{name}</span>
        <span className="flex flex-row gap-x-2 text-sm text-gray-500 dark:text-gray-400">
          <span>{plan}</span>
          <span>•</span>
          <span>{period}</span>
        </span>
      </div>
    </div>
  )
}

// Main Features Component
export default function Features() {
  const features = [
    {
      icon: <Code size={24} />,
      title: "Financial Management & Invoicing",
      description:
        "Streamline your financial operations with comprehensive management tools, automated invoicing, and payment tracking.",
      className: "xl:col-span-2",
      children: (
        <ul className="flex flex-col gap-y-1">
          <li className="flex flex-row items-center gap-x-2">
            <CheckCircle className="text-emerald-500" size={16} />
            <p className="text-pretty leading-relaxed text-neutral-100 dark:text-gray-300">
              Comprehensive Financial Overview
            </p>
          </li>
          <li className="flex flex-row items-center gap-x-2">
            <CheckCircle className="text-emerald-500" size={16} />
            <p className="text-pretty leading-relaxed text-neutral-100 dark:text-gray-300">Automated Payment Tracking & Reminders</p>
          </li>
          <li className="flex flex-row items-center gap-x-2">
            <CheckCircle className="text-emerald-500" size={16} />
            <p className="text-pretty leading-relaxed text-neutral-100 dark:text-gray-300">
              Customizable Invoicing with Recurring Options
            </p>
          </li>
        </ul>
      ),
    },
    {
      icon: <Clock size={24} />,
      title: "Invoices Features",
      description: "Create and manage invoices with customizable templates and automated reminders.",
      children: (
        <div className="flex flex-col gap-y-2">
          <div className="flex items-center gap-x-4 overflow-auto rounded-lg  bg-zinc-900 p-4 dark:border-gray-700 dark:bg-gray-800">
            <pre className="font-mono text-xs text-neutral-100 dark:text-gray-200">
              {`Invoice.create({
                  customer: 'John Doe',
                  items: [
                    { description: 'Consulting Services', amount: 1500 },
                  ],
                  dueDate: '2025-12-31'
                })`}
            </pre>
          </div>
          <div className="flex flex-col gap-y-4 rounded-lg bg-zinc-900 p-4 dark:border-gray-700 dark:bg-gray-800">
            <div className="flex flex-row items-center gap-x-2">
              <div className="h-6 w-6 overflow-hidden rounded-full bg-[#8c44ff] flex items-center justify-center">
                <span className="text-white text-xs font-medium">JD</span>
              </div>
              <span className="text-sm font-medium text-neutral-100 dark:text-white">John Doe</span>
            </div>
            <div className="flex flex-col">
              <span className="flex flex-row justify-between gap-x-2 text-sm text-gray-500 dark:text-gray-400">
                <span>63,529 Prompt Tokens</span>
                <span>$57.63</span>
              </span>
              <span className="flex flex-row justify-between gap-x-2 text-sm text-gray-500 dark:text-gray-400">
                <span>75,348 Completion Tokens</span>
                <span>$75.12</span>
              </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      icon: <Infinity size={24} />,
      title: "Benefits Engine",
      description: "Automate access to various features with a powerful entitlements engine.",
      children: (
        <div className="grid grid-cols-2 gap-2">
          {[
            { icon: <Key className="h-4 w-4" />, text: "License Keys" },
            { icon: <Gauge className="h-4 w-4" />, text: "Credits" },
            { icon: <Download className="h-4 w-4" />, text: "Downloadables" },
            { icon: <Github className="h-4 w-4" />, text: "GitHub Repos" },
            { icon: <MessageSquare className="h-4 w-4" />, text: "Discord Roles" },
            { icon: <Settings className="h-4 w-4" />, text: "Custom" },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-x-2 rounded-lg bg-zinc-900 px-3 py-2 dark:border-gray-700 dark:bg-gray-800"
            >
              <span className="text-neutral-100 dark:text-gray-400">{item.icon}</span>
              <span className="text-xs text-neutral-100 dark:text-gray-50">{item.text}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      icon: <Users size={24} />,
      title: "Customer Management",
      description: "Streamlined customer lifecycle management with detailed profiles and analytics.",
      children: (
        <div className="relative h-[120px] md:h-[200px]">
          <div className="absolute bg-zinc-900 bottom-8 left-0 right-0 scale-90 transition-transform hover:-translate-y-1">
            <CustomerCard name="Alice Smith" plan="Starter Plan" period="Yearly" />
          </div>
          <div className="absolute bottom-4 left-0 right-0 scale-95 transition-transform hover:-translate-y-1">
            <CustomerCard name="Bob Johnson" plan="Pro Plan" period="Monthly" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 transition-transform hover:-translate-y-1">
            <CustomerCard />
          </div>
        </div>
      ),
    },
    {
      icon: <Globe size={24} />,
      title: "Transactional Record",
      description: "Focus on scaling your business while we handle your finances.",
      children: (
        <div className="flex flex-col gap-y-2 rounded-lg bg-zinc-900 p-4 dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-100 dark:text-white">Transaction Report 2025</span>
            <span className="text-sm text-emerald-500">Completed</span>
          </div>
          <div className="flex items-center justify-between border-t border-gray-200 pt-2 dark:border-gray-700">
            <span className="text-sm text-gray-500 dark:text-gray-400">VAT (INR)</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">₹2,450.00</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">Sales Tax (US)</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">$3,120.00</span>
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-black p-6 dark:bg-black">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              className={feature.className}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            >
              {feature.children}
            </FeatureCard>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
