import { Component, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { HelperService } from 'src/app/services/helper.service';

declare var bootstrap: any;

@Component({
  selector: 'app-unit-form',
  templateUrl: './unit-form.component.html',
  styleUrls: ['./unit-form.component.scss']
})
export class UnitFormComponent {

  unitID: any;

  unitForm: any = {
    name: null,
    shortcut: null,
    _id: null
  }

  confirmationModal: any;


  constructor(private route: ActivatedRoute,
    private router: Router,
    private helperService: HelperService,
    private renderer: Renderer2,
    private dataService: DataService) {
    this.route.paramMap.subscribe(params => {
      this.unitID = params.get('id');
      if (this.unitID != null && this.unitID != undefined && this.unitID != 'new') {
        this.getUnit(this.unitID);
      }
    });
  }

  ngOnDestroy() {
    if (this.confirmationModal != undefined) {
      this.confirmationModal.dispose();
      this.renderer.removeClass(document.body, "modal-open");
      this.renderer.removeStyle(document.body, "overflow");
      this.renderer.removeStyle(document.body, "padding-right");
    }
  }

  getUnit(id: string) {
    this.dataService.getUnitById(id).subscribe({
      next: data => {
        this.unitForm.name = data.name;
        this.unitForm.shortcut = data.shortcut;
      },
      error: err => {
        this.helperService.showToast('error', err.error.message);
        this.navigateTo('/unitlist')
      },
    })
  }

  updateUnit() {
    this.unitForm._id = this.unitID;
    this.dataService.updateUnit(this.unitForm).subscribe({
      next: data => {
        this.helperService.showToast('success', data.message);
      },
      error: err => {
        this.helperService.showToast('error', err.error.message);
      },
    })
  }

  addUnit() {
    this.dataService.addUnit(this.unitForm).subscribe({
      next: data => {
        this.helperService.showToast('success', data.message);
        this.navigateTo('/unit/' + data.data._id)
      },
      error: err => {
        this.helperService.showToast('error', err.error.message)
      },
    })
  }

  deleteUnit() {
    this.dataService.deleteUnitById(this.unitID).subscribe({
      next: data => {
        this.helperService.showToast('success', data.message);
        this.navigateTo('/unitlist');
      },
      error: err => {
        this.helperService.showToast('error', err.error.message)
      },
    })
  }

  onSubmit() {
    if (this.unitID == "new") {
      this.addUnit();
    } else {
      this.updateUnit();
    }
  }

  navigateTo(url: string) {
    this.router.navigate([url]);
  }

  openModal(id: string) {
    var modalDelationEl = document.getElementById(id);
    this.confirmationModal = new bootstrap.Modal(modalDelationEl, {
      keyboard: true
    });
    this.confirmationModal.show();
  }
}
