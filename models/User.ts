import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser {
  username: string;
  password: string;
  role?: string;
}

interface IUserDocument extends IUser {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

(userSchema as any).pre("save", async function (this: any, next: (err?: Error) => void) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (this: IUserDocument, candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default model<IUser, any>("User", userSchema);
