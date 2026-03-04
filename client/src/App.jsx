import axios from "axios";
import Navbar from "./components/Nav";
import Allroutes from "./routes/Allroutes";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <Allroutes />

      <Footer />
    </>
  );
}

export default App;
