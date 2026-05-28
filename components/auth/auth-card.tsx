'use client';

export default function AuthCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl shadow-lg p-8 border border-border">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground font-sans">{title}</h1>
            <p className="text-sm text-muted-foreground mt-2">{description}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
