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
import {ResponderQuestionarioComponent} from "../pages/questionarios/responder_questionario";
import {PerfilPacienteComponent} from "../pages/pacientes/perfil_paciente";

//services
import {NoticiasSerice} from '../services/NoticiasService';
import {LoginService} from '../services/LoginService';
import {UsuarioService} from '../services/UsuarioService';
import {PacienteService} from '../services/PacienteService';
import {QuestionarioService} from '../services/QuestionarioService';

//util
import {PressDirective} from '../util/PressDirective';




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
    QuestionariosFormPerguntasComponent,
    PressDirective,
    ResponderQuestionarioComponent,
    PerfilPacienteComponent
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
    QuestionariosFormPerguntasComponent,
    ResponderQuestionarioComponent,
    PerfilPacienteComponent
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Storage,
    NoticiasSerice,
    LoginService,
    UsuarioService,
    PacienteService,
    QuestionarioService
  ]
})
export class AppModule {}
