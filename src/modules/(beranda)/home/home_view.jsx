import { Button } from "@/components/ui/button";

function HomeView() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex flex-1 flex-col items-center justify-center bg-[#383E4E]">
        <div className="mb-7 bg-[#FF7200] rounded-full px-7 py-2 w-75 text-white font-bold text-center">
          ✦ Muhammad Gavin Arasyi ✦
        </div>
        <h1 className="italic text-center font-bold text-5xl text-white">
          Setiap pertanyaan <br />
          punya tantangan,
        </h1>
        <h1 className="italic text-center font-bold text-5xl mb-5 text-[#18F384]">
          setiap jawaban <br />
          membawa pengetahuan
        </h1>
        <h3 className="text-center mb-10 text-[#18F384]">
          Yuk, uji wawasanmu melalui kuis yang seru dan interaktif!
        </h3>

        <Button
          type="submit"
          className="w-1/2 bg-[#FF7200] inline-flex min-h-11 rounded-lg font-bold transition-all"
        >
          Mulaikan Quiz mu!
        </Button>
      </div>
      <div className="flex flex-col h-40 shrink-0 bg-[#222222] justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <div className="flex gap-1">
            <p className="text-[#FF7200] font-bold">Open</p>
            <p className="text-white font-bold">Trivia</p>
          </div>
          <p className="text-white">
            Uji Pengetahuanmu, Raih Skor Terbaikmu ✦ Dibuat dengan ♥ di
            Indonesia
          </p>
          <p className="text-white">© 2026 Open Trivia</p>
        </div>
      </div>
    </main>
  );
}

export default HomeView;
