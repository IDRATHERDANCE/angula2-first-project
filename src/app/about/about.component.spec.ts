import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { AboutComponent } from './about.component';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import sinon from 'sinon'



import { provideRoutes } from '@angular/router';
import { TopService } from '../shared/top.service';
import { CommonCalls } from '../shared/commonCalls.service';
import { HttpgetService } from '../shared/httpget.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import { DataActions } from '../../actions/data-actions';

import { NgRedux, select  } from '@angular-redux/store';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; 
import { PrepareObj } from '../shared/prepareObjects.service';


// mocks
import { TopServiceMock } from '../shared/mockServicesForTesting/top.service.mock';
import { CommonCallsMock } from '../shared/mockServicesForTesting/commonCalls.service.mock';




// import { Router } from '@angular/router';
// import { DOCUMENT } from '@angular/platform-browser';



describe('about component tests', () => {

let component: AboutComponent,
    fixture: ComponentFixture<AboutComponent>,
    debugElement: DebugElement,
    htmlElement: HTMLElement;

  // let CommonCallsMock = sinon.stub();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule, BrowserAnimationsModule],
      declarations: [AboutComponent],
      providers: [ HttpgetService, DataActions, NgRedux, PrepareObj, provideRoutes([])]
    }).compileComponents();

    TestBed.overrideComponent(AboutComponent, {
      set: {
        providers: [
          { provide: TopService, useClass: TopServiceMock },
          { provide: CommonCalls, useClass: CommonCallsMock }
          
        ]
      }
    })
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement.query(By.css('.column_right'));
    htmlElement = debugElement.nativeElement;
  });

  it('should call scroll to top', () => {
    component.ngAfterViewInit();
    fixture.detectChanges();
    let setTop = component.topService.setTop(component._renderer);
    expect<any>(setTop).toEqual('scrolled to top');
  });

  it('should call commonCalls service', () => {
    component.ngOnInit();
    fixture.detectChanges();
    const callback = () => {};
    let mockResponse = component.common.calls('', {}, callback);

    
    // console.log(htmlElement)

  });

});
