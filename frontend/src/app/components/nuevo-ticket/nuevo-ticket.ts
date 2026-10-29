import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators }
  from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TicketsService } from '../../services/tickets';
 
@Component({
  selector: 'app-nuevo-ticket',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './nuevo-ticket.html',
  styleUrl: './nuevo-ticket.css'
})
export class NuevoTicket {
  error = '';
  guardando = false;
  formulario = new FormGroup({
    asunto: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3),
        Validators.maxLength(150), Validators.pattern(/\S/)]
    }),
    solicitante: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3),
        Validators.maxLength(120), Validators.pattern(/\S/)]
    }),
    descripcion: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(5),
        Validators.maxLength(2000), Validators.pattern(/\S/)]
    }),
    categoria: new FormControl('Hardware', {
      nonNullable: true,
      validators: [Validators.required,
        Validators.pattern(/^(Hardware|Software|Red)$/)]
    }),
    prioridad: new FormControl('Media', {
      nonNullable: true,
      validators: [Validators.required,
        Validators.pattern(/^(Baja|Media|Alta)$/)]
    }),
    estado: new FormControl('Abierto', {
      nonNullable: true,
      validators: [Validators.required,
        Validators.pattern(/^(Abierto|En proceso|Cerrado)$/)]
    }),
    fechaRegistro: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required,
        Validators.pattern(/^[1-9]\d{3}-\d{2}-\d{2}$/)]
    })
  });
 
  constructor(
    private servicio: TicketsService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}
 
  guardar(): void {
    if (this.guardando) return;
    this.error = '';
    const c = this.formulario.controls;
    c.asunto.setValue(c.asunto.value.trim());
    c.solicitante.setValue(c.solicitante.value.trim());
    c.descripcion.setValue(c.descripcion.value.trim());
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    this.guardando = true;
    this.servicio.crearTicket(this.formulario.getRawValue()).subscribe({
      next: () => {
        this.guardando = false;
        this.router.navigate(['/tickets']);
      },
      error: (error) => {
        this.error = error.error?.mensaje || 'No fue posible registrar el ticket';
        this.guardando = false;
        this.cdr.markForCheck();
      }
    });
  }
}
