module.exports = {
  apps: [
    {
      script: "node_modules/next/dist/bin/next", // Gọi Next.js trực tiếp
      args: "start -p 3000",
      cwd: "/home/trungdienlanh/trung-dien-lanh-full",
      interpreter: "/usr/bin/node",            // Đảm bảo dùng shell đúng
      env: {
        NODE_ENV: "production",           // Mặc định là dev nếu không chọn env
      },
      env_production: {
        NODE_ENV: "production",            // Production mode
        PORT: 3000,                        // Port bạn muốn chạy app
      },
      watch: false,                         // Không tự restart khi code thay đổi
      autorestart: true,                    // Tự restart nếu app crash
      max_memory_restart: "500M",           // Giới hạn RAM để restart nếu bị tràn
    },
  ],
};