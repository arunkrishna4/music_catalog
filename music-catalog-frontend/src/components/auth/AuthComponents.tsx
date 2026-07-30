
import {
  useId,
  useState,
  type ComponentProps,
  type ElementType,
  type ReactNode,
} from "react";
import {
  Eye,
  EyeOff,
  Headphones,
  LoaderCircle,
  Lock,
  Music2,
  Waves,
} from "lucide-react";

import { Input } from "../ui/input";
import { cn } from "../../lib/utils";

type AuthLayoutProps = {
  children: ReactNode;
};

type AuthCardProps = {
  title: string;
  children: ReactNode;
};

type TextInputProps = {
  label: string;
  icon: ElementType;
  error?: string;
} & Omit<ComponentProps<"input">, "className">;

type PasswordInputProps = {
  label: string;
  error?: string;
  showStrength?: boolean;
} & Omit<ComponentProps<"input">, "type" | "className">;

type AuthFooterProps = {
  prompt: string;
  action: string;
  href: string;
};

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FAFC] via-[#F3F7FF] to-[#EEF4FF]">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center gap-22 px-8 py-10">
        <MusicArtwork />
        {children}
      </div>
    </div>
  );
}

export function AuthCard({ title, children }: AuthCardProps) {
  return (
    <section className="w-full max-w-md rounded-3xl border border-[#E2E8F0] bg-white/95 p-10 shadow-xl shadow-[#0F172A]/5 backdrop-blur-sm">
      <Logo />

      <div className="mt-8 space-y-2">
        <h1 className="text-[30px] font-bold tracking-tight text-[#0F172A]">
          {title}
        </h1>
        <p className="text-[15px] leading-7 text-[#64748B]">
          Manage your personal music collection effortlessly.
        </p>
      </div>

      <div className="mt-8">{children}</div>
    </section>
  );
}

export function Logo() {
  return (
    <div className="flex items-center gap-5">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#2563EB] text-white shadow-md shadow-[#2563EB]/20">
        <Music2 className="h-7 w-7" aria-hidden="true" />
      </div>

      <div className="space-y-1">
        <p className="text-lg font-semibold text-[#0F172A]">Music Catalog</p>
        <p className="text-sm text-[#64748B]">
          Organize • Rate • Discover
        </p>
      </div>
    </div>
  );
}

export function TextInput({
  label,
  icon: Icon,
  error,
  id,
  ...props
}: TextInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className="space-y-2">
      <label
        htmlFor={inputId}
        className="text-sm font-medium text-[#0F172A]"
      >
        {label}
      </label>

      <div className="relative">
        <Icon
          className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#64748B]"
          aria-hidden="true"
        />

        <Input
          id={inputId}
          className="h-12 rounded-xl border-[#CBD5E1] pl-11 focus:border-[#2563EB] focus:ring-2 focus:ring-[#DBEAFE] transition-all duration-200"
          aria-invalid={Boolean(error)}
          {...props}
        />
      </div>

      {error ? (
        <p className="text-sm text-[#EF4444]">{error}</p>
      ) : null}
    </div>
  );
}

export function PasswordInput({
  label,
  error,
  showStrength,
  id,
  ...props
}: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false);
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className="space-y-2">
      <label
        htmlFor={inputId}
        className="text-sm font-medium text-[#0F172A]"
      >
        {label}
      </label>

      <div className="relative">
        <Lock
          className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#64748B]"
          aria-hidden="true"
        />

        <Input
          id={inputId}
          type={isVisible ? "text" : "password"}
          className="h-12 rounded-xl border-[#CBD5E1] pl-11 pr-12 focus:border-[#2563EB] focus:ring-2 focus:ring-[#DBEAFE] transition-all duration-200"
          aria-invalid={Boolean(error)}
          {...props}
        />

        <button
          type="button"
          className="absolute right-3 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-[#64748B] transition duration-200 hover:bg-[#EFF6FF] hover:text-[#0F172A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
          onClick={() => setIsVisible((value) => !value)}
          aria-label={isVisible ? "Hide password" : "Show password"}
        >
          {isVisible ? (
            <EyeOff className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Eye className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
      </div>

      {showStrength ? <PasswordStrength /> : null}

      {error ? (
        <p className="text-sm text-[#EF4444]">{error}</p>
      ) : null}
    </div>
  );
}

export function AuthFooter({ prompt, action, href }: AuthFooterProps) {
  return (
    <p className="text-center text-[15px] text-[#64748B]">
      {prompt}{" "}
      <a
        href={href}
        className="font-semibold text-[#2563EB] transition duration-200 hover:text-[#1D4ED8]"
      >
        {action}
      </a>
    </p>
  );
}

export function ForgotPasswordLink() {
  return (
    <div className="flex justify-end">
      <a
        href="#"
        className="text-[13px] font-medium text-[#2563EB] transition duration-200 hover:text-[#1D4ED8]"
      >
        Forgot Password
      </a>
    </div>
  );
}

export function ButtonSkeleton() {
  return (
    <div className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-sm font-medium text-[#64748B]">
      <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
      Loading
    </div>
  );
}

function PasswordStrength() {
  return (
    <div className="space-y-2 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-3">
      <div className="flex items-center justify-between text-xs font-medium text-[#64748B]">
        <span>Password strength</span>
        <span>Good</span>
      </div>

      <div className="flex gap-1">
        <span className="h-1.5 flex-1 rounded-full bg-[#2563EB]" />
        <span className="h-1.5 flex-1 rounded-full bg-[#2563EB]" />
        <span className="h-1.5 flex-1 rounded-full bg-[#2563EB]" />
        <span className="h-1.5 flex-1 rounded-full bg-[#E2E8F0]" />
      </div>

      <p className="text-xs text-[#64748B]">
        Use 8+ characters with a number and symbol.
      </p>
    </div>
  );
}

function MusicArtwork() {
  const albums = [
    { color: "bg-[#DBEAFE]", title: "1989" },
    { color: "bg-[#DCFCE7]", title: "Fearless" },
    { color: "bg-[#FEF3C7]", title: "Lover" },
    { color: "bg-[#FCE7F3]", title: "Midnights" },
    { color: "bg-[#E0E7FF]", title: "Folklore" },
    { color: "bg-[#F1F5F9]", title: "Evermore" },
  ];

  return (
    <aside className="relative hidden h-[630px] w-[550px] overflow-hidden rounded-[32px] border border-[#E2E8F0] bg-white shadow-xl shadow-[#0F172A]/5 lg:block">
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFFFFF] via-[#F8FAFC] to-[#EFF6FF]" />

      <div className="relative z-10 flex h-full flex-col p-10">
        <div className="max-w-sm space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#DBEAFE] bg-[#EFF6FF] px-3 py-1 text-sm font-medium text-[#2563EB]">
            <Headphones className="h-4 w-4" aria-hidden="true" />
            Curated listening
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-[#0F172A]">
              Albums, notes, and memories
            </h2>
            <p className="text-base leading-7 text-[#64748B]">
              Keep every favorite release in one place, track what you love, and
              revisit the music that matters most.
            </p>
          </div>
        </div>

        <div className="relative mt-8 flex-1">
          <div className="absolute left-6 top-4 grid grid-cols-3 gap-2">
            {albums.map((album, index) => (
              <div
                key={album.title}
                className={cn(
                  "h-20 w-20 rounded-2xl border border-white/80 shadow-sm flex items-center justify-center text-sm font-semibold text-[#334155]",
                  album.color,
                  index === 1 && "translate-y-8",
                  index === 2 && "translate-y-2",
                  index === 3 && "-translate-y-2",
                  index === 4 && "translate-y-6",
                )}
              >
                {album.title}
              </div>
            ))}
          </div>

          <div className="absolute right-8 top-8 h-52 w-52 animate-[spin_20s_linear_infinite] rounded-full border-[16px] border-[#0F172A] bg-[#1E293B] shadow-md">
            <div className="absolute inset-8 rounded-full border border-white/10 bg-[#334155]" />
            <div className="absolute inset-[70px] rounded-full bg-[#DBEAFE]" />
            <div className="absolute inset-[92px] rounded-full bg-white" />
          </div>

          <div className="absolute bottom-5 left-0 right-0 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-[#0F172A]">
                  Recently cataloged
                </p>
                <p className="text-xs text-[#64748B]">
                  Blue Note essentials
                </p>
              </div>

              <Waves className="h-5 w-5 text-[#2563EB]" aria-hidden="true" />
            </div>

            <div className="flex h-14 items-end gap-3">
              {[22, 36, 18, 46, 28, 50, 32, 40, 20, 48, 26, 42].map(
                (height, index) => (
                  <span
                    key={`${height}-${index}`}
                    className="w-full rounded-full bg-[#2563EB]/20"
                    style={{ height }}
                  />
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
