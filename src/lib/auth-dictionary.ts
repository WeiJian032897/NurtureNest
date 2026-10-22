export const authDictionary = {
  en: {
    eyebrow: "A little care, a beautiful beginning",
    brandTitle: "Nice to meet you.",
    brandBody: "Discover trusted confinement centres, compare packages, and book with confidence, all in one place.",
    caption: "For mothers. For babies. For the moments that matter.",
    loginTitle: "Welcome back",
    signupTitle: "Your new chapter begins here",
    loginBody: "A quiet moment to reconnect with your care journey.",
    signupBody: "Create an account to find the right postpartum care services for your recovery.",
    name: "Name", email: "Email", password: "Password", confirmPassword: "Confirm password",
    namePlaceholder: "Your name", emailPlaceholder: "you@example.com",
    login: "Log in", signup: "Sign up", working: "Please wait…",
    noAccount: "New to Nurture Nest?", hasAccount: "Already have an account?",
    nameRequired: "Please enter your name.", invalidEmail: "Please enter a valid email address.",
    passwordRequired: "Please enter your password.", passwordMin: "Use at least 8 characters.", mismatch: "Passwords do not match.",
    emailUsed: "This email is already registered. Please log in.",
    invalidCredentials: "Your email or password is incorrect.", weakPassword: "Your password is too weak.",
    tooMany: "Too many attempts. Please try again later.", network: "Connection problem. Please check your network.",
    generic: "Something went wrong. Please try again.",
    unverified: "Please verify your email before logging in.",
    sentTitle: "Check your inbox",
    sentTo: "Verification email sent to {email}. Please check your inbox, including your spam folder.",
    congratulations: "Congratulations!",
    verifiedWelcome: "Your email has been verified. Welcome to Nurture Nest.",
    goToLogin: "Go to Log in",
    sent: "Verification email sent. Please check your inbox, including your spam folder.",
    resend: "Resend email", resendIn: "Resend in", seconds: "s",
    resendHint: "To resend, enter the email and password you used to sign up. You will be signed out immediately afterwards.",
    verified: "Your email is already verified. You can now log in.",
    back: "Back to log in", show: "Show password", hide: "Hide password",
    theme: "Appearance", system: "System", light: "Light", dark: "Night",
    language: "Language", note: "A thoughtful beginning, at your own pace.",
  },
  zh: {
    eyebrow: "温柔呵护，美好开始",
    brandTitle: "很高兴见到你。",
    brandBody: "一站式平台，助您发掘值得信赖的月子中心，对比各类套餐，安心完成预订。",
    caption: "为妈妈，为宝宝，也为每一个珍贵时刻。",
    loginTitle: "欢迎回来", signupTitle: "从这里，开启新篇章",
    loginBody: "给自己片刻宁静，继续您的安心照护之旅。",
    signupBody: "创建账号，为您的产后休养找到合适的护理服务。",
    name: "姓名", email: "电子邮箱", password: "密码", confirmPassword: "确认密码",
    namePlaceholder: "您的姓名", emailPlaceholder: "you@example.com",
    login: "登入", signup: "注册", working: "请稍候…",
    noAccount: "还没有账号？", hasAccount: "已有账号？",
    nameRequired: "请输入姓名", invalidEmail: "请输入正确的 Email 地址",
    passwordRequired: "请输入密码", passwordMin: "密码至少需要 8 位", mismatch: "两次输入的密码不一致",
    emailUsed: "此 Email 已注册，请直接登入", invalidCredentials: "Email 或密码不正确",
    weakPassword: "密码太弱", tooMany: "尝试次数过多，请稍后再试", network: "网络异常，请检查网络",
    generic: "暂时无法完成操作，请稍后重试", unverified: "请先验证你的 Email",
    sentTitle: "请查看您的邮箱", sent: "验证邮件已发送，请检查你的邮箱（包括垃圾邮件）",
    sentTo: "验证邮件已发送到 {email}，请检查收件箱（包括垃圾邮件）",
    congratulations: "恭喜！",
    verifiedWelcome: "你的 Email 已验证成功，欢迎加入 Nurture Nest。",
    goToLogin: "前往登入",
    resend: "重新发送", resendIn: "重新发送倒计时", seconds: "秒",
    resendHint: "重新发送时，请输入注册使用的邮箱和密码。发送后会立即登出。",
    verified: "您的邮箱已完成验证，现在可以登入。", back: "返回登入",
    show: "显示密码", hide: "隐藏密码", theme: "外观", system: "跟随系统", light: "日间", dark: "夜间",
    language: "语言", note: "以您的步调，温柔开启每一步。",
  },
};
export type AuthLanguage = keyof typeof authDictionary;
export type AuthTextKey = keyof typeof authDictionary.en;

export function formatVerificationSent(language: AuthLanguage, email: string | null) {
  const translated = authDictionary[language]?.sentTo;
  // A stale client dictionary or missing translation must not crash the page.
  const template = typeof translated === "string" && translated.trim()
    ? translated
    : language === "zh"
      ? "验证邮件已发送到 {email}，请检查收件箱（包括垃圾邮件）"
      : "Verification email sent to {email}. Please check your inbox, including your spam folder.";
  return template.replace("{email}", () => email ?? "");
}
