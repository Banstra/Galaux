import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbuttons',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbuttons.html',
  styleUrl: './navbuttons.css',
})
export class Navbuttons {}
