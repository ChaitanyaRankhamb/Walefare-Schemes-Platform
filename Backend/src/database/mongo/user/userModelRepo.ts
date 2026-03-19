import {
  AuthProvider,
  ProviderType,
} from "../../../entities/user/AuthProvider";
import { User } from "../../../entities/user/user";
import { UserId } from "../../../entities/user/userId";

import type {
  UserRepository as IUserRepository,
  CreateUserData,
} from "../../../entities/user/userRepo";
import { AppError } from "../../../Error/appError";

import { UserModel, type UserDocument } from "../user/userModel";

function docToUser(doc: UserDocument): User {
  const user = new User(
    new UserId(doc._id.toString()),
    doc.email,
    doc.username,
    doc.avatar,
    doc.emailVerified,
    doc.isActive,
    doc.verificationCode,
    doc.createdAt,
    doc.updatedAt,
  );

  // map providers
  doc.providers.forEach((p) => {
    if (p.type === "credentials") {
      user.addProvider(AuthProvider.credentials());
    } else if (p.type === "google") {
      user.addProvider(AuthProvider.google(p.providerId));
    }
  });

  return user;
}

export class MongoUserRepository implements IUserRepository {
  // create user
  async createUser(data: CreateUserData): Promise<User> {
    const doc = await UserModel.create({
      email: data.email,
      username: data.username,
      avatar: data.avatar,
      emailVerified: data.emailVerified ?? false,
      verificationCode: data.verificationCode,
      isActive: data.isActive ?? true,
      providers: [],
    });

    return docToUser(doc);
  }

  // update user
  async updateUser(user: User): Promise<User> {
    const providers = user.getProviders().map((p) => ({
      type: p.type,
      providerId: p.getProviderUserId(),
    }));

    const doc = await UserModel.findByIdAndUpdate(
      {
        email: user.getEmail(),
        username: user.getUsername(),
        avatar: user.getAvatar(),
        emailVerified: user.isEmailVerified(),
        isActive: user.isUserActive(),
        verificationCode: user.getVerificationCode(),
        providers,
      },
      { new: true },
    );

    if (!doc) {
      throw new AppError("Error in updating", 404);
    }

    return docToUser(doc);
  }
  
  // delete User
  async deleteUser(id: UserId): Promise<User | null> {
  const doc = await UserModel.findOneAndDelete({
    id: id.toString(),
  });

  return doc ? docToUser(doc) : null;
}

  async findUserByID(id: UserId): Promise<User | null> {
    const doc = await UserModel.findById(id.toString());
    return doc ? docToUser(doc) : null;
  }

  async findUserByUsername(username: string): Promise<User | null> {
    const doc = await UserModel.findOne({ username });
    return doc ? docToUser(doc) : null;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const doc = await UserModel.findOne({
      email: email.toLowerCase(),
    });
    return doc ? docToUser(doc) : null;
  }

  // OAuth lookup
  async findByProvider(
    type: ProviderType,
    providerId: string,
  ): Promise<User | null> {
    const doc = await UserModel.findOne({
      providers: {
        $elemMatch: { type, providerId }, // elemMatch finds the object of an array who satisfied the all provided conditions
      },
    });

    return doc ? docToUser(doc) : null;
  }
}

export const userRepository = new MongoUserRepository();
