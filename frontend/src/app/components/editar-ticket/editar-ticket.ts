import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators }
  from '@angular/forms';
 
@Component({
  selector: 'app-editar-ticket',
  imports: [ReactiveFormsModule],
  templateUrl: './editar-ticket.html',
  styleUrl: './editar-ticket.css'
})
export class EditarTicket {
  mensaje = '';
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
 
  guardar(): void {
    this.mensaje = '';
    const c = this.formulario.controls;
    c.asunto.setValue(c.asunto.value.trim());
    c.solicitante.setValue(c.solicitante.value.trim());
    c.descripcion.setValue(c.descripcion.value.trim());
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    this.mensaje = 'Datos válidos. La conexión HTTP se agrega en la etapa 4.';
  }
}
