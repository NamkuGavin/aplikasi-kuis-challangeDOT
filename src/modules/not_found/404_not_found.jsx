function NotFoundPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black">
      <div className="flex gap-5 items-center">
        <h1 className="text-white font-bold text-2xl">404</h1>
        <p className="text-white text-2xl">|</p>
        <h2 className="text-white">This page could not be found</h2>
      </div>
    </main>
  );
}

export default NotFoundPage;
