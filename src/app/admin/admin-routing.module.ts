import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPage } from './admin.page';

import { AdminHomePage } from '../admin/adminhome/adminhome.page';
import { AddPage } from '../admin/add/add.page';
import { EditPage } from '../admin/edit/edit.page';
import { DetailsPage } from '../details/details.page';


const routes: Routes = [
  {
    path: 'admin',
    component: AdminPage,
    children:
      [
        {
          path: '',
        redirectTo: 'adminhome',
        pathMatch: 'full',
      },
      
      {
        path: 'add',
        outlet: 'add',
        component: AddPage
      },
      {
        path: ':id',
        outlet: 'edit',
        component: EditPage
      },
	  {
        path: 'adminhome',
        outlet: 'adminhome',
        component: AdminHomePage
      },
	  
      {
        path: ':id',
        outlet: 'details',
        component: DetailsPage
      }
	  ]
  },
  {
    path: '',
    redirectTo: 'adminhome',
    pathMatch: 'full'
  }
];

@NgModule({
  imports:
    [
      RouterModule.forChild(routes)
    ],
  exports:
    [
      RouterModule
    ]
})
export class AdminPageRoutingModule {}