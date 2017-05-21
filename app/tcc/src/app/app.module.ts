import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule, JsonpModule } from '@angular/http';
import {Storage} from "@ionic/storage"

//components
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { AgendaComponent } from '../pages/agenda/agenda';
import {SosComponent} from "../pages/sos/sos";
import {LoginComponent} from "../pages/login/login";
import {CreateUserComponent} from "../pages/login/createUser";
import {ConfiUserComponent} from "../pages/config/config_user";
import {VincularProfissionalComponent} from "../pages/config/vincular_profissional";
import {PacienteComponent} from "../pages/pacientes/paciente";
import {QuestionariosListaComponent} from "../pages/questionarios/questionarios_lista";
import {QuestionariosFormComponent} from "../pages/questionarios/questionarios_form";
import {QuestionariosFormPerguntasComponent} from "../pages/questionarios/questionarios_form_perguntas";

//services
import {NoticiasSerice} from '../services/NoticiasService';
import {LoginService} from '../services/LoginService';
import {UsuarioService} from '../services/UsuarioService';
import {PacienteService} from '../services/PacienteService';




@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    AgendaComponent,
    SosComponent,
    LoginComponent,
    CreateUserComponent,
    ConfiUserComponent,
    VincularProfissionalComponent,
    PacienteComponent,
    QuestionariosListaComponent,
    QuestionariosFormComponent,
    QuestionariosFormPerguntasComponent
  ],
  imports: [
    HttpModule,
    JsonpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    AgendaComponent,
    SosComponent,
    LoginComponent,
    CreateUserComponent,
    ConfiUserComponent,
    VincularProfissionalComponent,
    PacienteComponent,
    QuestionariosListaComponent,
    QuestionariosFormComponent,
    QuestionariosFormPerguntasComponent
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Storage,
    NoticiasSerice,
    LoginService,
    UsuarioService,
    PacienteService
  ]
})
export class AppModule {}
