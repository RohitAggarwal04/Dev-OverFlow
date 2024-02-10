export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-auth-light  dark:bg-auth-dark bg-cover bg-center ">
      {children}
    </main>
  );
}
