import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
menuOpen = false;
  isSmallScreen = false;

  ngOnInit() {
    this.updateScreenSize();
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.updateScreenSize();
  }

  updateScreenSize() {
    this.isSmallScreen = window.innerWidth < 1420;
    if (!this.isSmallScreen) {
      this.menuOpen = false;
    }
  }
   isMobileMenuVisible = false;

  toggleMobileMenu() {
    this.isMobileMenuVisible = !this.isMobileMenuVisible;
  }
}
