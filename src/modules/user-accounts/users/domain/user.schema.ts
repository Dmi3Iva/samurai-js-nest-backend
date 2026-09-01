import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Types } from 'mongoose';
import { UserViewDTO } from '../dto/user-view.dto.js';

@Schema({
  timestamps: true,
})
export class User {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;

  @Prop({ required: true, type: String, unique: true, maxLength: 200 })
  login: string;

  @Prop({ required: true, type: String, maxLength: 200 })
  password: string;

  @Prop({ required: true, type: String, unique: true, maxLength: 200 })
  email: string;

  static createInstance() {
    return new this();
  }

  mapToView(): UserViewDTO {
    const result: UserViewDTO = {
      id: this._id.toString(),
      login: this.login,
      email: this.email,
      createdAt: this.createdAt,
    };

    return result;
  }
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.loadClass(User);

export type UserDocument = HydratedDocument<User>;

export type UserModelType = Model<UserDocument> & typeof User;
