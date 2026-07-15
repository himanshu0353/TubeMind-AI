import  useCurrentVideo from "./hooks/useCurrentVideo";
// import { useTranscript } from "./hooks/useTranscript";

function App() {
    
    const video = useCurrentVideo() ;
    // const transcript = useTranscript();
    return (
        <div>
            TubeMind AI!
            <pre>
                {JSON.stringify(video, null, 2)}
            </pre>
        </div>
    );
}

export default App;