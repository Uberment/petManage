import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgendaDataPage } from './agenda-data.page';

describe('AgendaDataPage', () => {
  let component: AgendaDataPage;
  let fixture: ComponentFixture<AgendaDataPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AgendaDataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
