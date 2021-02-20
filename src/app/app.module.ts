import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { UserService } from './services/user/user.service';
import { RolesService } from './services/roles/roles.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { UserTableComponent } from './components/user-table/user-table.component';
import { RolesTableComponent } from './components/roles-table/roles-table.component';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';
import { HomeSidebarComponent } from './components/home-sidebar/home-sidebar.component';
import { HomeFilterComponent } from './components/home-filter/home-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    UserTableComponent,
    RolesTableComponent,
    UserDialogComponent,
    HomeSidebarComponent,
    HomeFilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    FormsModule,
  ],
  providers: [UserService, RolesService, AngularFireModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
