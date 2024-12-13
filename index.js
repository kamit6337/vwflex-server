import dotenv from "dotenv";
dotenv.config();
import { environment } from "./utils/environment.js";
import app from "./app.js";
const PORT = environment.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is connected on port ${PORT}`);
});
