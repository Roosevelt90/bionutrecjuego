import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModoJuegoComponent } from './modo-juego.component';

describe('ModoJuegoComponent', () => {
  let component: ModoJuegoComponent;
  let fixture: ComponentFixture<ModoJuegoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModoJuegoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModoJuegoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
