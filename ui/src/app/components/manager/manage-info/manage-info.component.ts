import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InfoService } from 'src/app/services/info.service';
import { Info } from 'src/app/shared/layouts/interfaces/infoInterface';
import { emptyStringValidator } from 'src/app/validators/emptyStringValidator';

@Component({
  selector: 'app-manage-info',
  templateUrl: './manage-info.component.html',
  styleUrls: ['../../../shared/layouts/manager-layout/manager-layout.component.css']
})
export class ManageInfoComponent implements OnInit {

  
  form: FormGroup;
  infos: Info[] =[];
  showFormEdit: boolean = false;
  
  
  constructor(private infoService: InfoService) {
    this.form = new FormGroup({
      address: new FormControl('', [Validators.required, Validators.maxLength(70),  emptyStringValidator()]),
      contacts: new FormControl('', [Validators.required, Validators.maxLength(30),  emptyStringValidator()]),
      wiFi: new FormControl('', [Validators.required, Validators.maxLength(20),  emptyStringValidator()])
  });
  }

  ngOnInit() {
    
     this.infoService.getInfo()
       .subscribe(infos => {
          this.infos= infos;
            })
  }
  hideEditForm() {
    this.showFormEdit = false;
   
 }

  showEditForm(): void {
   this.form.patchValue({
            address: this.infos[0].address,
            contacts: this.infos[0].contacts,
            wiFi: this.infos[0].wiFi
          })
      this.showFormEdit = true;
  
  }

  submit() {
      let info: Info = {
        address: this.form.value.address,
        id: this.infos[0].id,
        contacts: this.form.value.contacts,
        wiFi: this.form.value.wiFi
      }
      this.infoService.updateInfo(info)
        .subscribe(() => {
         this.infoService.getInfo()
       .subscribe(infos => {
         
          this.infos= infos;
          })
        })
    }
    

}
