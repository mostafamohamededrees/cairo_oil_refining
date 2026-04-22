import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import bcrypt from 'bcryptjs'

const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL
if (!connectionString) {
  throw new Error('Missing database connection string')
}
const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

async function main() {
  // Delete existing devices (Optional, based on requirement, kept as is)
  await prisma.device.deleteMany()

  // Seed Admin User
  const adminPassword = await bcrypt.hash('admin123', 10)
  await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: adminPassword,
      role: 'ADMIN',
    },
  })

  await prisma.device.create({
    data: {
      title: 'جهاز قياس الزيت في المياه',
      subtitle: 'ERACHECK ECO',
      description:
        'يستخدم جهاز ERACHECK ECO لقياس تركيز الزيت الكلي في المياه بدقة عالية باستخدام تقنية الأشعة تحت الحمراء Infrared Spectroscopy (IR) بعد استخلاص المركبات الهيدروكربونية بواسطة مذيب Cyclohexane. يساعد الجهاز في مراقبة جودة مياه الصرف، التأكد من مطابقة المياه للمواصفات البيئية، دعم متطلبات نظام الجودة ISO.',
      methodCode: 'WI-LAB-OIW-001',
      versionNumber: '02',
      issueDate: '01/01/2019',
      lastReview: '01/05/2024',
      approvedBy: 'مدير عام المعمل',
      standard: 'ASTM D8193',
      detectionLimit: 'في الماء: 0.5 mg/L — في التربة: 18 mg/kg',
      range: 'في المياه: 0 – 1000 mg/L — في التربة: حتى 36,000 mg/kg',
      repeatability:
        '0–49.9 mg/L: ±0.2 mg/L\n50–299.9 mg/L: ±0.5 mg/L\n300–1000 mg/L: ±1.2 mg/L',
      enrichmentFactor: '18 (900 مل ماء مستخلصة بـ 50 مل مذيب)',
      sampleVolume: '900 مل ماء + 50 مل Cyclohexane',
      measurementTime: '4 دقائق فقط لكل عينة (2 دقيقة قياس + 2 دقيقة خلفية)',
      purpose:
        'يستخدم جهاز ERACHECK ECO لقياس تركيز الزيت الكلي في المياه بدقة عالية باستخدام تقنية الأشعة تحت الحمراء Infrared Spectroscopy (IR) بعد استخلاص المركبات الهيدروكربونية بواسطة مذيب Cyclohexane.\n\nيساعد الجهاز في:\n- مراقبة جودة مياه الصرف الصناعي\n- التأكد من مطابقة المياه للمواصفات البيئية\n- متابعة كفاءة وحدات المعالجة\n- التحكم في نسب الزيت قبل إعادة الاستخدام أو التصريف\n- دعم متطلبات نظام الجودة ISO داخل المعمل',
      scope: 
        'يستخدم الجهاز لتحليل:\n- الزيت الكلي في المياه Total Oil and Grease (TOG)\n- الهيدروكربونات البترولية الكلية Total Petroleum Hydrocarbon (TPH)\n\nوذلك في عينات:\n- مياه الصرف الصناعي\n- مياه التبريد\n- مياه المعالجة\n- مياه الحقن\n- عينات التربة الملوثة بالزيت\n\nطبقًا للمواصفة القياسية: ASTM D8193',
      principleOfOperation:
        'يعتمد الجهاز على قياس امتصاص الأشعة تحت الحمراء Infrared Absorption للمركبات الهيدروكربونية بعد استخلاصها من العينة باستخدام مذيب Cyclohexane.\n\nحيث:\n1️⃣ يتم خلط العينة بالمذيب\n2️⃣ تنتقل المركبات البترولية إلى المذيب\n3️⃣ يتم قياس الامتصاص بالأشعة تحت الحمراء\n4️⃣ يحسب الجهاز تركيز الزيت تلقائيًا\n\nوهذه الطريقة تتميز بأنها:\n- سريعة\n- دقيقة\n- لا تحتاج تبخير المذيب\n- صديقة للبيئة مقارنة بالطرق القديمة',
      approvedStandards: [
        'ASTM D8193',
        'EPA 1664',
        'ISO 9377-2',
        'DIN 38409-H18',
        'IP426',
        'OSPAR IR method'
      ],
      extractionSolvent: 'Cyclohexane (سيكلوهكسان) وهو مذيب عالي الكفاءة في استخلاص الزيت وغير ضار بالبيئة مقارنة بمذيبات CFC القديمة.',
      sampleCleanUp: 'Florisil Cartridge (فلوريسيل كارتريدج) عند قياس TPH لإزالة المركبات القطبية.',
      displaySystem: 'شاشة لمس Touchscreen بمقاس 8.4 بوصة تدعم واجهة متعددة اللغات Multilingual Interface.',
      interfaces: 'Ethernet, USB, RS232, Wi-Fi (عن طريق USB dongle)، وربط مباشر مع نظام إدارة معلومات المعمل (LIMS).',
      software: 'ERASOFT RCS (يسمح بمتابعة النتائج، تحليل البيانات، إدارة التقارير).',
      internalMemory: 'تخزين أكثر من 100,000 نتيجة تحليل داخل قاعدة البيانات الداخلية.',
      alarmTrackingSystem: 'تسجيل جميع رسائل الأعطال Alarm Messages داخل النظام مع نتائج التحليل.',
      powerRequirements: '85 – 264 VAC بتردد 47 – 63 Hz باستهلاك 150 وات.',
      dimensions: '29 × 35 × 34 سم',
      weight: '9.7 كجم',
      autosampler: 'يمكن تركيب 10-Position Autosampler لتحليل عدة عينات تلقائيًا بدون تدخل المستخدم.',
      applications: [
        'مراقبة مياه الصرف الصناعي',
        'التأكد من مطابقة المياه للمواصفات البيئية',
        'متابعة كفاءة وحدات المعالجة',
        'مياه الحقن البترولي ومياه التبريد',
        'عينات التربة الملوثة بالزيت'
      ],
      advantages: [
        'مطابق للمواصفة ASTM D8193 وعدة مواصفات دولية',
        'سريع التحليل (4 دقائق فقط لكل عينة)',
        'لا يحتاج تبخير المذيب',
        'دقة عالية جداً Sub-ppm Precision',
        'صديق للبيئة CFC-Free',
        'يدعم الاتصال بنظام LIMS ويمكن تشغيله ميدانيًا',
        'يدعم Autosampler لزيادة الإنتاجية'
      ],
      warnings: [
        'تأكد من تنظيف الجهاز جيداً بعد كل استخدام لضمان سلامة القياسات',
        'استخدم مذيب Cyclohexane (نقي) فقط — لا تستخدم مذيبات أخرى',
        'تأكد من رج العينة جيدًا لضمان انتقال الزيت بالكامل إلى المذيب',
        'عند قياس TPH يجب استخدام Florisil Cartridge'
      ],
      steps: [
        { id: 1, title: 'يتم تشغيل الجهاز بالضغط على مفتاح التشغيل Power قبل بدء القياس بوقت كافٍ حتى تظهر حالة Ready.', titleEn: 'Power On', iconType: 'Zap' },
        { id: 2, title: 'من قائمة Type يتم اختيار Oil in water لتحديد نوع التحليل المطلوب وهو قياس الزيت في المياه.', titleEn: 'Select Type', iconType: 'Droplets' },
        { id: 3, title: 'من خانة Sample يتم إدخال اسم العينة بشكل واضح لتسهيل الرجوع إليها لاحقًا.', titleEn: 'Enter Sample Name', iconType: 'TestTube' },
        { id: 4, title: 'من خانة Operator يتم إدخال اسم المشغل المسؤول عن إجراء التحليل لضمان التوثيق.', titleEn: 'Enter Operator', iconType: 'Activity' },
        { id: 5, title: 'من قائمة Method يتم اختيار TOG (Total Oil and Greases) وهي الطريقة القياسية.', titleEn: 'Select Method', iconType: 'Layers' },
        { id: 6, title: 'من قائمة Calibration يتم اختيار المعايرة المعتمدة Samir basel 2023 لضمان دقة النتائج.', titleEn: 'Select Calibration', iconType: 'ScanLine' },
        { id: 7, title: 'من خانة Enrichment يتم إدخال حجم العينة المستخدمة في عملية الاستخلاص بدقة.', titleEn: 'Enter Enrichment', iconType: 'FlaskConical' },
        { id: 8, title: 'من خانة Solvent يتم إدخال حجم المذيب المستخدم وهو Cyclohexane.', titleEn: 'Enter Solvent Volume', iconType: 'Droplets' },
        { id: 9, title: 'لعمل Blank يتم وضع Tube في Cyclohexane ثم الضغط على Run ثم Ok لبدء قياس الخلفية.', titleEn: 'Run Blank 1', iconType: 'Beaker' },
        { id: 10, title: 'يتم الانتظار حتى يطلب الجهاز إجراء Blank مرة أخرى ثم الضغط على Ok.', titleEn: 'Run Blank 2', iconType: 'Beaker' },
        { id: 11, title: 'يتم التأكد من أن نتيجة Blank صحيحة وفي الحدود المقبولة لضمان عدم وجود تلوث.', titleEn: 'Verify Blank', iconType: 'Activity' },
        { id: 12, title: 'يتم وضع الجزء المفصول من العينة بعد الاستخلاص بمذيب Cyclohexane داخل Tube تمهيدًا لبدء القياس.', titleEn: 'Insert Sample Tube', iconType: 'TestTube' },
        { id: 13, title: 'يتم الضغط على Run ثم الضغط على Ok لبدء تشغيل العينة وإجراء التحليل.', titleEn: 'Run Sample', iconType: 'Zap' },
        { id: 14, title: 'يتم تسجيل نتيجة العينة بعد ظهورها على شاشة الجهاز والتأكد من توافقها.', titleEn: 'Record Result', iconType: 'Activity' },
        { id: 15, title: 'تنظيف: لتنظيف خلية القياس Cell يتم الضغط على Options ثم اختيار Clean للدخول إلى وضع التنظيف.', titleEn: 'Enter Clean Mode', iconType: 'Waves' },
        { id: 16, title: 'تنظيف: يتم وضع Tube في محلول Isopropanol لإزالة بقايا الزيوت والمواد العضوية.', titleEn: 'Insert Isopropanol', iconType: 'FlaskConical' },
        { id: 17, title: 'تنظيف: يتم الضغط على Run ثم Confirm ثم Ok لبدء دورة التنظيف باستخدام Isopropanol.', titleEn: 'Run Clean', iconType: 'Zap' },
        { id: 18, title: 'تنظيف: بعد انتهاء التنظيف ستظهر رسالة لاستكمال الغسيل بـ Cyclohexane، اضغط Cancel مؤقتًا.', titleEn: 'Cancel Cyclohexane Rinse', iconType: 'Activity' },
        { id: 19, title: 'تنظيف: يتم تكرار الخطوات من 15 إلى 18 ثلاث مرات لضمان تنظيف الجهاز بالكامل.', titleEn: 'Repeat 3 Times', iconType: 'Layers' },
        { id: 20, title: 'تنظيف: في المرة الثالثة يتم استكمال خطوة الغسيل باستخدام Cyclohexane لإزالة آثار Isopropanol.', titleEn: 'Final Cyclohexane Rinse', iconType: 'Droplets' },
        { id: 21, title: 'تنظيف: يتم إجراء Blank مرة أخرى للتأكد من نظافة الجهاز تمامًا وجاهزيته.', titleEn: 'Final Blank Check', iconType: 'Beaker' },
      ],
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      imageUrl: null,
    },
  })

  console.log('✅ Database seeded successfully with ERACHECK ECO device data.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
