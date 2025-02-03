import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditTodoComponent } from './create-edit-todo.component';

describe('CreateEditTodoComponent', () => {
  let component: CreateEditTodoComponent;
  let fixture: ComponentFixture<CreateEditTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEditTodoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateEditTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
