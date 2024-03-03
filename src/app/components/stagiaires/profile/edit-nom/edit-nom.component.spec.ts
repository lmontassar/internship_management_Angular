import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNomComponent } from './edit-nom.component';

describe('EditNomComponent', () => {
  let component: EditNomComponent;
  let fixture: ComponentFixture<EditNomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditNomComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditNomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
