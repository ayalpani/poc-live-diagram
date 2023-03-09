import "./App.css";
import { Excalidraw } from "@excalidraw/excalidraw";
import { loadFromBlob } from "@excalidraw/excalidraw";
import { useEffect, useState } from "react";
import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types/types";

function App() {
  const [isRealtimeView, setIsRealtimeView] = useState(true);
  const [excalidrawAPI, setExcalidrawAPI] =
    useState<ExcalidrawImperativeAPI | null>(null);

  useEffect(() => {
    const loadScene = async () => {
      if (!isRealtimeView) {
        return;
      }

      if (excalidrawAPI) {
        const response = await fetch("/.netlify/functions/realtime-excalidraw");
        const blob = await response.blob();
        const scene = await loadFromBlob(blob, null, null);
        excalidrawAPI.updateScene(scene);
      }
    };

    loadScene();

    const interval = setInterval(() => loadScene(), 1000);

    return () => clearInterval(interval);
  }, [excalidrawAPI, isRealtimeView]);

  return (
    <div className="App">
      <Excalidraw
        ref={(api: ExcalidrawImperativeAPI) => setExcalidrawAPI(api)}
      />
      <div
        onClick={() => setIsRealtimeView((rtv) => !rtv)}
        className="RealtimeToggleButton"
      >
        <div>
          Turn Realtime <strong>{isRealtimeView ? "off" : "on"}</strong>
        </div>
      </div>
    </div>
  );
}

export default App;
