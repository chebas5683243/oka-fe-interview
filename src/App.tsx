import { useState } from "react";
import { Challenge } from "./components/challenge";
import { Button } from "./components/ui/button";

function App() {
  const [selectedChallenge, setSelectedChallenge] = useState<number>(0);

  function onChangeChallenge(value: number) {
    setSelectedChallenge(value);
  }

  if (selectedChallenge !== 0)
    return (
      <main className="w-full mx-auto px-10">
        <Button
          className="w-fit mt-10 bg-inherit text-primary shadow-none hover:underline hover:bg-inherit"
          onClick={() => onChangeChallenge(0)}
        >
          {"<<"} Back
        </Button>
        {selectedChallenge === 1 ? <Challenge1 /> : <Challenge2 />}
      </main>
    );

  return (
    <main className="flex flex-col gap-8 max-w-7xl w-[1280px] mx-auto py-8">
      <h1 className="text-4xl font-bold text-center">Oka Challenge</h1>
      <section className="flex flex-col items-center gap-4 w-full">
        <ul className="flex flex-col gap-5 list-disc">
          <li
            className="underline text-blue-600 cursor-pointer"
            onClick={() => onChangeChallenge(1)}
          >
            Challenge 1
          </li>
          <li
            className="underline text-blue-600 cursor-pointer"
            onClick={() => onChangeChallenge(2)}
          >
            Challenge 2
          </li>
        </ul>
      </section>
    </main>
  );
}

function Challenge1() {
  return <Challenge />;
}

function Challenge2() {
  return <Challenge enableLocationQuery />;
}

export default App;
