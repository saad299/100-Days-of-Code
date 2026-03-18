import mongoose, { Document } from "mongoose";
export interface UserInterface extends Document {
    name: string;
    email: string;
    password: string;
}
declare const user: mongoose.Model<UserInterface, {}, {}, {}, mongoose.Document<unknown, {}, UserInterface, {}, mongoose.DefaultSchemaOptions> & UserInterface & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, UserInterface>;
export default user;
//# sourceMappingURL=user.d.ts.map