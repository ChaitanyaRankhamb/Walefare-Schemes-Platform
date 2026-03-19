import { AppError } from "../../Error/appError";

export type ProviderType = "google" | "credentials";  // provide type must be google or credentials

// to store the auth information of a user, AuthProvider requires two parameters. One is provider Type and second is provider Id. 
export class AuthProvider {
  constructor(
    public readonly type: ProviderType,
    public readonly providerId: string,
  ) {
    // providerId validation
    if (!providerId) {
      throw new AppError("ProviderId is required", 500);
    }
  }

  // for credentials, there is no provider id so instead of that, we store "LOCAL".
  static credentials(): AuthProvider {
    return new AuthProvider("credentials", "LOCAL");
  }

  static google(providerId: string): AuthProvider {
    return new AuthProvider("google", providerId);
  }

  // getter for provider id as provider userId
  getProviderUserId(): string {
    return this.providerId;
  }
}
