import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtatStageComponent } from './etat-stage.component';

describe('EtatStageComponent', () => {
  let component: EtatStageComponent;
  let fixture: ComponentFixture<EtatStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtatStageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EtatStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
