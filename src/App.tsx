import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import TagContainer from "./components/TagContainer";

const queryClient = new QueryClient({});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App p-8">
        <TagContainer />
      </div>
    </QueryClientProvider>
  );
}

export default App;
