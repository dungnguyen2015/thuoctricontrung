import { query } from "./db";


// Khởi tạo cache store
const queryCache = new Map<string, any>();

// Thêm TTL (Time To Live) management
const ttlMap = new Map<string, NodeJS.Timeout>();

export const cachedQuery = async <T = any>(
  key: string,
  sql: string,
  values?: any[],
  ttl: number = 300000 // 5 phút mặc định
): Promise<T> => {
  // 1. Kiểm tra cache
  if (queryCache.has(key)) {

    return queryCache.get(key) as T;
  }
  
  // 2. Query database
  const result = await query<T>(sql, values);
  
  // 3. Lưu vào cache
  queryCache.set(key, result);
  return result;
};

// Hàm xóa cache thủ công
export const invalidateCache = (key: string) => {
  queryCache.delete(key);
  if (ttlMap.has(key)) {
    clearTimeout(ttlMap.get(key)!);
    ttlMap.delete(key);
  }
};