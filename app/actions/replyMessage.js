"use server";

import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function replyToMessage(formData) {
  await connectDB();
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.user) {
    return { error: "You must be logged in to send a message" };
  }

  const { user } = sessionUser;

  const originalMessageId = formData.get("originalMessageId");
  const originalMessage = await Message.findById(originalMessageId);

  if (!originalMessage) {
    return { error: "Original message not found" };
  }

  const newMessage = new Message({
    sender: user.id,
    recipient: originalMessage.sender,
    property: originalMessage.property,
    name: user.name,
    email: user.email,
    phone: user.phone,
    body: formData.get("replyMessage"),
    isReply: true,
    originalMessage: originalMessageId,
  });

  await newMessage.save();

  // Mark the original message as read
  originalMessage.read = true;
  await originalMessage.save();

  revalidatePath("/messages");

  return { success: true };
}

export default replyToMessage;
