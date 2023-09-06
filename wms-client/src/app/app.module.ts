import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';

import { httpInterceptorProviders } from './helpers/auth.interceptor';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { ManagementPanelComponent } from './components/management-panel/management-panel.component';
import { WarehouseListComponent } from './components/warehouse-list/warehouse-list.component';
import { WarehouseFormComponent } from './components/warehouse-form/warehouse-form.component';
import { AreaListComponent } from './components/area-list/area-list.component';
import { AreaFormComponent } from './components/area-form/area-form.component';
import { StorageListComponent } from './components/storage-list/storage-list.component';
import { StorageFormComponent } from './components/storage-form/storage-form.component';
import { SupplierFormComponent } from './components/supplier-form/supplier-form.component';
import { SupplierListComponent } from './components/supplier-list/supplier-list.component';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { UnitListComponent } from './components/unit-list/unit-list.component';
import { UnitFormComponent } from './components/unit-form/unit-form.component';
import { StatusListComponent } from './components/status-list/status-list.component';
import { StatusFormComponent } from './components/status-form/status-form.component';
import { StorageProductListComponent } from './components/storage-product-list/storage-product-list.component';
import { StorageProductFormComponent } from './components/storage-product-form/storage-product-form.component';
import { PurchaseOrderListComponent } from './components/purchase-order-list/purchase-order-list.component';
import { PurchaseOrderFormComponent } from './components/purchase-order-form/purchase-order-form.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { InventoryListComponent } from './components/inventory-list/inventory-list.component';
import { DatePipe } from '@angular/common';
import { InventoryFormComponent } from './components/inventory-form/inventory-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    NavigationBarComponent,
    ManagementPanelComponent,
    WarehouseListComponent,
    WarehouseFormComponent,
    AreaListComponent,
    AreaFormComponent,
    StorageListComponent,
    StorageFormComponent,
    SupplierFormComponent,
    SupplierListComponent,
    CustomerFormComponent,
    CustomerListComponent,
    OrderListComponent,
    OrderFormComponent,
    ProductListComponent,
    ProductFormComponent,
    UnitListComponent,
    UnitFormComponent,
    StatusListComponent,
    StatusFormComponent,
    StorageProductListComponent,
    StorageProductFormComponent,
    PurchaseOrderListComponent,
    PurchaseOrderFormComponent,
    UserFormComponent,
    UserListComponent,
    InventoryListComponent,
    InventoryFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    DatePipe,
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
