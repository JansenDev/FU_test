import { Component, OnInit } from '@angular/core';
import { RecursoService } from '../../services/recurso.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private resourceService: RecursoService) {}

  ngOnInit(): void {
    this.findResourceMap();
  }

  resourceMap_list: any = {};
  pagination: any = {
    page: 0,
    limit: 5,
    total_documents: 0,
    total_pages: 0,
  };

  findResourceMap() {
    this.resourceService.findResourceMap().subscribe((resource) => {
      console.log(resource);
      this.resourceMap_list = resource;

      this.pagination.total_documents = resource.total_documents;
      this.pagination.page = resource.page;
      this.pagination.total_pages = resource.total_pages;

    });
  }
}
