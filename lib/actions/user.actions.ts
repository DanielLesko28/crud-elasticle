"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { formatError } from "../utils";
import {
  signInFormSchema,
  signUpFormSchema,
  updateUserSchema,
} from "../validators";
import { signIn, signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { hashSync } from "bcrypt-ts-edge";
import { z } from "zod";

const prisma = new PrismaClient();

//Sign in user
export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData
) {
  try {
    const user = signInFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    await signIn("credentials", user);
    return { success: true, message: "User signed in successfully" };
  } catch (e) {
    if (isRedirectError(e)) {
      throw e;
    }

    return { success: false, message: "Email or password are incorrect" };
  }
}

//Sign out user
export async function signOutUser() {
  await signOut();
}

//Sign up user
export async function signUpUser(prevState: unknown, formData: FormData) {
  try {
    const user = signUpFormSchema.parse({
      name: formData.get("name"),
      surname: formData.get("surname"),
      dateOfBirth: formData.get("dateOfBirth"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });

    const plainPassword = user.password;

    user.password = hashSync(user.password, 10);

    const parsedDateOfBirth = new Date(user.dateOfBirth);

    await prisma.user.create({
      data: {
        name: user.name,
        surname: user.surname,
        email: user.email,
        password: user.password,
        dateOfBirth: parsedDateOfBirth,
      },
    });

    await signIn("credentials", {
      email: user.email,
      password: plainPassword,
    });

    return { success: true, message: "User registered successfully" };
  } catch (e) {
    if (isRedirectError(e)) {
      throw e;
    }

    return { success: false, message: formatError(e) };
  }
}

//Get all Users
export async function getAllUsers() {
  const data = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });

  return data;
}

//Delete single user
export async function deleteUser(userId: string) {
  try {
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    revalidatePath("/");
    return {
      success: true,
      message: "User deleted successfully",
    };
  } catch (e) {
    return {
      success: false,
      message: formatError(e),
    };
  }
}

//Get single user
export async function getSingleUserById(userId: string) {
  try {
    const user = await prisma.user.findFirst({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (e) {
    return {
      success: false,
      message: formatError(e),
    };
  }
}

//Update user
export async function updateUser(user: z.infer<typeof updateUserSchema>) {
  try {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        name: user.name,
        email: user.email,
        surname: user.surname,
        dateOfBirth: user.dateOfBirth,
      },
    });

    revalidatePath("/admin/users");

    return {
      success: true,
      message: "User updated successfully",
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
