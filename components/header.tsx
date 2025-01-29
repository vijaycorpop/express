'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { Menu, ChevronDown, UtensilsCrossed } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';

interface HeaderProps {
  hasSelections?: boolean;
}

const navigation = [
  { name: 'Calculator', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' }
];

const pages = [
  { name: 'Privacy', href: '/privacy' },
  { name: 'Terms', href: '/terms' }
];

export function Header({ hasSelections = false }: HeaderProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-[1400px] items-center px-4">
        <div className="flex items-center md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="-ml-3">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <SheetHeader className="mb-4">
                <SheetTitle>Navigation</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-3">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "text-base transition-colors hover:text-foreground/80",
                      pathname === item.href ? "text-foreground" : "text-foreground/60"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="h-px bg-border my-2" />
                {pages.map((page) => (
                  <Link
                    key={page.href}
                    href={page.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "text-sm transition-colors hover:text-foreground/80",
                      pathname === page.href ? "text-foreground" : "text-foreground/60"
                    )}
                  >
                    {page.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex flex-1 items-center justify-between">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/" className="flex items-center space-x-2">
              <UtensilsCrossed className="h-6 w-6" />
              <span className="font-bold text-base sm:text-lg">
                Panda Express Nutrition
              </span>
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "transition-colors hover:text-foreground/80",
                    pathname === item.href ? "text-foreground" : "text-foreground/60"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>

          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="hidden md:flex">
                  Pages
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {pages.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link href={item.href}>{item.name}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
