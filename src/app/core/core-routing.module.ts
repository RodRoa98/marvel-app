import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { ListComponent } from './pages/list/list.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { MylistComponent } from './pages/mylist/mylist.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { 
        path: 'list', 
        component: ListComponent 
      },
      { 
        path: 'mylist', 
        component: MylistComponent 
      },
      { 
        path: 'edit-profile', 
        component: EditProfileComponent 
      },
      {
        path: '**', 
        redirectTo: 'list'
      }
    ]
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CoreRoutingModule {}
