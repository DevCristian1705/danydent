import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEncuestaComponent } from './dialog-encuesta.component';

describe('DialogEncuestaComponent', () => {
  let component: DialogEncuestaComponent;
  let fixture: ComponentFixture<DialogEncuestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogEncuestaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogEncuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
