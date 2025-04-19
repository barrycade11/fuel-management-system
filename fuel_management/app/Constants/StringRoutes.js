/**
 * A class that provides string routes and utility methods for route management.
 */
class StringRoutes {

  static changePassword = '/change-password';

  static dev = 'dev';
  static dashboard = 'dashboard';
  static salesTransactions = 'sales-transactions';
  static oldSalesTransactions = 'sales';

  static fuelManagement = 'fuel-management';
  static fuelPrice = 'fuel-management/fuel-price';
  static fuelDelivery = 'fuel-management/fuel-delivery';

  static fuelDeliveryEdit = 'fuel-management/fuel-delivery-edit';
  static fuelDeliveryList = 'fuel-management/fuel-delivery-list';
  static fuelDeliveryAttachment = 'fuel-management/fuel-delivery-attachment';
  static lubricants = 'fuel-management/lubricants';

  static lubesMaster = 'fuel-management/lubes-master';

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
  static signup = 'global-setup/employees/signup';
  static customers = 'global-setup/customers';
  static targets = 'global-setup/targets';
  static incentives = 'global-setup/incentives';

  static settings = 'settings';
  static register = 'register';
  static permission = 'permissions';

  static stationList = 'station/list';
  static stationDetail = 'details';
  static shifts = 'shifts';

  /**
   * Retrieves the current sub-route from a given pathname.
   *
   * @param {string} pathname - The full pathname.
   * @returns {string|undefined} The last segment of the route or undefined if no pathname is provided.
   */
  getCurrentSubRoute = (pathname) => {
    if (!pathname) return;

    const subRoutes = pathname.split('/')
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
