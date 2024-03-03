import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPComponent } from './all-p.component';

describe('AllPComponent', () => {
  let component: AllPComponent;
  let fixture: ComponentFixture<AllPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllPComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
