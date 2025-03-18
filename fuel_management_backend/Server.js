const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const fuelMastersRoutes = require("./Setup/GlobalRecords/FuelMaster");
app.use("/Setup/GlobalRecords", fuelMastersRoutes);

const departmentRoutes = require("./Setup/GlobalRecords/Department");
app.use("/Setup/GlobalRecords", departmentRoutes);

const shiftRoutes = require("./Setup/GlobalRecords/Shift");
app.use("/Setup/GlobalRecords", shiftRoutes);

const paymentModeRoutes = require("./Setup/GlobalRecords/PaymentMode");
app.use("/Setup/GlobalRecords", paymentModeRoutes);

const discountRoutes = require("./Setup/GlobalRecords/Discount");
app.use("/Setup/GlobalRecords", discountRoutes);

const dropdownRoutes = require("./Setup/GlobalRecords/Dropdown");
app.use("/Setup/GlobalRecords", dropdownRoutes);

const employeeRoutes = require("./Setup/GlobalRecords/Employee");
app.use("/Setup/GlobalRecords", employeeRoutes);

const port = process.env.PORT;

app.listen(port, () => console.log(`Server running on port ${port}`));