import { Button } from "@/components/ui/button";

function BuildError({ handleRetry, errorMessage }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#383E4E] px-4">
      <section className="w-full max-w-md rounded-2xl bg-white p-8 text-center text-[#262A35]">
        <h1 className="text-2xl font-bold">Soal belum dapat dimuat</h1>
        <p className="mt-3 text-sm text-gray-600">{errorMessage}</p>
        <Button
          type="button"
          onClick={handleRetry}
          className="mt-6 min-h-11 w-full bg-[#FF7200] font-bold text-white"
        >
          Coba Lagi
        </Button>
      </section>
    </main>
  );
}

export default BuildError;
