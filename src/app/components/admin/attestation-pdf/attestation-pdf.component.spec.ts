import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttestationPdfComponent } from './attestation-pdf.component';

describe('AttestationPdfComponent', () => {
  let component: AttestationPdfComponent;
  let fixture: ComponentFixture<AttestationPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttestationPdfComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttestationPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
