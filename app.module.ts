import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material';
import { MenuComponent } from './menu/menu.component';
import { LandingBodyComponent } from './landing-body/landing-body.component';
import { GettingStartedComponent } from './getting-started/getting-started.component';
import { NgbModule, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { SurveyinventoryComponent } from './surveyinventory/surveyinventory.component';
import { SurveyitemComponent } from './surveyitem/surveyitem.component';
import { CollectionsComponent } from './collections/collections.component';
import { MatInputModule } from '@angular/material';

import { SectiondataService } from './surveyinventory/sectiondata.service';
import { GetMenuDataService } from './menu/get-menu-data.service';
import { GetglossarydataService } from './glossary/getglossarydata.service';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { SidebarModule } from 'primeng/sidebar';
import { TabViewModule } from 'primeng/tabview';
import { CalendarModule } from 'primeng/calendar';

import { GlossaryComponent } from './glossary/glossary.component';
import { VisitorGlossaryComponent } from './visitor-glossary/visitor-glossary.component';
import { GetCollectionDataService } from './surveyitem/get-collection-data.service';
import { CarouselModule } from 'primeng/carousel';
import { GetImagesService } from './landing-body/get-images.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DataStoreService } from './data-store.service';
import { AdmininventoryComponent } from './admininventory/admininventory.component';
import { AdminItemComponent } from './admin-item/admin-item.component';

import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/primeng';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarComponent } from './calendar/calendar.component';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { ChartModule } from 'primeng/chart';
import { EngagementComponent } from './engagement/engagement.component';
import { RespondentComponent } from './respondent/respondent.component';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
// import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LandingBodyComponent,
    GettingStartedComponent,
    SurveyinventoryComponent,
    SurveyitemComponent,
    CollectionsComponent,
    GlossaryComponent,
    VisitorGlossaryComponent,
    AdmininventoryComponent,
    AdminItemComponent,
    CalendarComponent,
    EngagementComponent,
    RespondentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgbModule,
    HttpClientModule,
    MatInputModule,
    TableModule,
    PanelModule,
    CarouselModule,
    NgxSpinnerModule,
    SidebarModule,
    TabViewModule,
    FormsModule,
    DropdownModule,
    ToastModule,
    DialogModule,
    InputMaskModule,
    InputTextModule,
    InputTextareaModule,
    FullCalendarModule,
    CalendarModule,
    ChartModule
  ],
  providers: [MessageService, SectiondataService, GetMenuDataService, GetglossarydataService, GetCollectionDataService,
    GetImagesService, DataStoreService],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }
