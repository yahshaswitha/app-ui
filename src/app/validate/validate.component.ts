import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms'
import {SharedService} from 'src/app/shared.service';

@Component({
  selector: 'app-validate',
  templateUrl: './validate.component.html',
  styleUrls: ['./validate.component.css']
})

export class ValidateComponent{

  addForm: FormGroup;
  rows: FormArray;
  file: File;

  constructor(private fb: FormBuilder,private service:SharedService) {
    this.addForm = this.fb.group({
      items: [null, Validators.required],
    });
    this.rows = this.fb.array([]);
  }

  ngOnInit() {
    this.addForm.addControl('rows', this.rows);
  }

  get addDynamicRow() {
    return this.addForm.get('rows') as FormArray;
  }

  onAddRow() {
    this.rows.push(this.createItemFormGroup());
  }

  onRemoveRow(rowIndex: number) {
    this.rows.removeAt(rowIndex);
  }

  createItemFormGroup(): FormGroup {
    return this.fb.group({
      colNum: null,
      type: null,
    });
  }

  onSubmit()
  {
    console.log(this.file)
    this.service.validate(this.addForm.value,this.file).subscribe(res=>{
      console.log(res);
    })
  }

  upload(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files.item(0) as File;
    this.file=files;
}
}