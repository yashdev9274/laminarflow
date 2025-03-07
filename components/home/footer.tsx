"use client";

import { Github, Twitter } from "lucide-react";
import Link from "next/link";
// import { Discord, GitHub, Twitter } from "../icons/icons";

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/yashdev9274",
    icon: Github,
    ariaLabel: "GitHub"
  },
  {
    name: "Twitter",
    href: "https://x.com/dew_yashtwt",
    icon: Twitter,
    ariaLabel: "X (Twitter)"
  }
];

export default function Footer() {
  return (
    <footer className="w-full mt-16 bg-black/20 backdrop-blur-sm border-t border-gray-800/20">
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="flex justify-center md:justify-start gap-6">
            {socialLinks.map((social) => (
              <Link 
                key={social.name}
                href={social.href} 
                target="_blank"
                aria-label={social.ariaLabel}
                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-200"
              >
                <social.icon className="h-5 w-5 hover:scale-110 transition-transform" />
                <span className="sr-only">{social.ariaLabel}</span>
              </Link>
            ))}
          </div>

          <div className="flex justify-center gap-8 text-sm">
            <Link 
              href="/" 
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              About
            </Link>
            <Link 
              href="/" 
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              Privacy
            </Link>
            <Link 
              href="/" 
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              Terms
            </Link>
            <Link 
              href="/" 
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              Contributors
            </Link>
          </div>

          <div className="text-center md:text-right text-sm text-gray-400">
            D3Flo Inc. © 2025
          </div>
        </div>
        
        <div className="mt-6 text-xs text-center text-gray-400">
            India
        </div>
      </div>
    </footer>
  );
} 