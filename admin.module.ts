import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import {AdminPageRoutingModule } from './admin-routing.module';

import { AdminPage } from './admin.page';

import { AddPageModule } from '../admin/add/add.module';
import { EditPageModule } from '../admin/edit/edit.module';
import { AdminHomePageModule } from '../admin/adminhome/adminhome.module';
import { DetailsPageModule } from '../details/details.module';
const routes: Routes = [
  {
    path: '',
    component: AdminPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
	AdminPageRoutingModule,
	AdminHomePageModule,
    AddPageModule,
    EditPageModule,
    DetailsPageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AdminPage]
})
export class AdminPageModule {}
