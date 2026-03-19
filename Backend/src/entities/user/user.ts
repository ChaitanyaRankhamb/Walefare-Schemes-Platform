import { AppError } from "../../Error/appError";
import { AuthProvider, ProviderType } from "./AuthProvider";
import { UserId } from "./userId";

// define User as a class to use DDD (Domain-Driven-Design) architecture. To create a new user document, simply create a new instance of a User class.
export class User {
  private providers: AuthProvider[] = [];

  constructor(
    public readonly id: UserId,
    private email: string,
    private username?: string,
    private avatar?: string,
    private emailVerified: boolean = false,
    private isActive: boolean = true,
    private verificationCode?: number,
    public readonly createdAt: Date = new Date(),
    private updatedAt: Date = new Date(),
  ) {}

  // it is a method to link a provide for a user. 
  addProvider(provider: AuthProvider) {
    const exists = this.providers.find((p) => p.type === provider.type);  // check provider type already linked or not

    if (exists) {
      throw new AppError("Provider Already Linked", 400);
    }

    this.providers.push(provider);
    this.touch();
  }

  getProviders(): AuthProvider[] {
    return this.providers;
  }

  hasProvider(type: ProviderType): boolean {
    return this.providers.some((p) => p.type === type);
  }

  verifyEmail() {
    this.emailVerified = true;
    this.touch();
  }

  getEmail(): string {
    return this.email;
  }

  getUsername(): string | undefined {
    return this.username;
  }

  getAvatar(): string | undefined {
    return this.avatar;
  }

  isEmailVerified(): boolean {
    return this.emailVerified;
  }

  getVerificationCode(): number | undefined {
    return this.verificationCode;
  }

  isUserActive(): boolean {
    return this.isActive;
  }

  private touch() {
    this.updatedAt = new Date();
  }
}
