import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
 import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
 
})
export class AvailablePlacesComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  places = signal<Place[] | undefined>(undefined);
  private httpClient = inject(HttpClient);
  ngOnInit() {
  const subscription = this.httpClient.get('https://jsonplaceholder.typicode.com/todos/1',{
    observe : 'response'
  })
  .subscribe({
    next : (response) => {
      console.log(response.body);
      
    }
  });
  this.destroyRef.onDestroy(() =>{
      subscription.unsubscribe();
  })
  }


}
