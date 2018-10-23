import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PersonsComponent } from './persons/persons.component';
import { WorksComponent } from './works/works.component';
import { SearchComponent } from './search/search.component';
import { PersonDetailComponent } from './person-detail/person-detail.component';
import { FormsModule } from '@angular/forms';
import { WorkDetailComponent } from './work-detail/work-detail.component';
import { PersonSearchComponent } from './person-search/person-search.component';
import { PersonFoundComponent } from './person-found/person-found.component';
import { WorkSearchComponent } from './work-search/work-search.component';
import { WorkFoundComponent } from './work-found/work-found.component';
import { WorkSearchFormComponent } from './work-search-form/work-search-form.component';
import { PersonSearchFormComponent } from './person-search-form/person-search-form.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonsComponent,
    PersonDetailComponent,
    WorksComponent,
    SearchComponent,
    PersonDetailComponent,
    WorkDetailComponent,
    PersonSearchComponent,
    PersonFoundComponent,
    WorkSearchComponent,
    WorkFoundComponent,
    WorkSearchFormComponent,
    PersonSearchFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
