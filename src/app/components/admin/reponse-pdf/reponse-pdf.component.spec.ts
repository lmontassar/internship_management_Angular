import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReponsePdfComponent } from './reponse-pdf.component';

describe('ReponsePdfComponent', () => {
  let component: ReponsePdfComponent;
  let fixture: ComponentFixture<ReponsePdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReponsePdfComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReponsePdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
