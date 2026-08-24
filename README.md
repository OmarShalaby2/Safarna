# Safarna – Smart Travel Budget Planner

موقع React لتخطيط رحلة كاملة داخل مصر بناءً على الميزانية وعدد الأيام والتفضيلات.

## التشغيل

```bash
npm install
npm run dev
```

الموقع هيشتغل على: http://localhost:5173

الموقع نفسه (الصفحات العادية للزوار) بيقرأ بياناته من ملفات JSON الثابتة
في `src/data/` زي ما كان، فمش لازم تشغل السيرفر عشان تتصفح الموقع أو تخطط رحلة.
سيرفر الـ API مطلوب بس لصفحة `/admin`.

## تشغيل صفحة الأدمن (متصلة بـ JSON Server حقيقي)

صفحة `/admin` دلوقتي متصلة بسيرفر REST حقيقي (json-server) بدل localStorage.
لازم تشغل السيرفر في نفس الوقت مع الموقع:

**الطريقة الأسهل (تشغيل الاتنين مع بعض في تيرمنال واحد):**
```bash
npm run dev:full
```

**أو شغّل كل واحد في تيرمنال منفصل:**
```bash
# تيرمنال 1
npm run dev

# تيرمنال 2
npm run server
```

سيرفر الـ API هيشتغل على: http://localhost:3001
وهيوفر endpoints جاهزة: `/destinations` `/hotels` `/places` `/activities` `/restaurants`
(GET / POST / PUT / DELETE) بيتم تخزينها فعليًا في ملف `db.json` في جذر المشروع.

لو فتحت `/admin` والسيرفر مش شغال، هتظهر رسالة واضحة (بالعربي والإنجليزي)
تقولك تشغل `npm run server` مع زرار "إعادة المحاولة".

## البناء (Build) للإنتاج

```bash
npm run build
npm run preview
```

## هيكل المشروع

```
src/
  components/   → عناصر واجهة قابلة لإعادة الاستخدام (Navbar, HotelCard, BudgetCard...)
  pages/        → صفحات الموقع (Home, PlanTrip, Recommendations, Dashboard, Admin...)
  context/      → TripContext.jsx (الحالة العامة، اللغة، الوضع الليلي + localStorage)
  data/         → بيانات JSON (destinations, hotels, places, activities, restaurants)
                  + translations.js (قاموس الترجمة الكامل EN/AR)
  api/          → adminApi.js (اتصال fetch حقيقي بـ JSON Server لصفحة الأدمن)
  utils/        → budgetCalculator.js (لوجيك توزيع الميزانية والترشيح بالكامل)
db.json         → قاعدة بيانات json-server (نفس بيانات src/data لكن قابلة للتعديل الحي)
```

## أهم فكرة في اللوجيك

كل الترشيحات (الفندق، الأماكن، الأنشطة، المطاعم) وتوزيع الميزانية والجدول اليومي
بيتحسبوا في ملف واحد: `src/utils/budgetCalculator.js` عن طريق JavaScript عادي
بدون أي AI أو Machine Learning، بالظبط زي ما اتكتب في وصف المشروع.

## دعم اللغة العربية / الإنجليزية

* زرار الكرة الأرضية 🌐 في الـ Navbar بيبدّل اللغة، والاختيار بيتحفظ في localStorage.
* عند اختيار العربي، الصفحة كلها بتتحول لـ RTL تلقائيًا (`document.documentElement.dir`)
  وكل الكلاسات المستخدمة في التصميم هي كلاسات منطقية (`start-`, `end-`, `ps-`...)
  فبتشتغل صح مع RTL من غير أي تعديل إضافي.
* كل نصوص الواجهة (Navbar, Footer, كل الصفحات، كل الكروت) بتتسحب من
  `src/data/translations.js` عن طريق `t(lang, key)` أو `tf(lang, key, vars)` للنصوص
  اللي فيها متغيرات (زي "خطة {days} أيام").
* أسماء الوجهات نفسها مترجمة (`nameAr` في destinations.json)، وأسماء الفئات
  (History, Beach, Adventure...) مترجمة عن طريق `tCategory(lang, category)`.
* أسماء الفنادق/الأماكن/الأنشطة/المطاعم نفسها (زي "Philae Temple") فضلت زي ما هي
  لأنها أسماء أعلام حقيقية، وده الأسلوب المتبع في أغلب مواقع السفر العربية.

## صفحة الأدمن

`/admin` → صفحة CRUD كاملة لإدارة الفنادق، الأماكن، الأنشطة، المطاعم، والوجهات،
متصلة مباشرة بـ JSON Server الحقيقي (شوف قسم "تشغيل صفحة الأدمن" فوق).
التعديلات بتتخزن في localStorage فوق بيانات الـ JSON الأساسية.
