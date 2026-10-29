import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Ticket } from '../../models/ticket';
import { TicketsService } from '../../services/tickets';
 
@Component({
  selector: 'app-tickets',
  imports: [RouterLink],
  templateUrl: './tickets.html',
  styleUrl: './tickets.css'
})
export class Tickets implements OnInit {
  tickets: Ticket[] = [];
  cargando = true;
  borrando: number | null = null;
  error = '';
  mensaje = '';
 
  constructor(
    private servicio: TicketsService,
    private cdr: ChangeDetectorRef
  ) {}
 
  ngOnInit(): void { this.cargarTickets(); }
 
  cargarTickets(): void {
    this.cargando = true;
    this.error = '';
    this.cdr.markForCheck();
    this.servicio.obtenerTickets().subscribe({
      next: (datos) => {
        this.tickets = datos;
        this.cargando = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.error = 'No fue posible cargar los tickets. Revisa la API.';
        this.cargando = false;
        this.cdr.markForCheck();
      }
    });
  }
 
  eliminar(ticket: Ticket): void {
    if (this.borrando !== null) return;
    if (!confirm(`¿Eliminar el ticket ${ticket.id}: ${ticket.asunto}?`)) return;
    this.borrando = ticket.id;
    this.error = '';
    this.mensaje = '';
    this.servicio.eliminarTicket(ticket.id).subscribe({
      next: (respuesta) => {
        this.mensaje = respuesta.mensaje;
        this.borrando = null;
        this.cargarTickets();
      },
      error: () => {
        this.error = 'No fue posible eliminar el ticket. Puedes reintentar.';
        this.borrando = null;
        this.cdr.markForCheck();
      }
    });
  }
}
