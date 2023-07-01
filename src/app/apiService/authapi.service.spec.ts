import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AuthapiService } from './authapi.service';

fdescribe('AuthapiService', () => {
  let service: AuthapiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthapiService]
    });
    service = TestBed.inject(AuthapiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request to login user', () => {
    const loginData = { username: 'testuser', password: 'testpassword' };
    const mockResponse={token:"test-token"}
    service.loginUser(loginData).subscribe((response)=>{
      expect(response).toEqual(mockResponse)
    });

    const req = httpMock.expectOne(`${service.authserviceUrl}/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(loginData);

    req.flush(mockResponse);
  });

  it('should send a POST request to register user', () => {
    const signupData = { username: 'testuser', password: 'testpassword',email:'test@gmail.com',securityQuestion:'pet',securityAnswer:'cat' };
    const mockResponse={message:"User registered successfully"}
    service.registerUser(signupData).subscribe((response)=>{
      expect(response).toEqual(mockResponse)
    });

    const req = httpMock.expectOne(`${service.authserviceUrl}/signup`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(signupData);

    req.flush(mockResponse);
  });

  // it('should send a PATCH request to reset password', () => {
  //   const resetData = {username:'testuser', email: 'testuser@gmail.com', newPassword: 'newpassword',secQuestion:'pet',secAnswer:'cat' };
  //   const mockResponse={message:"password reset successful"};
  //   let response : any;
  //   service.resetPasswordUser(resetData).subscribe((res)=>{
  //     response=res;
  //   });

  //   const req = httpMock.expectOne(`${service.authserviceUrl}/forgot/${resetData.username}/updatepassword`);
  //   expect(req.request.method).toBe('PATCH');
  //   //expect(req.request.body).toEqual(resetData);

  //   req.flush(mockResponse);
    
  // });
});
