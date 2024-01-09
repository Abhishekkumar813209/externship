import AsyncHandler from "express-async-handler";
import Message from "./../Modal/messageModal.js";
import User from "./../Modal/userModal.js";
import Chat from "./../Modal/chatModal.js"

export const allMessages = AsyncHandler(async(req,res)=>{
    try{
        const messages = await Message.find({chat:req.params.chatId})
        .populate("sender","name email")
        .populate("reciever")
        .populate("chat")
        res.join(messages);
    }catch(error){
        res.status(400);
        throw new Error(error.message);
    }
})

export const sendMessage = AsyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);

    console.log(message);
    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");
    message = await message.populate("reciever");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });
    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});