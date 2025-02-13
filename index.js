const { Telegraf, Markup } = require("telegraf");

const BOT_TOKEN = "8006429819:AAGS-F41dKninACUt63UseZeQnnmtyvVF5g";
const bot = new Telegraf(BOT_TOKEN);

// برای ذخیره message_id مربوط به پیام کاربر
let messageStore = {};

// تابع کمکی برای ذخیره message_id
const saveMessageId = (ctx, sentMessage) => {
  messageStore[ctx.chat.id] = sentMessage.message_id;
};

// پیام خوش‌آمدگویی
bot.start((ctx) => {
  ctx
    .reply(
      `سلام! به بات پشتیبانی پذیرش ۲۴ خوش اومدید! 😊`,
      Markup.inlineKeyboard([
        [
          Markup.button.callback(
            "📌 سوالات مربوط به فعالسازی ویزیت آنلاین",
            "office_false"
          ),
        ],
        [
          Markup.button.callback(
            "🏥 سوالات مربوط به فعالسازی مطب",
            "office_true"
          ),
        ],
      ])
    )
    .then((sentMessage) => saveMessageId(ctx, sentMessage));
});

// **منوی سوالات ویزیت آنلاین**
bot.action("office_false", (ctx) => {
  ctx.answerCbQuery();
  ctx.telegram.editMessageText(
    ctx.chat.id,
    messageStore[ctx.chat.id],
    null,
    `📌 سوالات مربوط به فعالسازی ویزیت آنلاین:`,
    Markup.inlineKeyboard([
      [
        Markup.button.callback(
          "⏳ از چه زمانی ویزیت آنلاین من فعال می شود؟",
          "activation_online_visit_time"
        ),
      ],
      [
        Markup.button.callback(
          "📩 از کجا بفهمم که کسی ، نوبت ویزیت آنلاین گرفته؟",
          "activation_online_visit_message_sent"
        ),
      ],
      [
        Markup.button.callback(
          "❌ اگر بیمار در زمان ویزیت آنلاین حاضر نشد، چه کاری انجام دهم؟",
          "activation_online_visit_messenger"
        ),
      ],
      [
        Markup.button.callback(
          "📈 چگونه می‌توان رتبه خود را در پذیرش ۲۴ افزایش داد؟",
          "activation_online_visit_rank"
        ),
      ],
      [
        Markup.button.callback(
          "⏰ اگر در ساعت کاری شرایط پاسخگویی به بیمار را نداشتم ، چه کار کنم؟",
          "activation_online_visit_work_hour"
        ),
      ],
      [
        Markup.button.callback(
          "💰 درآمد هر ویزیت چه زمانی برای من واریز میشه؟",
          "activation_online_visit_payment_time"
        ),
      ],
      [
        Markup.button.callback(
          "📢 آیا پذیرش ۲۴ امکان تبلیغات را فراهم می‌کند؟",
          "activation_online_visit_ads"
        ),
      ],
      [Markup.button.callback("🔙 بازگشت", "go_back_main")],
    ])
  );
});

// **منوی سوالات مطب**
bot.action("office_true", (ctx) => {
  ctx.answerCbQuery();
  ctx.telegram.editMessageText(
    ctx.chat.id,
    messageStore[ctx.chat.id],
    null,
    `🏥 سوالات مربوط به فعالسازی مطب:`,
    Markup.inlineKeyboard([
      [
        Markup.button.callback(
          "⏳ از چه زمانی مطب من فعال می شود؟",
          "activation_office_time"
        ),
      ],
      [
        Markup.button.callback(
          "📈 چگونه می‌توان رتبه خود را در پذیرش ۲۴ افزایش داد؟",
          "activation_office_rank"
        ),
      ],
      [
        Markup.button.callback(
          "⏰ چگونه می‌توان رتبه خود را در پذیرش ۲۴ افزایش داد؟",
          "activation_office_work_hour"
        ),
      ],
      [
        Markup.button.callback(
          "📢 آیا پذیرش ۲۴ امکان تبلیغات را فراهم می‌کند؟",
          "activation_office_ads"
        ),
      ],
      [Markup.button.callback("🔙 بازگشت", "go_back_main")],
    ])
  );
});

// **بازگشت به منوی اصلی**
bot.action("go_back_main", (ctx) => {
  ctx.answerCbQuery();
  ctx.telegram.editMessageText(
    ctx.chat.id,
    messageStore[ctx.chat.id],
    null,
    `سلام! به بات پشتیبانی پذیرش ۲۴ خوش اومدید! 😊`,
    Markup.inlineKeyboard([
      [Markup.button.callback("📌 سوالات ویزیت آنلاین", "office_false")],
      [Markup.button.callback("🏥 سوالات مطب", "office_true")],
    ])
  );
});

// **لیست سوالات و پاسخ‌های ویزیت آنلاین**
const onlineVisitQuestions = {
  activation_online_visit_time:
    "اطلاعات شما با موفقیت ثبت شده و ویزیت آنلاین شما تا ساعاتی دیگر فعال خواهد شد. از این پس، بیماران می‌توانند مستقیماً از طریق پروفایل شما نوبت ویزیت آنلاین رزرو کنند. 📅",
  activation_online_visit_message_sent:
    "پس از ثبت نوبت، پیامکی شامل اطلاعات بیمار و زمان نوبت برای شما ارسال میگردد. 🏥",
  activation_online_visit_messenger:
    "شما می توانید از طریق پیام رسان و شماره ی بیمار با او ارتباط بگیرید و ویزیت را آغاز کنید. 🚫",
  activation_online_visit_rank:
    "برای دریافت راهنمایی بیشتر درباره افزایش رتبه، می‌توانید به بخش عملکرد من در پنل کاربری خود مراجعه کنید. ⭐",
  activation_online_visit_work_hour:
    "در صورتی که در ساعت کاری تعریف شده ، شرایط پاسخگویی به بیمار را نداشتید ، می توانید از داخل پنل اقدام به غیر فعالسازی نوبت دهی کنید. ⏳",
  activation_online_visit_payment_time:
    "پس از پایان هر ویزیت، هزینه آن ویزیت در بامداد روز بعد به موجودی حساب کاربری شما اضافه خواهد شد. 💰",
  activation_online_visit_ads:
    "امکانی برای انجام تبلیغات در پذیرش۲۴ وجود ندارد اما برای افزایش تعداد نوبت می توانید به بخش عملکرد من داخل پنل کاربری خود مراجعه کنید. 📢",
};

// **لیست سوالات و پاسخ‌های مطب**
const officeQuestions = {
  activation_office_time:
    "اطلاعات شما ثبت شده و مطب شما تا ساعاتی دیگر فعال می‌شود. بیماران می‌توانند مستقیماً از طریق پروفایل شما نوبت رزرو کنند. 🏥",
  activation_office_rank:
    "برای دریافت راهنمایی بیشتر درباره افزایش رتبه، می‌توانید به بخش عملکرد من در پنل کاربری خود مراجعه کنید. ⭐",
  activation_office_work_hour:
    "در صورتی که در ساعت کاری تعریف شده ، شرایط نوبت دهی به بیمار را نداشتید ، می توانید از داخل پنل اقدام به ثبت مرخصی کنید. ⏰",
  activation_office_ads:
    "امکانی برای انجام تبلیغات در پذیرش۲۴ وجود ندارد اما برای افزایش تعداد نوبت می توانید به بخش عملکرد من داخل پنل کاربری خود مراجعه کنید. 📢",
};

// **مدیریت پاسخ‌ها با دکمه بازگشت**
const addBackButton = (answer, backTo) => {
  return Markup.inlineKeyboard([[Markup.button.callback("🔙 بازگشت", backTo)]]);
};

// **هندل کردن پاسخ‌ها**
Object.keys(onlineVisitQuestions).forEach((key) => {
  bot.action(key, (ctx) => {
    ctx.answerCbQuery();
    ctx.editMessageText(
      onlineVisitQuestions[key],
      addBackButton("بازگشت", "office_false")
    );
  });
});

Object.keys(officeQuestions).forEach((key) => {
  bot.action(key, (ctx) => {
    ctx.answerCbQuery();
    ctx.editMessageText(
      officeQuestions[key],
      addBackButton("بازگشت", "office_true")
    );
  });
});

// راه‌اندازی ربات
bot.launch();
console.log("🤖 ربات فعال شد...");
