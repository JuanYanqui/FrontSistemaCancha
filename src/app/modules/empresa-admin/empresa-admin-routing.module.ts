import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'reportes',
    loadChildren: () => import("./reportes/reportes.module").then(m => m.ReportesModule)
  },
  {
    path: 'venta',
    loadChildren: () => import("./venta/venta.module").then(m => m.VentaModule)
  },
  {
    path: 'personal',
    loadChildren: () => import("./personal/personal.module").then(m => m.PersonalModule)
  },

  {
    path: 'cliente',
    loadChildren: () => import("./cliente/cliente.module").then(m => m.ClienteModule)
  },
  
  {
    path: 'pedidos',
    loadChildren: () => import("./pedidos/pedidos.module").then(m => m.PedidosModule)
  },

  {
    path: 'gestionpedidos',
    loadChildren: () => import("./gestion-pedido/gestion-pedido.module").then(m => m.GestionPedidoModule)
  },
  {
    path: 'proovedor',
    loadChildren: () => import("./proovedor/proovedor.module").then(m => m.ProovedorModule)
  },
  {
    path: 'bienvenida',
    loadChildren: () => import("./bienvenida-admin-emp/bienvenida-admin-emp.module").then(m => m.BienvenidaAdminEmpModule)
  },
  {
    path: 'dashboard-emp-admin',
    loadChildren: () => import("./dashboard-empresa-admin/dashboard-empresa-admin.module").then(m => m.DashboardEmpresaAdminModule)
  },
  //menus
  {
    path: 'menu-clientes-emp',
    loadChildren: () => import("./menu-cliente-admin/menu-cliente-admin.module").then(m => m.MenuClienteAdminModule)
  },
  {
    path: 'menu-proveedores-emp',
    loadChildren: () => import("./menu-proveedores-admin/menu-proveedores-admin.module").then(m => m.MenuProveedoresAdminModule)
  },
  {
    path: 'menu-bodegas-emp',
    loadChildren: () => import("./menu-bodegas-admin/menu-bodegas-admin.module").then(m => m.MenuBodegasAdminModule)
  },
  {
    path: 'menu-productos-emp',
    loadChildren: () => import("./menu-productos-admin/menu-productos-admin.module").then(m => m.MenuProductosAdminModule)
  },
  {
    path: 'menu-personal-emp',
    loadChildren: () => import("./menu-personal-admin/menu-personal-admin.module").then(m => m.MenuPersonalAdminModule)
  },
  {
    path: 'menu-compra-emp',
    loadChildren: () => import("./menu-compra-admin/menu-compra-admin.module").then(m => m.MenuCompraAdminModule)
  },
  {
    path: 'menu-controlinv-emp',
    loadChildren: () => import("./menu-controlinv-admin/menu-controlinv-admin.module").then(m => m.MenuControlinvAdminModule)
  },
  {
    path: 'menu-pedidos-emp',
    loadChildren: () => import("./menu-pedidos-admin/menu-pedidos-admin.module").then(m => m.MenuPedidosAdminModule)
  },
  {
    path: 'menu-ventas-emp',
    loadChildren: () => import("./menu-ventas-admin/menu-ventas-admin.module").then(m => m.MenuVentasAdminModule)
  },
  {
    path: 'menu-reportes-emp',
    loadChildren: () => import("./menu-reportes-admin/menu-reportes-admin.module").then(m => m.MenuReportesAdminModule)
  },
  
  

  
  

  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpresaAdminRoutingModule { }
