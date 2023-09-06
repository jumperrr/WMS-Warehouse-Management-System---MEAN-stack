import { OrderListComponent } from './components/order-list/order-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ManagementPanelComponent } from './components/management-panel/management-panel.component';
import { SupplierListComponent } from './components/supplier-list/supplier-list.component';
import { SupplierFormComponent } from './components/supplier-form/supplier-form.component';
import { WarehouseListComponent } from './components/warehouse-list/warehouse-list.component';
import { WarehouseFormComponent } from './components/warehouse-form/warehouse-form.component';
import { AreaFormComponent } from './components/area-form/area-form.component';
import { AreaListComponent } from './components/area-list/area-list.component';
import { StorageListComponent } from './components/storage-list/storage-list.component';
import { StorageFormComponent } from './components/storage-form/storage-form.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { UnitListComponent } from './components/unit-list/unit-list.component';
import { UnitFormComponent } from './components/unit-form/unit-form.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { StatusFormComponent } from './components/status-form/status-form.component';
import { StatusListComponent } from './components/status-list/status-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { InventoryListComponent } from './components/inventory-list/inventory-list.component';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { PurchaseOrderListComponent } from './components/purchase-order-list/purchase-order-list.component';
import { PurchaseOrderFormComponent } from './components/purchase-order-form/purchase-order-form.component';
import { InventoryFormComponent } from './components/inventory-form/inventory-form.component';
import { StorageProductListComponent } from './components/storage-product-list/storage-product-list.component';
import { StorageProductFormComponent } from './components/storage-product-form/storage-product-form.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'managmentpanel', component: ManagementPanelComponent },
  { path: 'supplierlist', component: SupplierListComponent },
  { path: 'supplier/:id', component: SupplierFormComponent },
  { path: 'warehouselist', component: WarehouseListComponent },
  { path: 'warehouse/:id', component: WarehouseFormComponent },
  { path: 'arealist', component: AreaListComponent },
  { path: 'area/:id', component: AreaFormComponent },
  { path: 'storagelist', component: StorageListComponent },
  { path: 'storage/:id', component: StorageFormComponent },
  { path: 'customerlist', component: CustomerListComponent },
  { path: 'customer/:id', component: CustomerFormComponent },
  { path: 'unitlist', component: UnitListComponent },
  { path: 'unit/:id', component: UnitFormComponent },
  { path: 'productlist', component: ProductListComponent },
  { path: 'product/:id', component: ProductFormComponent },
  { path: 'statuslist', component: StatusListComponent },
  { path: 'status/:id', component: StatusFormComponent },
  { path: 'userlist', component: UserListComponent },
  { path: 'user/:id', component: UserFormComponent },
  { path: 'inventory', component: InventoryListComponent },
  { path: 'inventoryform', component: InventoryFormComponent },
  { path: 'orderlist', component: OrderListComponent },
  { path: 'order/:id', component: OrderFormComponent },
  { path: 'purchaseorderlist', component: PurchaseOrderListComponent },
  { path: 'purchaseorder/:id', component: PurchaseOrderFormComponent },
  { path: 'storageproductlist', component: StorageProductListComponent },
  { path: 'storageproductform/:id', component: StorageProductFormComponent },
  { path: '**', redirectTo: 'home' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
