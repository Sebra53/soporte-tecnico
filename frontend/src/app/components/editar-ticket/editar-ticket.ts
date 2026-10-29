import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators }
  from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TicketsService } from '../../services/tickets';
 
@Component({
  selector: 'app-editar-ticket',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './editar-ticket.html',
  styleUrl: './editar-ticket.css'
})
export class EditarTicket implements OnInit {
  id = 0;
  cargando = true;
  guardando = false;
  encontrado = false;
  error = '';
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
    private route: ActivatedRoute,
    private router: Router,
    private servicio: TicketsService,
    private cdr: ChangeDetectorRef
  ) {}
 
  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarTicket();
  }
 
  cargarTicket(): void {
    this.error = '';
    this.encontrado = false;
    this.cargando = true;
    if (!Number.isSafeInteger(this.id) || this.id <= 0) {
      this.error = 'Identificador de ticket inválido';
      this.cargando = false;
      this.cdr.markForCheck();
      return;
    }
    this.servicio.obtenerTicket(this.id).subscribe({
      next: (ticket) => {
        this.formulario.patchValue(ticket);
        this.encontrado = true;
        this.cargando = false;
        this.cdr.markForCheck();
      },
      error: (error) => {
        this.error = error.error?.mensaje || 'No fue posible cargar el ticket';
        this.cargando = false;
        this.cdr.markForCheck();
      }
    });
  }
 
  guardar(): void {
    if (this.guardando || !this.encontrado) return;
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
    this.servicio.actualizarTicket(this.id,
      this.formulario.getRawValue()).subscribe({
      next: () => {
        this.guardando = false;
        this.router.navigate(['/tickets']);
      },
      error: (error) => {
        this.error = error.error?.mensaje || 'No fue posible actualizar el ticket';
        this.guardando = false;
        this.cdr.markForCheck();
      }
    });
  }
}
