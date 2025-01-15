import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { CestaComponent } from './cesta/cesta.component';
import { TallajeComponent } from './tallaje/tallaje.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ProfileComponent } from './profile/profile.component';
import { JerseyContainerComponent } from './jersey-container/jersey-container.component';
import { EventsComponent } from './events/events.component';
import { StatisticsComponent } from './statistics/statistics.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home'
  },
  {
    path: 'statistics',
    component: StatisticsComponent,
    title: 'statistics'
  },
  {
    path: 'header',
    component: HeaderComponent,
    title: 'Header'
  },
  {
    path: 'events',
    component: EventsComponent,
    title: 'Events'
  },
  {
    path: 'footer',
    component: FooterComponent,
    title: 'Footer'
  },
  {
    path: 'catalogo',
    component: CatalogoComponent,
    title: 'Catálogo'
  },
  {
    path: 'catalogo/:id',
    component: JerseyContainerComponent,
    title: 'Jersey'
  },
  {
    path: 'cesta',
    component: CestaComponent,
    title: 'Cesta'
  },
  {
    path: 'tallaje',
    component: TallajeComponent,
    title: 'Tallaje'
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
    title: 'Sobre Nosotros'
  },
  {
    path: 'profile',
    component: ProfileComponent,
    title: 'Perfil'
  }
];