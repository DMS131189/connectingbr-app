import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, NgZone, AfterViewInit, OnDestroy } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map-selector',
  standalone: true,
  imports: [CommonModule],
  template: '<div id="map" style="height: 400px; width: 100%;"></div>',
  styles: [`
    #map {
      height: 400px;
      width: 100%;
      border-radius: 8px;
      border: 1px solid #e0e0e0;
      position: relative;
      z-index: 1;
    }
    
    /* Leaflet CSS fixes */
    :host ::ng-deep .leaflet-container {
      position: relative !important;
      z-index: 1 !important;
    }
    
    :host ::ng-deep .leaflet-control-container {
      z-index: 2 !important;
    }
    
    :host ::ng-deep .leaflet-popup {
      z-index: 3 !important;
    }
  `]
})
export class MapSelectorComponent implements AfterViewInit, OnDestroy {
  @Output() selectedLocation = new EventEmitter<{ lat: number; lng: number }>();

  private map!: L.Map;
  private marker!: L.Marker;

  constructor(private zone: NgZone) {}

  ngAfterViewInit(): void {
    // Aguarda um tick para garantir que o DOM está pronto
    setTimeout(() => {
      this.initializeMap();
    }, 100);
  }

  private initializeMap(): void {
    try {
      // Inicializa o mapa centralizado em Dublin, Irlanda
      this.map = L.map('map', {
        zoomControl: true,
        scrollWheelZoom: true,
        doubleClickZoom: true,
        boxZoom: true,
        keyboard: true,
        dragging: true,
        touchZoom: true
      }).setView([53.3498, -6.2603], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18
      }).addTo(this.map);

      // Adiciona listener de clique
      this.map.on('click', this.onMapClick.bind(this));
      
      // Força o redimensionamento do mapa
      setTimeout(() => {
        this.map.invalidateSize();
      }, 200);
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  }

  private onMapClick(event: L.LeafletMouseEvent): void {
    const { lat, lng } = event.latlng;

    // Remove marcador anterior, se houver
    if (this.marker) {
      this.map.removeLayer(this.marker);
    }

    // Cria novo marcador
    this.marker = L.marker([lat, lng]).addTo(this.map);

    // Emite evento de seleção dentro do Angular zone para atualizar UI
    this.zone.run(() => {
      this.selectedLocation.emit({ lat, lng });
    });
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.off();
      this.map.remove();
    }
  }
}