import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const db = new PrismaClient();

async function seed() {
  await db.user.create({
    data: {
      password: await bcrypt.hash('', 10),
    },
  });
}

seed();
