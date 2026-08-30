import { UserDocument } from '../domain/user.schema.js';

export class UserViewDTO {
  id: string;
  login: string;
  email: string;
  createdAt: Date;

  static mapDocToView(userDoc: UserDocument): UserViewDTO {
    const item = new this();
    item.id = userDoc._id.toString();
    item.login = userDoc.login;
    item.email = userDoc.email;
    item.createdAt = userDoc.createdAt;

    return item;
  }
}
