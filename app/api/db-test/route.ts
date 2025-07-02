import mysql from 'mysql2/promise'
import { NextResponse } from 'next/server'

const pool = mysql.createPool({
  uri: process.env.DATABASE_URL,
  connectionLimit: 5,
})

export async function GET() {
  try {
    const [rows] = await pool.query('SELECT NOW() as now')
    return NextResponse.json({ success: true, time: rows[0].now })
  } catch (error: any) {
    console.error('DB connection error:', error.message)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}