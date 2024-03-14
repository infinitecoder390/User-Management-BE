import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';
@Schema({ collection: 'users', timestamps: true })
export class Users {
  @Prop({ default: () => uuidv4(), type: String })
  _id: string;
  @Prop()
  username: string;
  @Prop()
  password: string;
  @Prop({ default: true })
  isActive: boolean;
  @Prop()
  inventory?: InventoryItem[];
}
export class InventoryItem {
  @Prop()
  fieldname: string;
  @Prop()
  originalname: string;
  @Prop()
  encoding: string;
  @Prop()
  mimetype: string;
  @Prop()
  destination: string;
  @Prop()
  filename: string;
  @Prop()
  path: string;
  @Prop()
  size: string;
  @Prop()
  code: string;
}
export const UsersSchema = SchemaFactory.createForClass(Users);
