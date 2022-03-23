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
    this.findResourceMap(0);
    this.getAllPeriods();
    this.getColaborators();
    this.getClients()
  }

  resourceMap_list: any = {};
  pagination: any = {
    page: 0,
    limit: 5,
    total_documents: 0,
    total_pages: 0,
  };
  periods_list: any = [];
  collaborators_list: any = [];
 client_list: any = [];

  getAllPeriods() {
    return this.resourceService.getAllPeriods().subscribe((periods: []) => {
      let periods_list = periods.map((x) => x['ln']);
      this.periods_list = periods_list;
    });
  }

  getColaborators() {
    return this.resourceService.getAllPeriods().subscribe((periods: []) => {
      let periods_list = periods.map((x) => x['perfil']);

      this.collaborators_list = periods_list;
    });
  }

  getClients() {
    return this.resourceService.getAllPeriods().subscribe((periods: []) => {
      let periods_list = periods.map((x) => x['client']);

      this.client_list = periods_list;
    });
  }

  findResourceMap(page = 0, limit = 5) {
    let options = [page];

    if (limit != 5) options.push(limit);

    this.resourceService.findResourceMap(...options).subscribe((resource) => {
      this.resourceMap_list = resource;
console.log(resource);

      this.pagination.total_documents = resource.total_documents;
      this.pagination.page = resource.page;
      this.pagination.total_pages = resource.total_pages;
    });
  }

  nextPage(currentPage = 0) {
    this.findResourceMap(currentPage);
  }

  getFirstDigit(n: number) {
    let firstDigit = n.toString()[0];
    return parseInt(firstDigit);
  }
}
