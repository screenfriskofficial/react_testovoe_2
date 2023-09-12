import ReactDOM from "react-dom/client";
import "../shared/index.scss";
import { Provider } from "./providers";

ReactDOM.createRoot(document.getElementById("root")!).render(<Provider />);
