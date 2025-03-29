module.exports = {
    apps: [
        {
            name: "vite-app",
            script: "npm",
            args: "run preview",
            env: {
                NODE_ENV: "production",
                PORT: 5173,
                HOST: "0.0.0.0"
            }
        },
        {
            name: "fuel-management-backend",
            script: "npm",
            args: "run live",
            cwd: "fuel_management_backend",
            env: {
                NODE_ENV: "production",
                PORT: "5000"
            },
            watch: true
        }
    ]
};
  