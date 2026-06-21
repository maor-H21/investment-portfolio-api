// ייבוא ספריית winston ללוגים
import winston from 'winston';

// הגדרת רמות לוג מותאמות אישית עם צבעים
const customLevels = {
  levels: {
    error: 0,   // רמה 0 - שגיאות קריטיות (הכי חשוב)
    warn: 1,    // רמה 1 - אזהרות
    info: 2,    // רמה 2 - מידע כללי
    http: 3,    // רמה 3 - בקשות HTTP
    debug: 4,   // רמה 4 - מידע לדיבוג (הכי פחות חשוב)
  },
  colors: {
    error: 'red',      // שגיאות בצבע אדום
    warn: 'yellow',    // אזהרות בצבע צהוב
    info: 'green',     // מידע כללי בצבע ירוק
    http: 'magenta',   // בקשות HTTP בצבע מגנטה
    debug: 'blue',     // דיבוג בצבע כחול
  },
};

// הוספת הצבעים המותאמים אישית לספריית winston
winston.addColors(customLevels.colors);

// פונקציה ליצירת לוגר בסיסי עם הגדרות ברירת מחדל
const createBaseLogger = () => {
  return winston.createLogger({
    levels: customLevels.levels,     // שימוש ברמות הלוג המותאמות אישית
    format: winston.format.combine(  // שילוב פורמטים שונים ללוג
      winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }), // הוספת חותמת זמן בפורמט יום-חודש-שנה שעה:דקה:שנייה
      winston.format.colorize({ all: true }),  // הוספת צבעים לכל חלקי הלוג
      winston.format.printf((info) => `${info.timestamp} [${info.level}]: ${info.message}`) // פורמט הלוג הסופי
    ),
    transports: [  // הגדרת יעדי הפלט של הלוגים
      new winston.transports.Console({ level: 'debug' }),  // פלט לקונסול עם רמה debug ומעלה
      new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),  // פלט לקובץ error.log עם רמת error בלבד
      new winston.transports.File({ filename: 'logs/combined.log' }),  // פלט לקובץ combined.log עם כל הרמות
    ],
  });
};

// יצירת מופע לוגר בסיסי
const baseLogger = createBaseLogger();

// פונקציה ליצירת לוגר עם הקשר מותאם אישית
export const createLogger = (context) => {
  return {
    error: (message) => baseLogger.error(`${context}: ${message}`),   // פונקציית שגיאה עם הקשר
    warn: (message) => baseLogger.warn(`${context}: ${message}`),     // פונקציית אזהרה עם הקשר
    info: (message) => baseLogger.info(`${context}: ${message}`),     // פונקציית מידע עם הקשר
    http: (message) => baseLogger.http(`${context}: ${message}`),     // פונקציית HTTP עם הקשר
    debug: (message) => baseLogger.debug(`${context}: ${message}`),   // פונקציית דיבוג עם הקשר
  };
};

// לוגר ברירת מחדל ללא הקשר מותאם אישית
const defaultLogger = {
  error: (message) => baseLogger.error(message),   // פונקציית שגיאה ברירת מחדל
  warn: (message) => baseLogger.warn(message),     // פונקציית אזהרה ברירת מחדל
  info: (message) => baseLogger.info(message),     // פונקציית מידע ברירת מחדל
  http: (message) => baseLogger.http(message),     // פונקציית HTTP ברירת מחדל
  debug: (message) => baseLogger.debug(message),   // פונקציית דיבוג ברירת מחדל
};

// ייצוא לוגר ברירת המחדל
export default defaultLogger;
