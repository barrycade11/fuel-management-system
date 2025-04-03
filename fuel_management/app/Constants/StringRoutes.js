/**
 * A class that provides string routes and utility methods for route management.
 */
class StringRoutes {
  static dev = 'dev';
  static dashboard = 'dashboard';
  static salesTransactions = 'sales-transactions';

  static fuelManagement = 'fuel-management';
  static fuelPrice = 'fuel-management/fuel-price';
  static fuelDelivery = 'fuel-management/fuel-delivery';
  static lubricants = 'fuel-management/lubricants';

  static serviceManagement = 'service-management';
  static inventoryManagement = 'inventory-management';

  static globalSetup = 'global-setup';
  static fuelMaster = 'global-setup/fuel-master';
  static departments = 'global-setup/departments';
  static shifts = 'global-setup/shifts';
  static paymentModes = 'global-setup/payment-modes';
  static discounts = 'global-setup/discounts';
  static dropdownRecords = 'global-setup/dropdown-records';
  static employees = 'global-setup/employees';
  static customers = 'global-setup/customers';
  static targets = 'global-setup/targets';
  static incentives = 'global-setup/incentives';

  static settings = 'settings';
  static register = 'register';
  static permission = 'permissions';

  /**
   * Retrieves the current sub-route from a given pathname.
   *
   * @param {string} pathname - The full pathname.
   * @returns {string|undefined} The last segment of the route or undefined if no pathname is provided.
   */
  getCurrentSubRoute = (pathname) => {
    if (!pathname) return;

    const subRoutes = pathname.split('/');
    return subRoutes[subRoutes.length - 1];
  }

  /**
   * Retrieves the root route from a given pathname.
   *
   * @param {string} pathname - The full pathname.
   * @returns {string|undefined} The first segment of the route after the root or undefined if no pathname is provided.
   */
  getRootRoute = (pathname) => {
    if (!pathname) return;

    const subRoutes = pathname.split('/');
    return subRoutes[1];
  }

}

export default StringRoutes;
