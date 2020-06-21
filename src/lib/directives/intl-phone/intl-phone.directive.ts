import { Directive, Input, Output, EventEmitter, ElementRef, HostListener, OnInit } from '@angular/core';
declare var $: any;

@Directive({
  selector: '[intl-phone]'
})
export class IntlPhoneDirective implements OnInit {
  @Input() options: any = {};
  @Input('number') numberInput: string | null;
  @Output('number') numberOutput: EventEmitter<string> = new EventEmitter();
  @Output() country: any  = new EventEmitter();
  @Output() valid: EventEmitter<boolean> = new EventEmitter();

  elemTel: any = null;

  /**
   * Default Constructor
   * @param _elementRef 
   */
  constructor(
      private _elementRef: ElementRef
  ) {}


  ngOnInit() {
    this.elemTel = $(this._elementRef.nativeElement);

    //Initialize component
    this.elemTel.intlTelInput(
      this.options
    );

    //Set number into diplay
    if (this.elemTel && this.numberInput) {
      this.setNumber(this.numberInput);
      let countryData = this.elemTel.intlTelInput("getSelectedCountryData");
      this.country.emit(countryData);

      //Check and email validation
      this.valid.emit(this.isInputValid());
    } //End if

    //Event: Country Change 
    this.elemTel.on("countrychange", (e: any, countryData: any) => {
      this.country.emit(countryData);
      this.fnProcessData();
    });
  } //Function ends


  //Raise Blur event
  @HostListener('blur', ['$event']) onBlur($event) {
    this.fnProcessData();
  } //Function ends
  @HostListener('focusout', ['$event.target']) onFocusout(target: any) {
    this.fnProcessData();
  } //Function ends
  @HostListener('document:keyup', ['$event']) onKeyupHandler(event: KeyboardEvent) {
    this.fnProcessData();
  }


  /**
   * Process the data and validation
   */
  private fnProcessData() {
    let isInputValid = this.isInputValid();
    if (isInputValid) {
      let telOutput = this.elemTel.intlTelInput("getNumber");
      this.numberOutput.emit(telOutput);
    } //End if

    this.valid.emit(isInputValid);        
  } //Function ends


  private setCountry(country: any) {
    this.elemTel.intlTelInput('setCountry', country);
  } //Function ends


  private setNumber(number: any) {
    this.elemTel.intlTelInput('setNumber', number);
  } //Function ends


  private isInputValid(): boolean {
    return this.elemTel.intlTelInput('isValidNumber') ? true : false;
  } //Function ends

} //Class ends