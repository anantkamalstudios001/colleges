import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isSmallScreen = false;
  menuOpen = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.updateScreenSize();
    this.setupMenuToggle();
    this.setupSubMenus();
  }

  @HostListener('window:resize')
  onResize() {
    this.updateScreenSize();
    this.adjustMenuForScreenSize();
  }

  updateScreenSize() {
    this.isSmallScreen = window.innerWidth <= 992;
  }

private setupMenuToggle(): void {
  const button = this.el.nativeElement.querySelector('.button');
  const mainMenu = this.el.nativeElement.querySelector('#cssmenu > ul');

  if (button && mainMenu) {
    this.renderer.listen(button, 'click', () => {
      this.menuOpen = !this.menuOpen;

      // Corrected toggle logic
      if (this.menuOpen) {
        this.renderer.addClass(button, 'menu-opened');
        this.renderer.addClass(mainMenu, 'open');
        this.renderer.setStyle(mainMenu, 'display', 'block');
      } else {
        this.renderer.removeClass(button, 'menu-opened');
        this.renderer.removeClass(mainMenu, 'open');
        this.renderer.setStyle(mainMenu, 'display', 'none');
      }
    });
  }
}


  private setupSubMenus(): void {
    const hasSubs = this.el.nativeElement.querySelectorAll('#cssmenu li ul');

    hasSubs.forEach((submenu: HTMLElement) => {
      const parentLi = submenu.parentElement;
      if (parentLi && !parentLi.classList.contains('has-sub')) {
        this.renderer.addClass(parentLi, 'has-sub');

        const submenuButton = this.renderer.createElement('span');
        this.renderer.addClass(submenuButton, 'submenu-button');

        this.renderer.listen(submenuButton, 'click', () => {
          const isOpen = submenu.classList.contains('open');
          this.renderer[isOpen ? 'removeClass' : 'addClass'](submenu, 'open');
          this.renderer.setStyle(submenu, 'display', isOpen ? 'none' : 'block');
          this.renderer[isOpen ? 'removeClass' : 'addClass'](submenuButton, 'submenu-opened');
        });

        this.renderer.insertBefore(parentLi, submenuButton, submenu);
      }
    });
  }

  private adjustMenuForScreenSize(): void {
    const allMenus = this.el.nativeElement.querySelectorAll('#cssmenu ul');

    allMenus.forEach((menu: HTMLElement) => {
      if (window.innerWidth > 992) {
        this.renderer.setStyle(menu, 'display', 'block');
      } else {
        this.renderer.setStyle(menu, 'display', 'none');
        this.renderer.removeClass(menu, 'open');
      }
    });
  }
}
