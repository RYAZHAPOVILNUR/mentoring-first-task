import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { loadUsers } from '../../core/state/users/users.actions';
import { getUserList } from '../../core/state/users/users.selector';
import { MaterialModule } from '../../shared/_module/Material.Module';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  usersList$ = this.store.select(getUserList)

  constructor(
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.LoadInitialData()
  }

  datasource: any = [];
  displayColums: string[] = ['id', 'name', 'email', 'phone', 'actions']
  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  async LoadInitialData() {
    await this.store.dispatch(loadUsers())
    this.store.select(getUserList).subscribe(item => {
      this.datasource = new MatTableDataSource(item)
      this.datasource.sort = this.sort
      this.datasource.paginator = this.paginator
    })
  }

  deleteuser() {
    if (confirm("do you want to remove?")) {
      alert('тут могла быть ваша реклама')
    }
  }

  edituser() {
    alert('тут могла быть ваша реклама')
  }

}
