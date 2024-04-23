import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportePersonasComponent } from './reporte-personas.component';

describe('ReportePersonasComponent', () => {
  let component: ReportePersonasComponent;
  let fixture: ComponentFixture<ReportePersonasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportePersonasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportePersonasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
