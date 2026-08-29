import { Component, input } from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals';
import { ContactDetails } from '../../data/models/contactDetails.interface';

@Component({
  selector: 'app-contact-form',
  imports: [FormField],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.scss',
})
export class ContactForm {
  contactForm = input.required<FieldTree<ContactDetails>>();
}
