import { Component } from '@angular/core';
import {Toolbar} from 'primeng/toolbar';
import {StyleClass} from 'primeng/styleclass';
import {Button} from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { RouterLink } from '@angular/router';
import {NgOptimizedImage} from '@angular/common';


@Component({
  selector: 'app-navbar',
  imports: [
    Toolbar,
    StyleClass,
    Button,
    NgOptimizedImage,
    RouterLink,
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {}
