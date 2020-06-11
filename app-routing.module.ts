import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GettingStartedComponent } from './getting-started/getting-started.component';
import { LandingBodyComponent } from './landing-body/landing-body.component';
import { SurveyitemComponent } from './surveyitem/surveyitem.component';
import { SurveyinventoryComponent } from './surveyinventory/surveyinventory.component';
import { GlossaryComponent } from './glossary/glossary.component';
import { VisitorGlossaryComponent } from './visitor-glossary/visitor-glossary.component';
import { AdmininventoryComponent } from './admininventory/admininventory.component';
import { AdminItemComponent } from './admin-item/admin-item.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CollectionsComponent } from './collections/collections.component';
import { EngagementComponent } from './engagement/engagement.component';
import { RespondentComponent } from './respondent/respondent.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'landingPage',
    pathMatch: 'full'
  },
  {
    path: 'gettingStarted',
    component: GettingStartedComponent
  },
  {
    path: 'landingPage',
    component: LandingBodyComponent
  },
  {
    path: 'surveyItem',
    component: SurveyitemComponent
  },
  {
    path: 'surveyinventory',
    component: SurveyinventoryComponent
  },
  {
    path: 'glossary',
    component: GlossaryComponent
  },
  {
    path: 'visitorGlossary',
    component: VisitorGlossaryComponent
  },
  {
    path: 'adminInventory',
    component: AdmininventoryComponent
  },
  {
    path: 'calendar',
    component: CalendarComponent
  },
  {
    path: 'adminItem',
    component: AdminItemComponent
  },
  {
    path: 'collections',
    component: CollectionsComponent
  },
  {
    path: 'engagement',
    component: EngagementComponent
  },
  {
    path: 'respondent',
    component: RespondentComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
