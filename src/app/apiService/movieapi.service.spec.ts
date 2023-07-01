import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MovieapiService } from './movieapi.service';
import { TicketData } from '../model/ticket-data';
import { AddmovieData } from '../model/addmovie-data';
import { MovieData } from '../model/movie-data';

describe('MovieapiService', () => {
  let service: MovieapiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieapiService]
    });
    service = TestBed.inject(MovieapiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a GET request to retrieve all movies', () => {
    const token = 'token';
    const testMovieData = [{ movieName: 'endgame', theaterName: 'pvr', totalTickets: 2, ticketStatus: 'book now', tickets: [] }];

    service.getAllMovies(token).subscribe((movies) => {
      expect(movies).toEqual(movies);
    });

    const req = httpMock.expectOne(service.movieServiceUrl + '/getAllMovies');
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe(token);
    req.flush(testMovieData);
  });

  it('should send a GET request to retrieve a movie by ID', () => {
    const token = 'token';
    const movieId = '123';
    const mockMovie = { movieId: '123', movieName: 'endgame', theaterName: 'pvr', totalTickets: 2, ticketStatus: 'book now', bookedSeats: ['a1', 'a2'], tickets: [] };

    service.getMovieById(token, movieId).subscribe((movie) => {
      expect(movie).toEqual(mockMovie);
    });

    const req = httpMock.expectOne(service.movieServiceUrl + `/movies/search/${movieId}`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe(token);
    req.flush(mockMovie);
  });

  it('should book a movie', () => {
     const token = 'test-token'; 
     const movieName = 'Movie 1'; 
     const ticketData: TicketData = {transactionId:'12345',userId:'user123',  numberOfTickets:20}; 
     const mockResponse = { message: 'Booking successful' }; 
     service.bookMovie(token, movieName, ticketData).subscribe((response) => { 
       expect(response).toEqual(mockResponse); });
        const req = httpMock.expectOne(`${service.movieServiceUrl}/book/${movieName}`); 
        expect(req.request.method).toBe('POST'); 
        expect(req.request.headers.get('Authorization')).toBe(token); 
        req.flush(mockResponse);
  });
  

  it('should get user tickets', () => {
    const token = 'test-token'; 
    const userId = 'user123'; 
    const mockResponse: TicketData[] = [
      {transactionId:'12345',userId:'user123',  numberOfTickets:20},
      {transactionId:'12345',userId:'user123',  numberOfTickets:20}
    ]; 
    
    service.getUserTickets(token,userId).subscribe((response) => { 
      expect(response).toEqual(mockResponse); 
    });
       const req = httpMock.expectOne(`${service.movieServiceUrl}/getUserTickets/${userId}`); 
       expect(req.request.method).toBe('GET'); 
       expect(req.request.headers.get('Authorization')).toBe(token); 
       req.flush(mockResponse);
 });



 it('should delete a movie by its id', () => {
     const token = 'test-token';
     const movieId = '123';
     const mockResponse = { message: 'Movie deleted successfully' };
     service.deleteMovie(movieId, token).subscribe((response) => {
       expect(response).toEqual(mockResponse);
     });
 
     const req = httpMock.expectOne(`${service.movieServiceUrl}/delete/${movieId}`);
     expect(req.request.method).toBe('DELETE');
     expect(req.request.headers.get('Authorization')).toBe(token);
     req.flush(mockResponse);
 
   });
 
   it('should update the ticket count for a movie', () => {
     const token = 'test-token';
     const movieName = 'Movie 1';
     const sumTickets = 10;
    const mockResponse = { message: 'Ticket count updated successfully' };
     service.updateTicketCount(movieName, sumTickets, token).subscribe((response) => {
               expect(response).toEqual(mockResponse);
     });
     const req = httpMock.expectOne(`${service.movieServiceUrl}/update/${movieName}/${sumTickets}`); 
     expect(req.request.method).toBe('PUT');
     expect(req.request.headers.get('Authorization')).toBe(token);
     req.flush(mockResponse);
   });

 

  it('should add a movie', () => {
    const token = 'test-token';
    const movieData: AddmovieData = { movieName: 'Movie 1', theaterName: 'Inox',totalTickets:100 };
    const mockResponse: AddmovieData =  { movieName: 'Movie 1', theaterName: 'Inox',totalTickets:100};;

 

    service.addMovie(movieData, token).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

 

    const req = httpMock.expectOne(`${service.movieServiceUrl}/addmovie`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe(token);
    req.flush(mockResponse);
  });

});
