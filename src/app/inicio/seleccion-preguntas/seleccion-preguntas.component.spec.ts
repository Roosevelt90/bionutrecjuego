import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionPreguntasComponent } from './seleccion-preguntas.component';

describe('SeleccionPreguntasComponent', () => {
  let component: SeleccionPreguntasComponent;
  let fixture: ComponentFixture<SeleccionPreguntasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeleccionPreguntasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionPreguntasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
