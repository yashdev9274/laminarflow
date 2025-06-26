"use client";
import RedirectButton from "@/app/components/redirectButton";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/navbar/resizeableNavbar";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect } from "react";

export function NavbarDemo() {

  const { data: session } = useSession();

  const navItems = [
    {
      name: "Features",
      link: "#features",
    },
    {
      name: "Pricing",
      link: "/pricing",
    },
    {
      name: "Contact",
      link: "mailto:yashdev.yvd@gmail.com",
    },
    {
      name: "Blog",
      link: "/blog",
    },
    {
      name: "Contribute",
      link: "https://git.new/laminarflow",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="relative w-full border">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4 ml-7">
            <NavbarButton className="bg-hidden text-white" variant="secondary">
              <Link
                href={session?'/dashboard':"/login"}
              >
                {session?'Login':'Get Started'}
              </Link>
              
            </NavbarButton>
            <NavbarButton variant="primary" className="rounded bg-white text-black font-bold" href = "https://cal.link/LF-Founder-chat">Book a call</NavbarButton>
            {/* <RedirectButton text="Contact for Demo" href = "https://cal.link/LF-Founder-chat" className="align-right rounded" /> */}
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                <Link
                  href={session?'/dashboard':"/login"}
                >
                  {session?'Login':'Get Started'}
                </Link>
                Login
              </NavbarButton>
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Book a call
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
      {/* <DummyContent /> */}

      {/* Navbar */}
    </div>
  );
}
