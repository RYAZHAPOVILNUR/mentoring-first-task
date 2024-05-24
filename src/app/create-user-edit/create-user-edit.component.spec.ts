import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserEditComponent } from './create-user-edit.component';

describe('CreateUserEditComponent', () => {
  let component: CreateUserEditComponent;
  let fixture: ComponentFixture<CreateUserEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUserEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateUserEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
