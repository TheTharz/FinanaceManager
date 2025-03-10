import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'roles',
  timestamps: false,
})
export class UserRole extends Model {
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  role_name!: string;
}
