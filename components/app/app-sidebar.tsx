"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  BriefcaseBusiness,
  Building2,
  Calculator,
  ChevronsUpDown,
  Compass,
  FileSearch,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  Map,
  MessageSquareQuote,
  Settings,
  User as UserIcon,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Logo } from "@/components/logo";
import { useApp } from "@/lib/store";
import { getCareer } from "@/lib/data/careers";
import { getRoadmapProgress, initials } from "@/lib/progress";

export const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/careers", label: "Career GPS", icon: Compass },
  { href: "/scanner", label: "Scan CV & Gap", icon: FileSearch },
  { href: "/calculator", label: "Kalkulator Gaji", icon: Calculator },
  { href: "/roadmap", label: "Roadmap", icon: Map },
  { href: "/simulator", label: "Work Simulator", icon: BriefcaseBusiness },
  { href: "/portfolio", label: "Portofolio", icon: FolderKanban },
  { href: "/jobs", label: "Peluang Kerja", icon: Building2 },
  { href: "/interview", label: "Mock Interview", icon: MessageSquareQuote },
  { href: "/progress", label: "Progres", icon: BarChart3 },
];

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, data, logout } = useApp();
  const { setOpenMobile } = useSidebar();
  const career = getCareer(data.activeCareer);
  const progress = career ? getRoadmapProgress(career, data) : null;

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  const onLogout = () => {
    logout();
    router.replace("/");
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Link href="/dashboard" className="flex h-10 items-center px-1 group-data-[collapsible=icon]:justify-center">
          <Logo className="group-data-[collapsible=icon]:[&>span]:hidden" />
        </Link>
        {career && progress && (
          <Link
            href="/roadmap"
            onClick={() => setOpenMobile(false)}
            className="mt-2 rounded-xl border border-sidebar-border bg-background p-3 transition-colors hover:border-primary/40 group-data-[collapsible=icon]:hidden"
          >
            <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Jalur aktif</p>
            <div className="mt-1 flex items-center gap-2">
              <career.icon className="h-4 w-4 text-primary" />
              <span className="truncate text-sm font-semibold text-foreground">{career.title}</span>
            </div>
            <Progress value={progress.percent} className="mt-2 h-1.5" />
            <p className="mt-1 text-[11px] text-muted-foreground">{progress.percent}% roadmap selesai</p>
          </Link>
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={isActive(item.href)} tooltip={item.label}>
                    <Link href={item.href} onClick={() => setOpenMobile(false)}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Akun</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/settings")} tooltip="Profil & Pengaturan">
                  <Link href="/settings" onClick={() => setOpenMobile(false)}>
                    <Settings />
                    <span>Profil & Pengaturan</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarFallback className="rounded-lg bg-primary text-xs font-semibold text-primary-foreground">
                      {initials(user?.name ?? "")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user?.name}</span>
                    <span className="truncate text-xs text-muted-foreground">{user?.email}</span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" align="start" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <p className="text-sm font-semibold">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/settings">
                    <UserIcon className="h-4 w-4" /> Profil saya
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/portfolio">
                    <FolderKanban className="h-4 w-4" /> Portofolio
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout} className="text-destructive focus:text-destructive">
                  <LogOut className="h-4 w-4" /> Keluar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
