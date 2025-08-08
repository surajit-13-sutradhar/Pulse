import { getProfileByUsername, getUserLikedPosts, getUserPosts, isFollowing } from "@/actions/profile.action";
import { notFound } from "next/navigation";

export async function generateMetadata({params}: {params: Promise<{username: string}>}) {
    const {username} = await params;
    const user = await getProfileByUsername(username);

    if (!user) {
        return;
    }

    return {
        title: `${user.name ?? user.username} (@${user.username}) - Pulse`,
        description: user.bio || `Check out ${user.name ?? user.username}'s profile on Pulse.`,
    };
}

async function ProfilePage({params}: {params: Promise<{username: string}>}) {
    // throw new Error("my custom error message");

    const { username } = await params;

    const user = await getProfileByUsername(username);

    if (!user) notFound();

    const [posts, likedPosts, isCurrentUserFollowing] = await Promise.all([
        getUserPosts(user.id),
        getUserLikedPosts(user.id),
        isFollowing (user.id)
    ])

    return <div>Profile Page</div>
}

export default ProfilePage;