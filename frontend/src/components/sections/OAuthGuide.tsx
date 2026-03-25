import { CodeBlock } from "@/components/ui/custom/CodeBlock";
import { SectionWrapper } from "@/components/layout/SectionWrapper";

const steps = [
  {
    title: "1. Create Google Cloud Project",
    description:
      "Navigate to the Google Cloud Console and create a new project for your application.",
  },
  {
    title: "2. Configure OAuth Consent",
    description:
      "Set up the consent screen with your app name, support email, and the required scopes (openid, email, profile).",
  },
  {
    title: "3. Generate Credentials",
    description:
      "Create an OAuth 2.0 Client ID and secret. Ensure the Redirect URI matches your backend callback endpoint.",
  },
];

const backendCode = `// Backend Integration
app.get('/auth/google/callback', async (req, res) => {
  const { code } = req.query;
  const { tokens } = await oauth2Client.getToken(code);
  const userInfo = await verifyGoogleToken(tokens.id_token);
  
  const user = await User.findOneAndUpdate(
    { email: userInfo.email },
    { ...userInfo, lastLogin: new Date() },
    { upsert: true, new: true }
  );

  const token = generateJWT(user);
  res.cookie('token', token, cookieOptions).redirect(process.env.FRONTEND_URL);
});`;

const frontendCode = `// Frontend Component
const GoogleLoginButton = () => {
  const handleLogin = () => {
    window.location.href = \`\${API_URL}/auth/google\`;
  };

  return (
    <button onClick={handleLogin} className="flex items-center gap-2 rounded-xl bg-white border p-3 hover:bg-gray-50">
      <img src="/google.svg" alt="Google" className="h-5 w-5" />
      <span>Sign in with Google</span>
    </button>
  );
};`;

export function OAuthGuide() {
  return (
    <SectionWrapper id="oauth-guide" className="bg-muted/10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div className="space-y-12">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
              OAuth Integration Guide
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Step-by-step instructions to integrate Google OAuth 2.0 into your
              application.
            </p>
          </div>

          <div className="space-y-8">
            {steps.map((step) => (
              <div
                key={step.title}
                className="flex flex-col gap-3 rounded-2xl border bg-background p-6 shadow-sm transition-all hover:shadow-md"
              >
                <h3 className="text-xl font-bold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <CodeBlock code={backendCode} language="TypeScript" />
          <CodeBlock code={frontendCode} language="TSX" />
        </div>
      </div>
    </SectionWrapper>
  );
}
