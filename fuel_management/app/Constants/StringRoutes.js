
class StringRoutes {
  //auth 
  static login = '/auth/login';

  static dev = 'dev';
  static dashboard = 'dashboard';
  static salesTransactions = 'sales-transactions';

  static fuelManagement = 'fuel-management';
  static fuelPrice = 'fuel-management/fuelPrice';
  static fuelDelivery = 'fuel-management/fuelDelivery';
  static lubricants = 'fuel-management/lubricants';


  static serviceManagement = 'service-management';
  static inventoryManagement = 'inventory-management';

  static settings = 'settings';
  static permission = 'permissions';

  getCurrentSubRoute = (pathname) => {
    if(!pathname) return;

    const subRoutes = pathname.split('/');
    return subRoutes[subRoutes.length - 1];
  }

  getRootRoute = (pathname) => {
    if(!pathname) return;

    const subRoutes = pathname.split('/');
    return subRoutes[1];

  }

}

export default StringRoutes;
