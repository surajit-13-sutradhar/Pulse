"use server";

import prisma from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function syncUser() {
    try {
        const { userId } = await auth();
        // Get the Backend API User object when you need access to the user's information
        const user = await currentUser();

        if (!userId || !user) return;

        // check if user already exists in the database
        const existingUser = await prisma.user.findUnique({
            where: {
                clerkId: userId,
            },
        });
        // if user exists, return the existing user
        if (existingUser) return existingUser;

        // for creating a new user
        const dbUser = await prisma.user.create({
            data: {
                clerkId: userId,
                name: `${user.firstName || ""} ${user.lastName || ""}`,
                username: user.username ?? user.emailAddresses[0].emailAddress.split("@")[0],
                email: user.emailAddresses[0].emailAddress,
                image: user.imageUrl,
            },
        });
        // return the newly created user
        return dbUser;
    } catch (error) {
        console.log("Error in syncUser", error);
    }
}

// function to get user by Clerk ID
export async function getUserByClerkId(clerkId: string) {
    return prisma.user.findUnique({
        where: {
            clerkId,
        },
        include: {
            _count: {
                select: {
                followers: true,
                following: true,
                posts: true,
                },
            },
        },
    });
}

export async function getDbUserId() {
    const { userId: clerkId } = await auth();
    if (!clerkId) return null;

    const user = await getUserByClerkId(clerkId);

    if (!user) throw new Error("User not found");

    return user.id;
}