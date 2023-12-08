import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalheAgendaPage } from './detalhe-agenda.page';

describe('DetalheAgendaPage', () => {
  let component: DetalheAgendaPage;
  let fixture: ComponentFixture<DetalheAgendaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetalheAgendaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
