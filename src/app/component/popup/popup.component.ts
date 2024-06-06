import { Component, Inject, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { map } from "rxjs/operators"
import { UserSelector } from '../../ngrx/users.selector'

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss'
})

export class PopupComponent implements OnInit {
  public inputdata: any
  public closemessage = "closed using directive"
  public myform: FormGroup
  public isEdit: boolean

  public userCount$: Observable<number>

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<PopupComponent>,
    private buildr: FormBuilder,
    private store: Store
  ) { this.isEdit = data.isEdit }

  ngOnInit(): void {
    this.inputdata = this.data
    this.userCount$ = this.store.select(UserSelector).pipe(
      map(users => users.length)
    )

    this.userCount$.subscribe(userCount => {
      this.myform = this.buildr.group({
        id: [userCount + 1],
        name: this.buildr.control(""),
        username: this.buildr.control(""),
        email: this.buildr.control(""),
        phone: this.buildr.control(""),
        status: this.buildr.control(true)
      })
      if (this.isEdit) { this.myform.patchValue(this.data.user)}
    })
  };

  public saveUser() {
    this.ref.close(this.myform.value)
  }

  public closePopup() {
    this.ref.close("Closed using function")
  }
}