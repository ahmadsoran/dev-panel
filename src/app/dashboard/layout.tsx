export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-2">
      <header>
        <h1>hello world</h1>
      </header>

      <main>{children}</main>
    </div>
  );
}
