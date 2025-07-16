"use client";

import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";

const CreatePost = () => {
    const { user } = useUser();
    const [content, setContent] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [isPosting, setIsPosting] = useState(false);
    const [showImageUpload, setShowImageUpload] = useState(false);

    const handleSubmit = async () => {

    }

    return (
        <Card className="mb-6">
            <CardContent className="pt-6">
                <div className="flex space-x-4">
                    <Avatar className="w-10 h-10">
                        <AvatarImage src={user?.imageUrl || "/avatar.png"} />
                    </Avatar>
                    <Textarea
                    placeholder="What's on your mind?"
                    className="min-h-[100px] resize-none border-none focus-visible:ring-0 p-0 text-base"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    disabled={isPosting}
                    />
                </div>
            </CardContent>
        </Card>
    )
}

export default CreatePost