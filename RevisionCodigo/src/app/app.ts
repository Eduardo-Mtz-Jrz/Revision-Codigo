import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para usar *ngIf
import { FormsModule } from '@angular/forms'; // ¡ESTE ES EL QUE NECESITAS!

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule], // Agregamos ambos aquí
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  username: string = 'stolinski';
  nameText: string = '';
  blogText: string = '';
  locationText: string = '';

  private usersEndpoint = 'https://api.github.com/users';

  ngOnInit() {
    this.displayUser(this.username);
  }

  searchUser() {
    if (this.username) {
      this.displayUser(this.username);
    } else {
      alert('Ingresa un nombre de usuario');
    }
  }

  async displayUser(user: string) {
    this.nameText = 'cargando...';
    this.blogText = 'cargando...';
    this.locationText = 'cargando...';

    try {
      const response = await fetch(`${this.usersEndpoint}/${user}`);
      if (!response.ok) throw new Error('Usuario no encontrado');

      const data = await response.json();

      this.nameText = `Nombre: ${data.name || 'N/A'}`;
      this.blogText = `Blog: ${data.blog || 'N/A'}`;
      this.locationText = `Dirección: ${data.location || 'N/A'}`;
    } catch (err) {
      this.nameText = `Algo salió mal: ${err}`;
      this.blogText = '';
      this.locationText = '';
    }
  }
}
