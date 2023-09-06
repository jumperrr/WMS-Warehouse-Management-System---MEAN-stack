import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  /* Product region */
  getAllProducts(): Observable<any> {
    return this.http.get(API_URL + 'product');
  }

  getProductById(id: string): Observable<any> {
    return this.http.get(API_URL + 'product/' + id);
  }

  addProduct(data: any): Observable<any> {
    return this.http.post(API_URL + 'product', {
      name: data.name,
      unit_id: data.unit
    }, httpOptions);
  }

  updateProduct(data: any): Observable<any> {
    return this.http.put(API_URL + 'product/' + data._id, {
      name: data.name,
      unit: data.unit
    }, httpOptions);
  }

  deleteProductById(id: string): Observable<any> {
    return this.http.delete(API_URL + 'product/' + id);
  }
  /* End region */

  /* Supplier region */
  getAllSuppliers(filter: any): Observable<any> {
    return this.http.get(API_URL + 'supplier', {params: filter});
  }

  getSupplierById(id: string): Observable<any> {
    return this.http.get(API_URL + 'supplier/' + id);
  }

  addSupplier(data: any): Observable<any> {
    return this.http.post(API_URL + 'supplier', {
      name: data.name,
      address: data.address,
      nip: data.nip,
      email: data.email,
      phoneNumber: data.phoneNumber,
      products: data.products,
    }, httpOptions);
  }

  updateSupplier(data: any): Observable<any> {
    return this.http.put(API_URL + 'supplier/' + data._id, {
      name: data.name,
      address: data.address,
      nip: data.nip,
      email: data.email,
      phoneNumber: data.phoneNumber,
      products: data.products,
    }, httpOptions);
  }

  deleteSupplierById(id: string): Observable<any> {
    return this.http.delete(API_URL + 'supplier/' + id);
  }
  /* End region */

  /* Warehouse region */
  getAllWarehouses(): Observable<any> {
    return this.http.get(API_URL + 'warehouse');
  }

  getWarehouseById(id: string): Observable<any> {
    return this.http.get(API_URL + 'warehouse/' + id);
  }

  addWarehouse(data: any): Observable<any> {
    return this.http.post(API_URL + 'warehouse', {
      name: data.name
    }, httpOptions);
  }

  updateWarehouse(data: any): Observable<any> {
    return this.http.put(API_URL + 'warehouse/' + data._id, {
      name: data.name
    }, httpOptions);
  }

  deleteWarehouseById(id: string): Observable<any> {
    return this.http.delete(API_URL + 'warehouse/' + id);
  }
  /* End region */

  /* Area region */
  getAllAreas(): Observable<any> {
    return this.http.get(API_URL + 'area');
  }

  getAreaById(id: string): Observable<any> {
    return this.http.get(API_URL + 'area/' + id);
  }

  addArea(data: any): Observable<any> {
    return this.http.post(API_URL + 'area', {
      name: data.name,
      warehouse_id: data.warehouse
    }, httpOptions);
  }

  updateArea(data: any): Observable<any> {
    return this.http.put(API_URL + 'area/' + data._id, {
      name: data.name,
      warehouse: data.warehouse
    }, httpOptions);
  }

  deleteAreaById(id: string): Observable<any> {
    return this.http.delete(API_URL + 'area/' + id);
  }
  /* End region */

  /* Storage region */
  getAllStorages(): Observable<any> {
    return this.http.get(API_URL + 'storage');
  }

  getStorageById(id: string): Observable<any> {
    return this.http.get(API_URL + 'storage/' + id);
  }

  addStorage(data: any): Observable<any> {
    return this.http.post(API_URL + 'storage', {
      name: data.name,
      area_id: data.area
    }, httpOptions);
  }

  updatStorage(data: any): Observable<any> {
    return this.http.put(API_URL + 'storage/' + data._id, {
      name: data.name,
      area: data.area
    }, httpOptions);
  }

  deleteStorageById(id: string): Observable<any> {
    return this.http.delete(API_URL + 'storage/' + id);
  }
  /* End region */

  /* Customer region */
  getAllCustomers(): Observable<any> {
    return this.http.get(API_URL + 'customer');
  }

  getCustomerById(id: string): Observable<any> {
    return this.http.get(API_URL + 'customer/' + id);
  }

  addCustomer(data: any): Observable<any> {
    return this.http.post(API_URL + 'customer', {
      name: data.name,
      address: data.address,
      nip: data.nip,
      duns: data.duns,
      email: data.email,
      phoneNumber: data.phoneNumber,
    }, httpOptions);
  }

  updateCustomer(data: any): Observable<any> {
    return this.http.put(API_URL + 'customer/' + data._id, {
      name: data.name,
      address: data.address,
      nip: data.nip,
      duns: data.duns,
      email: data.email,
      phoneNumber: data.phoneNumber,
    }, httpOptions);
  }

  deleteCustomerById(id: string): Observable<any> {
    return this.http.delete(API_URL + 'customer/' + id);
  }
  /* End region */

  /* Unit region */
  getAllUnits(): Observable<any> {
    return this.http.get(API_URL + 'unit');
  }

  getUnitById(id: string): Observable<any> {
    return this.http.get(API_URL + 'unit/' + id);
  }

  addUnit(data: any): Observable<any> {
    return this.http.post(API_URL + 'unit', {
      name: data.name,
      shortcut: data.shortcut,
    }, httpOptions);
  }

  updateUnit(data: any): Observable<any> {
    return this.http.put(API_URL + 'unit/' + data._id, {
      name: data.name,
      shortcut: data.shortcut,
    }, httpOptions);
  }

  deleteUnitById(id: string): Observable<any> {
    return this.http.delete(API_URL + 'unit/' + id);
  }
  /* End region */


  /* Status region */
  getAllStatuses(): Observable<any> {
    return this.http.get(API_URL + 'status');
  }

  getStatusById(id: string): Observable<any> {
    return this.http.get(API_URL + 'status/' + id);
  }

  addStatus(data: any): Observable<any> {
    return this.http.post(API_URL + 'status', {
      name: data.name,
    }, httpOptions);
  }

  updateStatus(data: any): Observable<any> {
    return this.http.put(API_URL + 'status/' + data._id, {
      name: data.name,
    }, httpOptions);
  }

  deleteStatusById(id: string): Observable<any> {
    return this.http.delete(API_URL + 'status/' + id);
  }
  /* End region */

  /* User region */
  getAllUsers(): Observable<any> {
    return this.http.get(API_URL + 'user');
  }

  getUserById(id: string): Observable<any> {
    return this.http.get(API_URL + 'user/' + id);
  }

  updateUser(data: any): Observable<any> {
    return this.http.put(API_URL + 'user/' + data._id, {
      quantity: data.quantity,
      product: data.product,
      storage: data.storage

    }, httpOptions);
  }

  deleteUserById(id: string): Observable<any> {
    return this.http.delete(API_URL + 'user/' + id);
  }
  /* End region */

  /* Storage-product region */
  getAllStorageProduct(filter: any): Observable<any> {
    return this.http.get(API_URL + 'storageproduct', {params: filter});
  }

  getStorageProductById(id: string): Observable<any> {
    return this.http.get(API_URL + 'storageproduct/' + id);
  }

  addStorageProduct(data: any): Observable<any> {
    return this.http.post(API_URL + 'storageproduct/', {
      quantity: data.quantity,
      product_id: data.product_id,
      storage_id: data.storage_id
    }, httpOptions);
  }

  updateStorageProduct(data: any): Observable<any> {
    return this.http.put(API_URL + 'storageproduct/' + data._id, {
      quantity: data.quantity,
      product: data.product,
      storage: data.storage
    }, httpOptions);
  }

  deleteStorageProductById(id: string): Observable<any> {
    return this.http.delete(API_URL + 'storageproduct/' + id);
  }
  /* End region */


    /* Purchase order region */
    getAllPurchaseOrder(filter: any): Observable<any> {
      return this.http.get(API_URL + 'purchaseorder', {params: filter});
    }
  
    getPurchaseOrderById(id: string): Observable<any> {
      return this.http.get(API_URL + 'purchaseorder/' + id);
    }
  
    addPurchaseOrder(data: any): Observable<any> {
      return this.http.post(API_URL + 'purchaseorder', {
        supplier_id: data.supplier,
        deliveryDate: data.deliveryDate,
        products: data.products,
        status_id: data.status
      }, httpOptions);
    }
  
    updatePurchaseOrder(data: any): Observable<any> {
      return this.http.put(API_URL + 'purchaseorder/' + data._id, {
        supplier: data.supplier,
        deliveryDate: data.deliveryDate,
        products: data.products,
        status: data.status
      }, httpOptions);
    }
  
    deletePurchaseOrderById(id: string): Observable<any> {
      return this.http.delete(API_URL + 'purchaseorder/' + id);
    }
    /* End region */


}
