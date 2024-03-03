import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInstitutComponent } from './edit-institut.component';

describe('EditInstitutComponent', () => {
  let component: EditInstitutComponent;
  let fixture: ComponentFixture<EditInstitutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditInstitutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditInstitutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
