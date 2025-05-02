import { db } from '@/lib/db';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { RowDataPacket } from 'mysql2';

const SECRET = process.env.JWT_SECRET || 'super-secret';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const [rows] = await db.execute('SELECT * FROM admins WHERE email = ?', [email]) as RowDataPacket[];
  const admin = Array.isArray(rows) && rows[0];

  if (!admin) {
    return new Response('Email không tồn tại', { status: 401 });
  }

  const isMatch = await bcrypt.compare(password, admin.password || '');

  if (!isMatch) {
    return new Response('Sai mật khẩu', { status: 401 });
  }

  const token = jwt.sign({ id: admin.id, role: 'admin' }, SECRET, { expiresIn: '1d' });

  const isProduction = process.env.NODE_ENV === 'production';

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      'Set-Cookie': `token=${token}; Path=/; HttpOnly; ${isProduction ? 'Secure;' : ''} SameSite=Strict`,
    },
  });
}