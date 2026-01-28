import { INestApplication } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { User } from './users/user.entity';
import { UsersService } from './users/users.service';
import * as bcrypt from 'bcrypt';

export async function seedAdmin(app: INestApplication) {
  const usersService = app.get(UsersService);

  try {
    const existingAdmin = await usersService.findByEmail('admin@admin.com');

    if (!existingAdmin) {
      await usersService.create('admin@admin.com', 'admin');
      console.log('✓ Admin user created: admin@admin.com / admin');
    } else {
      console.log('✓ Admin user already exists');
    }
  } catch (error) {
    console.error('Error seeding admin user:', error);
  }
}
