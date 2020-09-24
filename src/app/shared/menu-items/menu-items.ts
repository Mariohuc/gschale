import { Injectable } from '@angular/core';
import { Roles } from "../models/user";

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  belongTo?: string,
  isForAny?: boolean
}
// ---> "state" is the route, "name" is like a label
const MENUITEMS = [
  { state: 'dashboard', name: 'Dashboard', type: 'link', icon: 'av_timer', isForAny: true },
  { state: 'lists', type: 'link', name: 'Lists', icon: 'view_list', belongTo: Roles.ADMIN },
];

/**
 * Ejemplos de MENUITEMS:
 * { state: 'button', type: 'link', name: 'Buttons', icon: '3d_rotation', belongTo: Roles.VOLUNTARIO },
  { state: 'grid', type: 'link', name: 'Grid List', icon: 'view_comfy', belongTo: Roles.VOLUNTARIO },
  { state: 'lists', type: 'link', name: 'Lists', icon: 'view_list', belongTo: Roles.ADMIN },
  { state: 'menu', type: 'link', name: 'Menu', icon: 'view_headline', belongTo: Roles.ADMIN },
  { state: 'tabs', type: 'link', name: 'Tabs', icon: 'tab', belongTo: Roles.ADMIN },
  { state: 'stepper', type: 'link', name: 'Stepper', icon: 'web', belongTo: Roles.ALUMNO },
  {
    state: 'expansion',
    type: 'link',
    name: 'Expansion Panel',
    icon: 'vertical_align_center',
    belongTo: Roles.ALUMNO
  },
  { state: 'chips', type: 'link', name: 'Chips', icon: 'vignette', belongTo: Roles.VOLUNTARIO },
  { state: 'toolbar', type: 'link', name: 'Toolbar', icon: 'voicemail', belongTo: Roles.VOLUNTARIO },
 */

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
