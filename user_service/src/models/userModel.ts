import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { UserRole } from './userRoleModel';

@Table({
  tableName: 'users',
  timestamps: true, // Enables createdAt and updatedAt fields
})
export class User extends Model {
  declare id: string; // Use 'declare' to avoid conflict with the base Model class

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

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  created_at!: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  updated_at!: Date;

  @BelongsToMany(() => UserRole, 'user_roles', 'user_id', 'role_id')
  roles!: UserRole[];
}
