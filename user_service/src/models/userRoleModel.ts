import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';
import { User } from './userModel';

@Table({
  tableName: 'roles',
  timestamps: false,
})
export class UserRole extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name!: string;

  @BelongsToMany(() => User, 'user_roles', 'role_id', 'user_id')
  users!: User[];
}
