import { CodeBlock } from "@/components/ui/custom/CodeBlock"
import { SectionWrapper } from "@/components/layout/SectionWrapper"

const redisCode = `// Redis Storage for OTP
await redis.set(
  \`otp:\${email}\`,
  otpCode,
  'EX', 300 // Expires in 5 minutes
);

// Verify OTP
const storedOtp = await redis.get(\`otp:\${email}\`);
if (storedOtp === userInput) {
  const user = await User.findOne({ email });
  const token = generateJWT(user);
  res.status(200).json({ token });
} else {
  res.status(401).json({ error: 'Invalid OTP' });
}`

export function PasswordlessSection() {
  return (
    <SectionWrapper id="passwordless" className="border-t bg-muted/30">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="order-2 lg:order-1">
          <CodeBlock code={redisCode} language="TypeScript" />
        </div>
        
        <div className="space-y-8 order-1 lg:order-2">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Passwordless OTP Authentication
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Eliminate passwords for a better user experience. We use Redis for temporary, high-performance storage of OTP codes with automatic expiry handling.
          </p>
          <ul className="space-y-4">
            {[
              "5-minute OTP expiry for security",
              "Redis-based atomic verification",
              "Automatic cleanup after successful login",
              "Rate-limited attempts to prevent brute force",
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span className="font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionWrapper>
  )
}
