import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoJugadorComponent } from './tipo-jugador.component';

describe('TipoJugadorComponent', () => {
  let component: TipoJugadorComponent;
  let fixture: ComponentFixture<TipoJugadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoJugadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoJugadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
