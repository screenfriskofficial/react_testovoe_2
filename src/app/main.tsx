import ReactDOM from "react-dom/client";
import "../shared/index.scss";
import "react-toastify/dist/ReactToastify.css";

import { Provider } from "./providers";

ReactDOM.createRoot(document.getElementById("root")!).render(<Provider />);
