import { currentUser } from "@clerk/nextjs/server";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { getUserByClerkId } from "@/actions/user.action";
import Link from "next/link";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { LinkIcon, MapPinIcon } from "lucide-react";

async function Sidebar() {
    const authUser = await currentUser();
    if (!authUser) return <UnAuthenticatedSidebar />;

    // getting user by Clerk ID from the database
    // this will return the user (along with their fields like followers, following) if it exists, otherwise it will return null
    const user = await getUserByClerkId(authUser.id); // POST: Server action for data fetching
    if (!user) return null;

    return (
        <div className="sticky top-20">
            <Card>
                <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                        <Link
                        href={`/profile/${user.username}`}
                        className="flex flex-col items-center justify-center"
                        >
                            <Avatar className="w-32 h-32 border-2 rounded-md">
                                <AvatarImage src={user.image || "/avatar.png"} />
                            </Avatar>

                            <div className="mt-4 space-y-1">
                                <h3 className="font-semibold">{user.name}</h3>
                                <p className="text-sm text-muted-foreground">{user.username}</p>
                            </div>
                        </Link>

                        {user.bio && <p className="mt-3 text-sm text-muted-foreground">{user.bio}</p>}

                        <div className="w-full">
                            <Separator className="my-4" />
                            <div className="flex justify-between">
                                <div>
                                    <p className="font-medium">{user._count.following}</p>
                                    <p className="text-xs text-muted-foreground">Following</p>
                                </div>
                                <Separator orientation="vertical" />
                                <div>
                                    <p className="font-medium">{user._count.followers}</p>
                                    <p className="text-xs text-muted-foreground">Followers</p>
                                </div>
                            </div>
                            <Separator className="my-4" />
                        </div>

                        <div className="w-full space-y-2 text-sm">
                        <div className="flex items-center text-muted-foreground">
                            <MapPinIcon className="w-4 h-4 mr-2" />
                            {user.location || "No location"}
                        </div>
                        <div className="flex items-center text-muted-foreground">
                            <LinkIcon className="w-4 h-4 mr-2 shrink-0" />
                            {user.website ? (
                            <a href={`${user.website}`} className="hover:underline truncate" target="_blank">
                                {user.website}
                            </a>
                            ) : (
                            "No website"
                            )}
                        </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default Sidebar;

// Unauthenticated Sidebar Component
const UnAuthenticatedSidebar = () => (
    <div className="sticky top-20">
        <Card>
            <CardHeader>
                <CardTitle className="text-center text-xl font-semibold">Welcome Back!</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-center text-muted-foreground mb-4">
                    Login to access your profile and connect with others.
                </p>
                <SignInButton mode="modal">
                    <Button className="w-full" variant="outline">
                        Login
                    </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                    <Button className="w-full mt-2" variant="default">
                        Sign Up
                    </Button>
                </SignUpButton>
            </CardContent>
        </Card>
    </div>
);