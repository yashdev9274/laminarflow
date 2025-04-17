"use client";

import { Github, Twitter } from "lucide-react";
import Link from "next/link";
// import { Discord, GitHub, Twitter } from "../icons/icons";

const socialLinks = [
  {
    name: "GitHub",
    href: "https://git.new/laminarflow",
    icon: Github,
    ariaLabel: "GitHub"
  },
  {
    name: "Twitter",
    href: "https://dub.sh/yashdew",
    icon: Twitter,
    ariaLabel: "X (Twitter)"
  }
];

export default function Footer() {
  return (
    <footer className="w-full py-11 mt-20 bg-black/20 backdrop-blur-sm border-t border-gray-800/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="flex justify-center md:justify-start gap-6">
            {socialLinks.map((social) => (
              <Link 
                key={social.name}
                href={social.href} 
                target="_blank"
                aria-label={social.ariaLabel}
                className="text-gray-500 hover:text-white dark:text-gray-400 dark:hover:text-white transition-colors duration-200"
              >
                <social.icon className="h-5 w-5 hover:scale-110 transition-transform" />
                <span className="sr-only">{social.ariaLabel}</span>
              </Link>
            ))}
          </div>

          <div className="flex justify-center gap-8 text-sm">
            <Link 
              href="/" 
              className="text-gray-400 font-mono hover:text-white transition-colors duration-200"
            >
              About
            </Link>
            <Link 
              href="/" 
              className="text-gray-400 font-mono hover:text-white transition-colors duration-200"
            >
              User-Guide
            </Link>
            <Link 
              href="/" 
              className="text-gray-400 font-mono hover:text-white transition-colors duration-200"
            >
              Use Cases
            </Link>
            <Link 
              href="https://github.com/yashdev9274/laminarflow?tab=readme-ov-file#contributing" 
              className="text-gray-400 font-mono hover:text-white transition-colors duration-200"
            >
              Contributors
            </Link>
          </div>

          <div className="text-center md:text-right text-sm font-mono text-gray-400">
            LaminarFlow Inc. © 2025
            <div className="font-mono">
              Made with ❤️ by Yash
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-xs font-mono text-center text-gray-400">
            India
        </div>
      </div>
    </footer>
  );
} 