import express from "express";
import 'dotenv/config';
import cors from "cors";
import appRoutes from "./src/routes/portfolio.routes.js";
import logger from "./src/utils/logger.js";

const app = express();

app.use((req, res, next) => {
  // המידלוור הזה נועד ללוג כל בקשה נכנסת לשרת. הוא מדפיס את שיטת הבקשה (GET, POST, וכו') ואת כתובת ה-URL המקורית של הבקשה.
  logger.info(`Incoming Request: ${req.method} ${req.originalUrl}`);
  
  // המשך לשרשור המידלוור הבא בשרשרת. אם לא נקרא ל-next(), הבקשה תישאר במצב "תלוי" ולא תמשיך לעיבוד הבא.
  next();
});



app.use(express.json());
app.use(cors());

app.use("/api", appRoutes);



const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});