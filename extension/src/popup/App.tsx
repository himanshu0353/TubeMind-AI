import  useCurrentVideo from "./hooks/useCurrentVideo";

function App() {
    
    const video = useCurrentVideo()
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