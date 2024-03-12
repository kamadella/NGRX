import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CounterdisplayComponent } from './component/counterdisplay/counterdisplay.component';
import { CounterbuttonComponent } from './component/counterbutton/counterbutton.component';
import { StoreModule } from '@ngrx/store';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from './Material.Module';
import { CustomcounterComponent } from './component/customcounter/customcounter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuheaderComponent } from './component/menuheader/menuheader.component';
import { BlogComponent } from './component/blog/blog.component';
import { CounterComponent } from './component/counter/counter.component';
import { EditblogComponent } from './component/editblog/editblog.component';
import { HomeComponent } from './component/home/home.component';
import { AppState } from './shared/store/Global/App.state';
import { AddblogComponent } from './component/addblog/addblog.component';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { BlogEffects } from './shared/store/Blog/Blog.effects';

@NgModule({
  declarations: [
    AppComponent,
    CounterdisplayComponent,
    CounterbuttonComponent,
    CustomcounterComponent,
    MenuheaderComponent,
    BlogComponent,
    CounterComponent,
    EditblogComponent,
    HomeComponent,
    AddblogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    StoreModule.forRoot(AppState),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    EffectsModule.forRoot([BlogEffects])
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
