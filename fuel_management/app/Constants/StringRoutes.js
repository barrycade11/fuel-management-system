/**
 * A class that provides string routes and utility methods for route management.
 */
class StringRoutes {
  // Auth routes
  /** @type {string} The login route. */
  static login = '/auth/login';

  // Main sections
  /** @type {string} The development route. */
  static dev = 'dev';
  /** @type {string} The dashboard route. */
  static dashboard = 'dashboard';
  /** @type {string} The sales transactions route. */
  static salesTransactions = 'sales-transactions';

  // Fuel management routes
  /** @type {string} The fuel management root route. */
  static fuelManagement = 'fuel-management';
  /** @type {string} The fuel price route under fuel management. */
  static fuelPrice = 'fuel-management/fuelPrice';
  /** @type {string} The fuel delivery route under fuel management. */
  static fuelDelivery = 'fuel-management/fuelDelivery';
  /** @type {string} The lubricants route under fuel management. */
  static lubricants = 'fuel-management/lubricants';

  // Service and inventory management routes
  /** @type {string} The service management route. */
  static serviceManagement = 'service-management';
  /** @type {string} The inventory management route. */
  static inventoryManagement = 'inventory-management';

  // Settings and permissions routes
  /** @type {string} The settings route. */
  static settings = 'settings';
  /** @type {string} The permissions route. */
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
