# פרויקט סיום קורס FitPalWeb

## דרישות הפרויקט

### טכנולוגיות נדרשות

- צד שרת: **Node.js** עם **TypeScript** ו- **MongoDB**
- צד לקוח: **React** עם TypeScript
- יש להשתמש ב- **JWT** כולל **Refresh Token**
- יש לעבוד עם **Git** בשיטת **branch and pull request**
- **Swagger** לתיעוד ה- API
- **Unit Tests** לכל ה- API (פרט לשימוש ב- API חיצוני)
- שימוש ב- **PM2** לניהול התהליך בשרת
- **Docker** (אם נלמד בקורס)
- **HTTPS** לכל חלקי המערכת

## תכולת הפרויקט

### התחברות

- הרשמה ולוגאין עם שם משתמש וסיסמה
- התחברות עם ספק חיצוני (Google/Facebook)
- שמירת משתמש מחובר
- אפשרות להתנתק

### מסך פרטי משתמש

- הצגת פרטי משתמש כולל תמונה
- הצגת הפוסטים של המשתמש
- עריכת התמונה ושם המשתמש

### הצגת תכנים

- הצגת תכנים ממקור חיצוני (כגון **Gemini**, **ChatGPT**)
- ניהול **Rate Limit** למניעת חריגות בבקשות API

### שיתוף תכנים

- העלאת תוכן (טקסט + תמונה)
- צפייה בתכנים של אחרים
- עריכה ומחיקה של תוכן שהועלה
- סינון תוכן אישי
- גלילת תכנים עם **Paging**
- תגובות על פוסטים (מוצגות במסך נפרד עם מונה תגובות במסך הראשי)
- סימון פוסטים נבחרים (Like) עם שמירה ב- DB

### דרישות נוספות

- **Git** – קומיטים קטנים, עבודה בצוותים עם **Pull Request**
- **Swagger** – תיעוד מלא של ה- API
- **Unit Testing** – בדיקות לכל ה- API (למעט API חיצוניים)
- **MongoDB בלבד**
- **שמירת תמונות בשרת** ולא ב- DB או שירות חיצוני
- העלאת הפרויקט לשרת של המכללה עם דומיין ייעודי
- **מוד production בלבד** עם `NODE_ENV=production`
- **MongoDB מאובטח** עם שם משתמש וסיסמה

### תוספת לקבוצות גדולות (3-4 מפתחים)

- **Socket.io** לצ'אט בין משתמשים
- שמירת הצ'אט ב- DB
- בחירת משתמש לשיחה מתוך מסך פרטי משתמש

### הגשת הפרויקט

- **העלאה למודל יום לפני ההגנה**
- **קישור ל- GitHub** וקישור לסרטון הדגמה
- הגשה בהתאם להנחיות המודל
- **עיצוב מוקפד** – צבעים, רקעים, ניצול שטח מסך
