import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { UsersListComponent } from './users-list.component';
import { IUser } from '../interfaces/iuser';
import { loadUsers, deleteUser } from '../states/users/users.actions';
import { selectUsers } from '../states/users/users.selectors';
import { CreateEditUserComponent } from './create-edit-user/create-edit-user.component';

describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;
  let store: MockStore;
  let mockDialog: jasmine.SpyObj<MatDialog>;

  const mockUsers: IUser[] = [{
    id: 1,
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@example.com',
    address: {
      street: '123 Main St',
      suite: 'Apt 1',
      city: 'Metropolis',
      zipcode: '12345',
      geo: {
        lat: '40.7128',
        lng: '74.0060',
      },
    },
    phone: '123-456-7890',
    website: 'www.example.com',
    company: {
      name: 'Doe Inc.',
      catchPhrase: 'Innovating the Future',
      bs: 'business solutions',
    },
  }];

  beforeEach(async () => {
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);
    await TestBed.configureTestingModule({
      imports: [UsersListComponent],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: selectUsers,
              value: mockUsers,
            },
          ],
        }),
        { provide: MatDialog, useValue: mockDialog },
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadUsers on init', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    component.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalledWith(loadUsers());
  });

  it('should open dialog for user creation', () => {
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of({}), close: null });
    mockDialog.open.and.returnValue(dialogRefSpyObj);

    component.openDialog();

    expect(mockDialog.open).toHaveBeenCalledWith(CreateEditUserComponent, { data: { isEdit: false } });
  });

  it('should open dialog for user edit', () => {
    const user: IUser = mockUsers[0];
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of({}), close: null });
    mockDialog.open.and.returnValue(dialogRefSpyObj);

    component.openDialog(user);

    expect(mockDialog.open).toHaveBeenCalledWith(CreateEditUserComponent, { data: { user, isEdit: true } });
  });

  it('should handle dialog result for user edit', () => {
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of({ isEdit: true }), close: null });
    mockDialog.open.and.returnValue(dialogRefSpyObj);

    const consoleSpy = spyOn(console, 'log');
    component.openDialog(mockUsers[0]);
    expect(consoleSpy).toHaveBeenCalledWith('User edit completed');
  });

  it('should handle dialog result for user creation', () => {
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of({ isEdit: false }), close: null });
    mockDialog.open.and.returnValue(dialogRefSpyObj);

    const consoleSpy = spyOn(console, 'log');
    component.openDialog();
    expect(consoleSpy).toHaveBeenCalledWith('User creation completed');
  });

  it('should dispatch deleteUser action', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    component.deleteUser(1);
    expect(dispatchSpy).toHaveBeenCalledWith(deleteUser({ id: 1 }));
  });
});
