import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "email is already exists"],
    },
    username: {
      type: String,
      required: [true, "username is required"],
      unique: [true, "username is already exists"],
    },
    image: {
      type: String,
    },
    bookmarks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Property",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = models.User || model("user", UserSchema);

export default User;
