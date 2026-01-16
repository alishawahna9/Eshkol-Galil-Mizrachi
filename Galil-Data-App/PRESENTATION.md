# 📊 מערכת תחקור נתונים - אשכול גליל מזרחי
## מצגת מקיפה להצגה

---

## 🎯 **1. מבט כללי על הפרויקט**

### **מטרת המערכת:**
מערכת אינטראקטיבית לניתוח וחקירת נתונים דמוגרפיים ואוכלוסיה של רשויות מקומיות באזור הגליל המזרחי, עם יכולות חיפוש חכמות, ויזואליזציה מתקדמת, וצ'אטבוט מונע AI.

### **קהל יעד:**
- מחקרים אקדמיים
- מתכנני ערים ורשויות מקומיות
- אנליסטים דמוגרפיים
- קובעי מדיניות

---

## 🛠️ **2. סטאק טכנולוגי (Tech Stack)**

### **Frontend:**
- **Next.js 16** (App Router) - פריימוורק React עם Server-Side Rendering
- **React 19** - ספריית UI
- **TypeScript** - שפת תכנות מובנית
- **Tailwind CSS v4** - עיצוב responsive ומודרני
- **Radix UI** - קומפוננטות נגישות ברמה גבוהה

### **Backend & Database:**
- **PostgreSQL** - מסד נתונים יחסי
- **Prisma ORM** - ניהול וגישה למסד נתונים
- **pgvector** - חיפוש וקטורי (Vector Search) למידע סמנטי

### **AI & Visualization:**
- **Google Gemini AI** - מודל שפה לצ'אטבוט חכם
- **Leaflet + React-Leaflet** - מפות אינטראקטיביות
- **Chart.js + Recharts** - גרפים וויזואליזציות

---

## 📂 **3. מבנה הפרויקט**

```
Galil-Data-App/
├── app/                        # Next.js App Router
│   ├── api/                    # API Routes (Backend)
│   │   ├── authorities/        # נתוני רשויות
│   │   ├── chat/              # Chatbot endpoint
│   │   ├── dataexplorer/      # תחקור נתונים
│   │   └── population/        # נתוני אוכלוסיה
│   ├── authorities/           # עמוד רשויות
│   ├── dataexplorer/          # עמוד חקירת נתונים
│   └── lifeindex/             # עמוד מדד החיים
├── components/                # React Components
│   ├── authorities/           # קומפוננטות רשויות
│   ├── dataexplorer/         # קומפוננטות Data Explorer
│   └── ui/                   # קומפוננטות UI בסיסיות
├── lib/                      # לוגיקה עסקית
│   ├── chat-service.ts       # שירות Chatbot
│   ├── vector-service.ts     # חיפוש וקטורי
│   └── authorities-service.ts # שירותי רשויות
├── prisma/                   # Database Schema & Seeds
│   ├── schema.prisma         # הגדרות מסד נתונים
│   └── *.csv                 # קבצי נתונים גולמיים
└── scripts/                  # סקריפטים עזר
```

---

## 💾 **4. מודל הנתונים (Database Schema)**

### **טבלאות עיקריות:**

#### **AuthorityGeneralInfo** - מידע כללי על רשויות
- שם, סמל, מחוז
- מעמד מוניציפלי
- מרחק מתל אביב
- שטח, מספר חברי מועצה
- **embedding vector(768)** - לחיפוש סמנטי

#### **AuthorityDemographics** - נתונים דמוגרפיים
- פילוח גילאים (0-4, 5-9, 10-14... 65+)
- צפיפות אוכלוסין
- פילוח מגדר (גברים/נשים)
- פילוח אתני (יהודים, ערבים, מוסלמים, נוצרים, דרוזים)

#### **PopulationData** - היסטוריה אוכלוסיה
- נתוני אוכלוסיה לפי שנה (2002-2023)
- מאפשר ניתוח טרנדים לאורך זמן

---

## 🎨 **5. תכונות עיקריות**

### **א. עמוד רשויות (Authorities Page)**

#### **מפה אינטראקטיבית:**
- **Leaflet Maps** - מציגה את כל הרשויות בגליל המזרחי
- לחיצה על רשות במפה מסננת את הטבלה
- תמיכה במצב כהה/בהיר
- Zoom, Pan, Scroll wheel

#### **טבלה דינמית:**
- רשימת רשויות עם נתונים מסוננים
- גלילה פנימית
- הדגשת רשות נבחרת
- 16 רשויות בסך הכל (צפת, קריית שמונה, גולן...)

#### **פאנל סינון מתקדם:**
- **חיפוש טקסט** - סינון לפי שם רשות
- **בחירת מדד:**
  - אוכלוסיה כוללת
  - יהודים ואחרים
  - ערבים
  - מוסלמים
- **סינון לפי שנה:** 2002-2023
- **פילוח קבוצות גיל:** 0-4, 5-9... 65+
- **פילוח מגדר:** גברים/נשים
- **כפתור איפוס** - מנקה את כל הסינונים

#### **לשוניות (Tabs):**
1. **מפה** - מפה + טבלה
2. **גרף השוואה** - השוואת רשויות
3. **מגמה** - טרנד אוכלוסיה לרשות ספציפית
4. **מגמה מאוחדת** - טרנדים של כל הרשויות

---

### **ב. צ'אטבוט חכם (AI Chatbot)**

#### **טכנולוגיה:**
- **Google Gemini 2.0 Flash** - מודל שפה מתקדם
- **RAG (Retrieval Augmented Generation):**
  - שאילתת משתמש → המרה לוקטור (embedding)
  - חיפוש וקטורי במסד הנתונים (pgvector)
  - העברת נתונים רלוונטיים למודל
  - יצירת תשובה מדויקת ומבוססת מידע

#### **יכולות:**
- שאלות בשפה טבעית בעברית
- תשובות מבוססות נתונים אמיתיים
- הקשר היסטורי של שיחה
- דוגמאות שאלות:
  - "מה האוכלוסייה של צפת ב-2023?"
  - "איזו רשות הכי גדולה בגליל המזרחי?"
  - "תראה לי את הטרנד האוכלוסיה של קצרין"

#### **זרימת עבודה:**
```
שאילתה → Embedding (Google AI) → Vector Search (pgvector) 
→ Top 3 Results → Context → Gemini → תשובה
```

---

### **ג. Data Explorer - חקירת נתונים מתקדמת**

#### **תכונות:**
- סינון רב-ממדי (מדד, שנה, קבוצת גיל, מגדר)
- **טבלה מלאה** עם מיון ופילטר
- **גרפים דינמיים:**
  - Bar charts
  - Line charts
  - Stacked charts
- **פאנל תובנות (Insights)** - סטטיסטיקות מרכזיות

---

### **ד. Life Index - מדד חיים**
- גרפים וניתוחים של איכות חיים
- פילטר לפי רשות
- ויזואליזציות אינטראקטיביות

---

## 🔄 **6. ארכיטקטורה וזרימת מידע**

### **Client Side (Browser):**
```
User → React Component → API Call (fetch)
```

### **Server Side (Next.js API Routes):**
```
API Route → Prisma Client → PostgreSQL
           ↓
    JSON Response → Client
```

### **AI Chatbot Flow:**
```
User Message → /api/chat
    ↓
Embedding (Google AI)
    ↓
Vector Search (PostgreSQL + pgvector)
    ↓
Context Building
    ↓
Gemini API Call
    ↓
Response Stream → Client
```

---

## 📊 **7. קומפוננטות מרכזיות**

### **SideFilterPanel**
- פאנל סינון מרכזי עם Tabs
- ניהול state של כל הפילטרים
- Debouncing לביצועים
- עדכון URL params
- כפתור איפוס עם אנימציה

### **AuthoritiesMap**
- מפת Leaflet עם markers
- Dynamic theme switching (light/dark)
- FlyTo animation לרשות נבחרת
- Fit bounds לקואורדינטות
- CircleMarker עם popup

### **AuthoritiesResults**
- טבלה עם ScrollArea
- Header קבוע
- Sticky columns
- Loading states
- Error handling
- הדגשת שורה נבחרת

### **MapTab**
- Grid layout responsive
- קונטיינר לטבלה ולמפה
- Flexbox לניהול גובה
- כפתור "נקה" דינמי

---

## 🎨 **8. עיצוב וחוויית משתמש (UI/UX)**

### **🔴 Mobile-First Design (בעדיפות עיליונה):**
- **דיזיין מתחיל מנייד** - כל רכיב תוכנן למסך קטן תחילה
- **Responsive Hierarchy** - טבלאות הופכות לכרטיסיות בנייד
- **Touch Optimization:**
  - כפתורים גדולים (py-2.5, px-4 לפחות)
  - ריווח מספיק בין אלמנטים
  - אפשרויות קלילות לגלילה
  - Hover states ל-desktop בלבד
- **Mobile Breakpoints:**
  - sm: 640px - טלפונים קטנים
  - md: 768px - טלפונים גדולים/טבלטים
  - lg: 1024px - שולחנות עבודה
- **Performance on Mobile:**
  - Code splitting לטעינה מהירה
  - Image optimization
  - Lazy loading של מפות וגרפים
  - Minimal JavaScript bundle

### **Theme System:**
- תמיכה במצב כהה/בהיר
- CSS Variables עם oklch
- next-themes integration
- Smooth transitions

### **Responsive Design Tactics:**
- Grid: `grid-cols-1 lg:grid-cols-[520px_1fr]` - מעבר חלק מנייד לדסקטופ
- טבלה → כרטיסיה בנייד
- מסלול בעמודה בנייד, שתי עמודות בדסקטופ
- Offscreen sidebars עם hamburger בנייד

### **Accessibility:**
- Radix UI primitives
- ARIA labels
- Keyboard navigation
- Screen reader support
- RTL (right-to-left) support מלא
- Touch targets ≥ 44×44px

### **Color Palette:**
- Primary: כחול גליל (oklch 54.939% 0.17648 259.718)
- Accent: טורקיז (oklch 40.315% 0.23335 264.009)
- Background: לבן/אפור כהה
- Cards: bg-card (לבן טהור במצב בהיר)

---

## 🚀 **9. ביצועים ואופטימיזציה**

### **Next.js Optimizations:**
- **Server Components** - rendering בשרת
- **Dynamic Imports** - קוד splitting
- **Image Optimization** - next/image
- **Font Optimization** - Geist font

### **Database:**
- **Prisma Connection Pooling**
- **Indexed Columns** (symbol, name, year)
- **Vector Indexing** (pgvector HNSW)

### **Caching:**
- Next.js automatic caching
- API route caching strategies
- Browser caching headers

### **Code Splitting:**
- Dynamic import for Leaflet (SSR issue)
- Lazy loading של charts
- Route-based splitting

---

## 🔒 **10. אבטחה**

### **Environment Variables:**
```
DATABASE_URL - חיבור PostgreSQL
GEMINI_API_KEY - מפתח Google AI
```

### **API Security:**
- Server-side validation
- CORS configuration
- Rate limiting (ניתן להוסיף)
- SQL injection protection (Prisma ORM)

---

## 📈 **11. נתונים סטטיסטיים**

### **כיסוי נתונים:**
- **16 רשויות** בגליל המזרחי
- **22 שנים** של נתוני אוכלוסיה (2002-2023)
- **9 קבוצות גיל** שונות
- **5 קבוצות אתניות**
- **אלפי שורות** של נתונים

### **דוגמאות מספרים:**
- צפת: 39,179 תושבים (2023)
- קריית שמונה: 24,254 תושבים
- גולן: 21,484 תושבים

---

## 🎓 **12. תשובות לשאלות נפוצות**

### **למה Next.js ולא CRA?**
- SSR לביצועים טובים יותר
- API Routes מובנות
- File-based routing
- Image & Font optimization
- עדכון פשוט ל-production

### **למה PostgreSQL?**
- תמיכה ב-pgvector לחיפוש וקטורי
- ACID compliance
- Scalability
- JSON support
- Prisma integration מצוינת

### **למה Leaflet ולא Google Maps?**
- Open source וחינמי
- קל משקל
- תמיכה ב-OSM tiles
- אין צורך ב-API key
- Customizable לחלוטין

### **איך עובד Vector Search?**
1. טקסט → Embedding (768 dimensions)
2. שמירה ב-PostgreSQL כ-vector
3. חיפוש לפי דמיון קוסינוסי
4. החזרת Top K תוצאות הכי רלוונטיות

---

## 🛣️ **13. תהליך פיתוח**

### **Git Workflow:**
```bash
git add .
git commit -m "תיאור שינוי"
git push
```

### **Development:**
```bash
npm run dev  # הרצת שרת פיתוח
```

### **Build & Deploy:**
```bash
npm run build  # בניית production
npm start      # הרצת production
```

### **Database:**
```bash
npx prisma generate    # יצירת Prisma Client
npx prisma db push     # עדכון schema
npm run vectorize      # יצירת embeddings
```

---

## 🎯 **14. נקודות חזקות להדגשה**

✅ **📱 Mobile-First Architecture** - דיזיין וקוד מתחילים מנייד  
✅ **אינטגרציה מלאה של AI** - chatbot חכם עם RAG  
✅ **ויזואליזציה מתקדמת** - מפות, גרפים, טבלאות  
✅ **ביצועים גבוהים** - SSR, code splitting, optimization  
✅ **UX מצוין** - responsive, accessible, intuitive  
✅ **נתונים אמיתיים** - 22 שנים של דאטה  
✅ **מודרניות טכנולוגית** - Next.js 16, React 19, TypeScript  
✅ **Scalable Architecture** - מוכן להרחבה  

---

## 💡 **15. הרחבות עתידיות אפשריות**

🔮 **השוואות מתקדמות** - benchmark בין רשויות  
🔮 **תחזיות AI** - prediction של טרנדים עתידיים  
🔮 **Export Data** - ייצוא ל-Excel/CSV/PDF  
🔮 **Dashboard מנהלים** - KPIs וסטטיסטיקות  
🔮 **Alerts** - התראות על שינויים משמעותיים  
🔮 **Mobile App** - אפליקציית סלולר  

---

## 📞 **טיפים להצגה:**

1. **הכן דמו חי** - הצג את המערכת בזמן אמת
2. **הכן שאלות לצ'אטבוט** - דוגמאות מרשימות
3. **הסבר את ה-Tech Stack** - למה בחרת בכל טכנולוגיה
4. **הראה את הקוד** - חלקים מעניינים
5. **דבר על אתגרים** - בעיות שפתרת (SSR, Vector Search)
6. **הדגש ביצועים** - זמני טעינה, UX
7. **תן נתונים** - מספרי שורות קוד, components, API endpoints

---

**בהצלחה בהצגה! 🎉**
