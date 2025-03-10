import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
  PrimaryKey,
  Default,
  AutoIncrement,
} from 'sequelize-typescript';
import { UserRole } from './userRoleModel';

@Table({
  tableName: 'users',
  timestamps: true,
})
export class User extends Model {
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
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password_hash!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  first_name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  last_name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    unique: true,
  })
  phone_number?: string;

  @BelongsToMany(() => UserRole, 'user_roles', 'user_id', 'role_id')
  roles!: UserRole[];
}
