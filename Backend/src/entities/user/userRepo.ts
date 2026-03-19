import { User } from "./user";
import { UserId } from "./userId";

export interface CreateUserData {
  id: UserId;
  email: string;
  username?: string;
  avatar?: string;
  emailVerified?: boolean;
  verificationCode?: number;
  isActive?: boolean;
}

export interface UserRepository {
  createUser(data: CreateUserData): Promise<User>;
  updateUser(user: User): Promise<User>;
  deleteUser(id: UserId): Promise<User | null>;
  findUserByID(id: UserId): Promise<User | null>;
  findUserByUsername(username: string): Promise<User | null>;
  findUserByEmail(email: string): Promise<User | null>;
  findByProvider(type: string, providerId: string): Promise<User | null>;
}
