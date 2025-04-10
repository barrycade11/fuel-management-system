module.exports = {
    apps: [
        {
            name: "fuel-management",
            script: "npm",
            args: "run start",
            cwd: "fuel_management",
            env: {
                NODE_ENV: "production",
                PORT: 3000
            },
            watch: true
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
  