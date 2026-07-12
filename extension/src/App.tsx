
import './App.css'
import useCurrentVideo from './popup/hooks/useCurrentVideo';


function App() {
  const video = useCurrentVideo()

  return (
    <div className="w-[400px] h-[500px] bg-zinc-950 text-white">
      <header className="border-b border-zinc-800 p-4">
        <h1 className="text-xl font-bold">
          TubeMind AI
        </h1>
      </header>

        <pre>
          {JSON.stringify(video, null, 2)}
        </pre>


    </div>
  );
}

export default App
