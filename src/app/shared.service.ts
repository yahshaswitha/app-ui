import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { FormArray } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  readonly APIUrl="http://127.0.0.1:8000/";

  constructor(private http:HttpClient) { }

  validate(val:any,file:any)
  {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    console.log(val.rows)
    for (const key in val.value) {
      if (val.hasOwnProperty(key)) {
        const element = val[key];
        formData.append(key, element);
      }
    }
    const rows=val.rows as FormArray
    formData.set('rows', JSON.stringify(rows));
    return this.http.post(this.APIUrl + 'validate',formData);
  }
}
