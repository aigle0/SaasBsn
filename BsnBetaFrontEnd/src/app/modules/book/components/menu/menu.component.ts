/*
import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [
        RouterLink
    ],
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {

    ngOnInit(): void {
        const linkColor = document.querySelectorAll('.nav-link');
        linkColor.forEach(link => {
            if (window.location.href.endsWith(link.getAttribute('href') || '')) {
                link.classList.add('active');
            }
            link.addEventListener('click', () => {
                linkColor.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }

    logout() {

    }
}
2

import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    standalone: true,
    imports: [
        RouterLink
    ],
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {


    ngOnInit(): void {
        const linkColor = document.querySelectorAll('.nav-link');
        linkColor.forEach(link => {
            if (window.location.href.endsWith(link.getAttribute('href') || '')) {
                link.classList.add('active');
            }
            link.addEventListener('click', () => {
                linkColor.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }
    logout() {

    }
}*/
import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    standalone: true,
    styleUrls: ['./menu.component.scss'],
    imports: [
        RouterLinkActive,
        RouterLink
    ]
})
export class MenuComponent {
    logout(): void {
        // Implement your logout logic here
        console.log('Logout clicked');
    }
}
