import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FelicidadesComponent } from './felicidades.component';

describe('FelicidadesComponent', () => {
  let component: FelicidadesComponent;
  let fixture: ComponentFixture<FelicidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FelicidadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FelicidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
