import { Language } from '../types';

export const translations = {
  uz: {
    brandName: 'VisionAI',
    tagline: 'Rasmni yuklang. Uni tushunib oling.',
    heroSubtitle: 'Sun’iy intellekt yordamida rasmdagi obyekt, mahsulot, o‘simlik, hayvon yoki boshqa narsalar haqida batafsil ma’lumot oling.',
    navHome: 'Asosiy',
    navAnalyze: 'Tahlil qilish',
    navHistory: 'Tarix',
    navAbout: 'VisionAI haqida',
    
    // Themes
    themeLight: 'Yorug‘',
    themeDark: 'Tungi',
    themeSystem: 'Tizim',

    // Hero quick actions
    tryDemo: 'Namunalarni sinab ko‘ring',
    sample1: 'Monstera o‘simligi',
    sample2: 'Vintage mexanik kamera',
    sample3: 'Artisan Chemex qahva qaynatgich',
    sample4: 'Zamonaviy mikroprotsessor',

    // Upload section
    uploadTitle: 'Tasvirni yuklang yoki suratga oling',
    dropzoneText: 'Rasmni shu yerga tashlang',
    dropzoneSubtext: 'yoki qurilmangizdan faylni tanlang',
    btnUpload: 'Rasm yuklash',
    btnCamera: 'Kamera orqali suratga olish',
    supportedFormats: 'Formatlar: JPG, JPEG, PNG, WEBP (maks. 10 MB)',
    errFileTooLarge: 'Fayl hajmi juda katta! Maksimal ruxsat etilgan hajm — 10 MB.',
    errInvalidFormat: 'Faqat JPG, JPEG, PNG yoki WEBP formatidagi rasmlar qo‘llab-quvvatlanadi.',

    // Preview
    previewTitle: 'Yuklangan rasm',
    btnRemove: 'O‘chirish',
    btnReplace: 'Boshqa rasm tanlash',
    btnAnalyze: 'Rasmni tahlil qilish',
    btnAnalyzing: 'Tahlil qilinmoqda...',
    readyToAnalyze: 'Tahlilga tayyor',

    // Scanning messages
    scannerReady: 'Tasvir tayyorlanmoqda...',
    scannerUploading: 'Rasm yuklanmoqda...',
    scannerAnalyzing: 'AI tasvirni chuqur tahlil qilmoqda...',
    scannerFeatures: 'Obyekt belgilari va vizual tarkib tekshirilmoqda...',
    scannerFinalizing: 'Xulosa va ma’lumotlar tuzilmoqda...',

    // Camera
    cameraTitle: 'Kamera orqali suratga olish',
    cameraCapture: 'Suratga olish',
    cameraRetake: 'Qayta suratga olish',
    cameraUsePhoto: 'Ushbu suratni ishlatish',
    cameraSwitch: 'Kamerani almashtirish',
    cameraClose: 'Yopish',
    cameraDenied: 'Kameradan foydalanishga ruxsat berilmadi yoki qurilmangizda kamera topilmadi.',
    cameraDeniedHelp: 'Brauzeringiz sozlamalarida kamera ruxsatini yoqing yoki fayl sifatida rasm yuklang.',

    // Result Dashboard
    resultTitle: 'Tahlil natijasi',
    badgeWhatIsThis: 'BU NIMA?',
    badgeCategory: 'Kategoriya',
    badgeConfidence: 'Ishonch darajasi',
    tabOverview: 'Umumiy ma’lumot',
    tabCharacteristics: 'Xususiyatlar',
    tabPurpose: 'Vazifasi va qo‘llanilishi',
    tabFacts: 'Qiziqarli faktlar',
    tabSafety: 'Xavfsizlik va ogohlantirish',
    
    labelDescription: 'Tavsif',
    labelCharacteristics: 'Ko‘rinib turgan xarakteristikalar',
    labelPurpose: 'Qanday maqsadda ishlatiladi?',
    labelMaterials: 'Materiallar va tarkibiy qismlar',
    labelHowToUse: 'Foydalanish tartibi',
    labelFacts: 'Diqqatga sazovor faktlar',
    labelWarnings: 'Muhim ogohlantirishlar va ehtiyot choralari',
    labelAlternatives: 'Boshqa ehtimoliy variantlar',
    
    // Simple explanation feature
    btnExplainSimply: 'Oddiy tilda tushuntirish',
    btnExplainDetailed: 'Batafsil ilmiy ko‘rinish',
    simpleExplainBadge: 'Bolalar va yangi o‘rganuvchilar uchun sodda tushuntirish',

    // Quick Actions
    btnCopy: 'Nusxalash',
    btnCopied: 'Nusxalandi!',
    btnShare: 'Ulashish',
    btnDownload: 'Hisobotni yuklab olish',
    btnNewAnalysis: 'Yangi rasm tahlili',

    // Follow-up Chat
    chatTitle: 'Rasmdan kelib chiqib AI bilan suhbatlashing',
    chatPlaceholder: 'Ushbu rasm haqida savol bering...',
    chatSend: 'Yuborish',
    chatQuickQuestions: 'Tezkor savollar:',
    qWhatIsIt: 'Bu nima uchun ishlatiladi?',
    qHowUseful: 'Bu qanchalik foydali?',
    qHowToUse: 'Buni qanday ishlatish mumkin?',
    qWhichModel: 'Bu qaysi model yoki tur?',
    qOtherTypes: 'Boshqa turlari bormi?',
    qExplainSimple: 'Oddiy tilda tushuntirib bering',

    // History
    historyTitle: 'Tahlillar tarixi',
    historyEmpty: 'Hozircha hech qanday tahlil saqlanmagan.',
    historyEmptyDesc: 'Tahlil qilingan rasmlaringiz avtomatik ravishda brauzeringiz xotirasida saqlanadi.',
    btnClearAll: 'Tarixni tozalash',
    btnDelete: 'O‘chirish',
    confirmClearTitle: 'Barcha tarixni o‘chirasizmi?',
    confirmClearDesc: 'Bu barcha saqlangan tahlillarni qurilmangizdan butunlay o‘chiradi.',
    confirmYes: 'Ha, tozalansin',
    confirmCancel: 'Bekor qilish',
    historyCount: 'ta tahlil mavjud',

    // About section
    aboutHeading: 'VisionAI nima?',
    aboutIntro: 'VisionAI ilg‘or multimodal sun’iy intellekt texnologiyasiga tayanib, vizual ma’lumotlarni tahlil qiladi va fotosuratda nima aks etganini aniq, ishonchli va tizimli ravishda tushuntirib beradi.',
    aboutStep1Title: '01 — Yuklang',
    aboutStep1Desc: 'Qurilmangizdagi istalgan fotosuratni yuklang yoki jonli kamera orqali yangi surat oling.',
    aboutStep2Title: '02 — Tahlil qiling',
    aboutStep2Desc: 'Gemini Vision multimodal neyrotarmog‘i tasvirdagi detallarni, materiallarni va belgilarni chuqur o‘rganadi.',
    aboutStep3Title: '03 — Tushunib oling',
    aboutStep3Desc: 'To‘liq tavsif, faktlar, amaliy maslahatlar oling va istalgan qo‘shimcha savolingizni bering.',
    
    // Privacy
    privacyTitle: 'Xavfsizlik va maxfiylik',
    privacyNotice: 'Siz yuklagan rasmlar faqatgina so‘ralgan tahlilni bajarish uchun xavfsiz tarzda ishlatiladi. Rasmlar shaxsiy serverlarda saqlanmaydi.',

    // Errors
    errorGeneric: 'Nimadir noto‘g‘ri ketdi. Iltimos, qaytadan urinib ko‘ring.',
    btnTryAgain: 'Qayta urinish',
    btnUploadAnother: 'Boshqa rasm yuklash',
  },
  ru: {
    brandName: 'VisionAI',
    tagline: 'Увидьте. Поймите.',
    heroSubtitle: 'Получите подробную информацию о любом объекте, продукте, растении, животном или предмете с помощью искусственного интеллекта.',
    navHome: 'Главная',
    navAnalyze: 'Анализ',
    navHistory: 'История',
    navAbout: 'О VisionAI',

    // Themes
    themeLight: 'Светлая',
    themeDark: 'Тёмная',
    themeSystem: 'Системная',

    // Hero quick actions
    tryDemo: 'Попробовать примеры',
    sample1: 'Растение Монстера',
    sample2: 'Винтажная механическая камера',
    sample3: 'Кофейник Chemex',
    sample4: 'Современный микропроцессор',

    // Upload section
    uploadTitle: 'Загрузите изображение или сделайте фото',
    dropzoneText: 'Перетащите изображение сюда',
    dropzoneSubtext: 'или выберите файл на вашем устройстве',
    btnUpload: 'Загрузить фото',
    btnCamera: 'Снять на камеру',
    supportedFormats: 'Форматы: JPG, JPEG, PNG, WEBP (макс. 10 МБ)',
    errFileTooLarge: 'Файл слишком большой! Максимально допустимый размер — 10 МБ.',
    errInvalidFormat: 'Поддерживаются только изображения форматов JPG, JPEG, PNG или WEBP.',

    // Preview
    previewTitle: 'Загруженное изображение',
    btnRemove: 'Удалить',
    btnReplace: 'Заменить',
    btnAnalyze: 'Анализировать изображение',
    btnAnalyzing: 'Анализируем...',
    readyToAnalyze: 'Готово к анализу',

    // Scanning messages
    scannerReady: 'Подготовка изображения...',
    scannerUploading: 'Загрузка фото...',
    scannerAnalyzing: 'Искусственный интеллект детально исследует изображение...',
    scannerFeatures: 'Распознавание признаков, формы и текстуры...',
    scannerFinalizing: 'Формирование отчета и структурированных данных...',

    // Camera
    cameraTitle: 'Съемка через камеру',
    cameraCapture: 'Сделать снимок',
    cameraRetake: 'Переснять',
    cameraUsePhoto: 'Использовать это фото',
    cameraSwitch: 'Сменить камеру',
    cameraClose: 'Закрыть',
    cameraDenied: 'Доступ к камере запрещен или камера не найдена на устройстве.',
    cameraDeniedHelp: 'Разрешите доступ к камере в настройках браузера или загрузите файл с диска.',

    // Result Dashboard
    resultTitle: 'Результат анализа',
    badgeWhatIsThis: 'ЧТО ЭТО?',
    badgeCategory: 'Категория',
    badgeConfidence: 'Уверенность',
    tabOverview: 'Обзор',
    tabCharacteristics: 'Характеристики',
    tabPurpose: 'Назначение',
    tabFacts: 'Интересные факты',
    tabSafety: 'Безопасность',

    labelDescription: 'Описание',
    labelCharacteristics: 'Видимые особенности и характеристики',
    labelPurpose: 'Для чего используется?',
    labelMaterials: 'Материалы и компоненты',
    labelHowToUse: 'Как использовать / применять',
    labelFacts: 'Интересные факты',
    labelWarnings: 'Важные предупреждения и меры безопасности',
    labelAlternatives: 'Альтернативные варианты',

    // Simple explanation feature
    btnExplainSimply: 'Объяснить просто',
    btnExplainDetailed: 'Подробный вид',
    simpleExplainBadge: 'Простое объяснение для детей и начинающих',

    // Quick Actions
    btnCopy: 'Копировать',
    btnCopied: 'Скопировано!',
    btnShare: 'Поделиться',
    btnDownload: 'Скачать отчет',
    btnNewAnalysis: 'Новый анализ',

    // Follow-up Chat
    chatTitle: 'Задайте вопрос AI об этом изображении',
    chatPlaceholder: 'Спросите что-либо об объекте на фото...',
    chatSend: 'Отправить',
    chatQuickQuestions: 'Быстрые вопросы:',
    qWhatIsIt: 'Для чего это используется?',
    qHowUseful: 'Насколько это полезно?',
    qHowToUse: 'Как этим правильно пользоваться?',
    qWhichModel: 'Какая это модель или вид?',
    qOtherTypes: 'Есть ли другие разновидности?',
    qExplainSimple: 'Объясни простыми словами',

    // History
    historyTitle: 'История анализов',
    historyEmpty: 'История анализов пока пуста.',
    historyEmptyDesc: 'Все ваши результаты анализов сохраняются локально в вашем браузере.',
    btnClearAll: 'Очистить историю',
    btnDelete: 'Удалить',
    confirmClearTitle: 'Очистить всю историю?',
    confirmClearDesc: 'Это действие удалит все сохраненные результаты на этом устройстве.',
    confirmYes: 'Да, очистить',
    confirmCancel: 'Отмена',
    historyCount: 'анализов сохранено',

    // About section
    aboutHeading: 'Что такое VisionAI?',
    aboutIntro: 'VisionAI использует мультимодальные модели искусственного интеллекта для точного визуального распознавания и всестороннего объяснения того, что запечатлено на фото.',
    aboutStep1Title: '01 — Загрузите',
    aboutStep1Desc: 'Загрузите снимок с устройства или сделайте свежее фото встроенной камерой.',
    aboutStep2Title: '02 — Анализируйте',
    aboutStep2Desc: 'Нейросеть Gemini Vision исследует визуальные детали, материалы, происхождение и назначение.',
    aboutStep3Title: '03 — Поймите',
    aboutStep3Desc: 'Изучайте факты, практические инструкции и задавайте любые уточняющие вопросы в чате.',

    // Privacy
    privacyTitle: 'Безопасность и конфиденциальность',
    privacyNotice: 'Ваши загруженные изображения используются исключительно для выполнения запрошенного анализа и не сохраняются на внешних серверах.',

    // Errors
    errorGeneric: 'Что-то пошло не так. Пожалуйста, попробуйте снова.',
    btnTryAgain: 'Попробовать снова',
    btnUploadAnother: 'Загрузить другое фото',
  },
  en: {
    brandName: 'VisionAI',
    tagline: 'See it. Understand it.',
    heroSubtitle: 'Get detailed, intelligent insights about any object, product, plant, animal, dish, device, or scene using multimodal AI.',
    navHome: 'Home',
    navAnalyze: 'Analyze',
    navHistory: 'History',
    navAbout: 'About',

    // Themes
    themeLight: 'Light',
    themeDark: 'Dark',
    themeSystem: 'System',

    // Hero quick actions
    tryDemo: 'Try sample images',
    sample1: 'Monstera Deliciosa',
    sample2: 'Vintage Mechanical Camera',
    sample3: 'Artisan Chemex Brewer',
    sample4: 'Modern Microprocessor',

    // Upload section
    uploadTitle: 'Upload an image or take a photo',
    dropzoneText: 'Drop your image here',
    dropzoneSubtext: 'or browse from your device',
    btnUpload: 'Upload Image',
    btnCamera: 'Take with Camera',
    supportedFormats: 'Supports JPG, JPEG, PNG, WEBP (Max 10 MB)',
    errFileTooLarge: 'File is too large! Maximum allowed size is 10 MB.',
    errInvalidFormat: 'Only JPG, JPEG, PNG, and WEBP image formats are supported.',

    // Preview
    previewTitle: 'Uploaded Image',
    btnRemove: 'Remove',
    btnReplace: 'Replace',
    btnAnalyze: 'Analyze Image',
    btnAnalyzing: 'Analyzing...',
    readyToAnalyze: 'Ready to analyze',

    // Scanning messages
    scannerReady: 'Preparing visual data...',
    scannerUploading: 'Uploading image...',
    scannerAnalyzing: 'AI is performing deep multimodal visual analysis...',
    scannerFeatures: 'Identifying visible traits, textures, and composition...',
    scannerFinalizing: 'Synthesizing structured explanation and insights...',

    // Camera
    cameraTitle: 'Capture with Camera',
    cameraCapture: 'Capture Photo',
    cameraRetake: 'Retake',
    cameraUsePhoto: 'Use this Photo',
    cameraSwitch: 'Switch Camera',
    cameraClose: 'Close',
    cameraDenied: 'Camera access denied or no camera device found.',
    cameraDeniedHelp: 'Please enable camera permissions in your browser or upload an image file instead.',

    // Result Dashboard
    resultTitle: 'Analysis Result',
    badgeWhatIsThis: 'WHAT IS THIS?',
    badgeCategory: 'Category',
    badgeConfidence: 'Confidence',
    tabOverview: 'Overview',
    tabCharacteristics: 'Characteristics',
    tabPurpose: 'Purpose & Usage',
    tabFacts: 'Interesting Facts',
    tabSafety: 'Safety & Warnings',

    labelDescription: 'Description',
    labelCharacteristics: 'Visible Characteristics',
    labelPurpose: 'What is it used for?',
    labelMaterials: 'Materials & Components',
    labelHowToUse: 'How to Use / Operate',
    labelFacts: 'Fascinating Facts',
    labelWarnings: 'Important Warnings & Precautions',
    labelAlternatives: 'Alternative Possibilities',

    // Simple explanation feature
    btnExplainSimply: 'Explain simply',
    btnExplainDetailed: 'Detailed View',
    simpleExplainBadge: 'Simple beginner/child-friendly explanation',

    // Quick Actions
    btnCopy: 'Copy Result',
    btnCopied: 'Copied!',
    btnShare: 'Share',
    btnDownload: 'Download Report',
    btnNewAnalysis: 'New Analysis',

    // Follow-up Chat
    chatTitle: 'Ask AI about this image',
    chatPlaceholder: 'Ask any question about the object in the image...',
    chatSend: 'Send',
    chatQuickQuestions: 'Quick Questions:',
    qWhatIsIt: 'What is this used for?',
    qHowUseful: 'How useful is this?',
    qHowToUse: 'How can this be used?',
    qWhichModel: 'Which model or specific species is this?',
    qOtherTypes: 'Are there other varieties or types?',
    qExplainSimple: 'Explain simply in plain words',

    // History
    historyTitle: 'Analysis History',
    historyEmpty: 'No previous analyses yet.',
    historyEmptyDesc: 'Your analyzed images and reports will be saved locally on your browser.',
    btnClearAll: 'Clear All History',
    btnDelete: 'Delete',
    confirmClearTitle: 'Clear all analysis history?',
    confirmClearDesc: 'This will permanently remove all previous analysis entries from this browser.',
    confirmYes: 'Yes, clear all',
    confirmCancel: 'Cancel',
    historyCount: 'saved analyses',

    // About section
    aboutHeading: 'What is VisionAI?',
    aboutIntro: 'VisionAI uses state-of-the-art multimodal artificial intelligence to examine visual information and provide comprehensive, verifiable knowledge about what appears in any photograph.',
    aboutStep1Title: '01 — Upload',
    aboutStep1Desc: 'Upload any image from your computer or phone, or snap a real-time photo via your webcam.',
    aboutStep2Title: '02 — Analyze',
    aboutStep2Desc: 'Gemini Vision neural models inspect structural properties, materials, origin, and visible markers.',
    aboutStep3Title: '03 — Understand',
    aboutStep3Desc: 'Receive categorized breakdowns, verified facts, safety alerts, and engage in interactive follow-up dialogue.',

    // Privacy
    privacyTitle: 'Privacy & Security',
    privacyNotice: 'Your uploaded image is used only to perform the requested analysis. No images are permanently stored on third-party servers.',

    // Errors
    errorGeneric: 'Something went wrong. Please try again.',
    btnTryAgain: 'Try Again',
    btnUploadAnother: 'Upload Another Image',
  },
};

export function getTranslation(lang: Language) {
  return translations[lang] || translations.uz;
}
