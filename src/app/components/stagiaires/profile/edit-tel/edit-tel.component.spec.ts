import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTelComponent } from './edit-tel.component';

describe('EditTelComponent', () => {
  let component: EditTelComponent;
  let fixture: ComponentFixture<EditTelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditTelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
