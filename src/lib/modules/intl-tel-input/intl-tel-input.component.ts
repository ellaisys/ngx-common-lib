import * as lpn from 'google-libphonenumber';

import {
	Component,
	ElementRef,
	EventEmitter,
	forwardRef,
	Input,
	OnChanges,
	OnInit,
	Output,
	SimpleChanges,
	ViewChild,
} from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';

import { CountryCode } from './data/country-code';
import { CountryISO } from './enums/country-iso.enum';
import { SearchCountryField } from './enums/search-country-field.enum';
import { TooltipLabel } from './enums/tooltip-label.enum';
import type { ChangeData } from './interfaces/change-data';
import type { Country } from './model/country.model';
import { phoneNumberValidator } from './intl-tel-input.validator';
import { empty } from 'rxjs';

@Component({
	// tslint:disable-next-line: component-selector
	selector: 'intl-tel-input',
	templateUrl: './intl-tel-input.component.html',
	styleUrls: ['./intl-tel-input.component.css'],
	providers: [
		CountryCode,
		{
			provide: NG_VALUE_ACCESSOR,
			// tslint:disable-next-line:no-forward-ref
			useExisting: forwardRef(() => IntlTelInputComponent),
			multi: true,
		},
		{
			provide: NG_VALIDATORS,
			useValue: phoneNumberValidator,
			multi: true,
		},
	],
})
export class IntlTelInputComponent implements OnInit, OnChanges {
	@Input() value = '';
	@Input() preferredCountries: Array<string> = [];
	@Input() enablePlaceholder = true;
	@Input('customPlaceholderText') customPlaceholderText: string | null = null;
	@Input() cssClass = 'form-control';
	@Input() onlyCountries: Array<string> = [];
	@Input() enableAutoCountrySelect = true;
	@Input('searchCountryFlag') boolSearchCountryFlag: boolean = false;
	@Input() searchCountryField: SearchCountryField[] = [SearchCountryField.All];
	@Input() searchCountryPlaceholder = 'Search Country';
	@Input() maxLength = '';
	@Input() tooltipField: TooltipLabel = TooltipLabel.Name;
	@Input() selectFirstCountry = true;
	@Input() selectedCountryISO: CountryISO | string | undefined;
	@Input() phoneValidation = true;
	@Input() inputId = 'phone';
	@Input() separateDialCode = true;
	@Input() tabIndex: number = 1;
	@Input() enableAutoComplete: boolean = false;
	separateDialCodeClass: string = '';

	@Output() readonly countryChange = new EventEmitter<Country>();

	selectedCountry: Country | any = {
		areaCodes: undefined,
		dialCode: '',
		htmlId: '',
		flagClass: '',
		iso2: '',
		name: '',
		placeHolder: '',
		priority: 0,
	};

	phoneNumber = '';
	allCountries: Array<Country> = [];
	preferredCountriesInDropDown: Array<Country> = [];
	// Has to be 'any' to prevent a need to install @types/google-libphonenumber by the package user...
	phoneUtil: any = lpn.PhoneNumberUtil.getInstance();
	disabled = false;
	errors: Array<any> = ['Phone number is required.'];
	countrySearchText = '';

	@ViewChild('countryList') countryList: ElementRef | undefined;

	onTouched = () => {};
	propagateChange = (_: ChangeData | null) => {};

	constructor(private countryCodeData: CountryCode) {}

	ngOnInit() {
		this.init();
	}

	ngOnChanges(changes: SimpleChanges) {
		const selectedISO = changes['selectedCountryISO'];
		if (
			this.allCountries &&
			selectedISO &&
			selectedISO.currentValue !== selectedISO.previousValue
		) {
			this.getSelectedCountry();
		}
		if (changes['preferredCountries']) {
			this.getPreferredCountries();
		}
		this.checkSeparateDialCodeStyle();
	}

	/*
		This is a wrapper method to avoid calling this.ngOnInit() in writeValue().
		Ref: http://codelyzer.com/rules/no-life-cycle-call/
	*/
	init() {
		this.fetchCountryData();
		if (this.preferredCountries.length) {
			this.getPreferredCountries();
		}
		if (this.onlyCountries.length) {
			this.allCountries = this.allCountries.filter((c) =>
				this.onlyCountries.includes(c.iso2)
			);
		}
		if (this.selectFirstCountry) {
			if (this.preferredCountriesInDropDown.length) {
				this.setSelectedCountry(this.preferredCountriesInDropDown[0]);
			} else {
				this.setSelectedCountry(this.allCountries[0]);
			}
		}
		this.getSelectedCountry();
		this.checkSeparateDialCodeStyle();
	}

	getPreferredCountries() {
		if (this.preferredCountries.length) {
			this.preferredCountriesInDropDown = [];
			this.preferredCountries.forEach((iso2) => {
				const preferredCountry = this.allCountries.filter((c) => {
					return c.iso2 === iso2;
				});

				this.preferredCountriesInDropDown.push(preferredCountry[0]);
			});
		}
	}

	getSelectedCountry() {
		if (this.selectedCountryISO) {
			this.selectedCountry = this.allCountries.find((c: Country) => {
				return c.iso2.toLowerCase() === (this.selectedCountryISO as string).toLowerCase();
			});
			if (this.selectedCountry) {
				if (this.phoneNumber) {
					this.onPhoneNumberChange();
				} else {
					// Reason: avoid https://stackoverflow.com/a/54358133/1617590
					// tslint:disable-next-line: no-null-keyword
					this.propagateChange(null);
				}
			}
		}
	}

	setSelectedCountry(country: Country) {
		this.selectedCountry = country;
		this.countryChange.emit(country);
	}

	/**
	 * Search country based on country name, iso2, dialCode or all of them.
	 */
	fnSearchCountry() {
		if (!this.countrySearchText) {
			(this.countryList as ElementRef).nativeElement
				.querySelector('.iti__country-list li')
				.scrollIntoView({
					behavior: 'smooth',
					block: 'nearest',
					inline: 'nearest',
				});
			return;
		}
		const countrySearchTextLower = this.countrySearchText.toLowerCase();
		const country = this.allCountries.filter((c: any) => {
			if (this.searchCountryField.indexOf(SearchCountryField.All) > -1) {
				// Search in all fields
				if (c.iso2.toLowerCase().startsWith(countrySearchTextLower)) {
					return c;
				}
				if (c.name.toLowerCase().startsWith(countrySearchTextLower)) {
					return c;
				}
				if (c.dialCode.startsWith(this.countrySearchText)) {
					return c;
				}
			} else {
				// Or search by specific SearchCountryField(s)
				if (this.searchCountryField.indexOf(SearchCountryField.Iso2) > -1) {
					if (c.iso2.toLowerCase().startsWith(countrySearchTextLower)) {
						return c;
					}
				}
				if (this.searchCountryField.indexOf(SearchCountryField.Name) > -1) {
					if (c.name.toLowerCase().startsWith(countrySearchTextLower)) {
						return c;
					}
				}
				if (this.searchCountryField.indexOf(SearchCountryField.DialCode) > -1) {
					if (c.dialCode.startsWith(this.countrySearchText)) {
						return c;
					}
				}
			}
		});

		if (country.length > 0) {
			const el = (this.countryList as ElementRef).nativeElement.querySelector(
				'#' + country[0].htmlId
			);
			if (el) {
				el.scrollIntoView({
					behavior: 'smooth',
					block: 'nearest',
					inline: 'nearest',
				});
			}
		}

		this.checkSeparateDialCodeStyle();
	} //Function ends

	public onPhoneNumberChange(): void {
		let countryCode: string;
		// Handle the case where the user sets the value programatically based on a persisted ChangeData obj.
		if (this.phoneNumber && typeof this.phoneNumber === 'object') {
			const numberObj: ChangeData = this.phoneNumber;
			this.phoneNumber = (numberObj.number as string);
			countryCode = (numberObj.countryCode as string);
		} else {
			countryCode = (this.selectedCountry?.iso2.toUpperCase() as string);
		}

		this.value = this.phoneNumber;
		let number: lpn.PhoneNumber | null;
		try {
			number = this.phoneUtil.parse(this.phoneNumber, countryCode);
		} catch (e) {
			number = null;
		}

		// auto select country based on the extension (and areaCode if needed) (e.g select Canada if number starts with +1 416)
		if (this.enableAutoCountrySelect) {
			countryCode =
				number && number.getCountryCode()
					? (this.getCountryIsoCode((number.getCountryCode() as number), number) as string)
					: (this.selectedCountry?.iso2 as string);
			if (countryCode && countryCode !== this.selectedCountry?.iso2) {
				const newCountry = this.allCountries.sort((a, b) => {
					return a.priority - b.priority;
				}).find(
					(c) => c.iso2 === countryCode
				);
				if (newCountry) {
					this.selectedCountry = newCountry;
				}
			}
		}
		countryCode = countryCode ? countryCode : (this.selectedCountry?.iso2 as string);

		this.checkSeparateDialCodeStyle();

		if (!this.value) {
			// Reason: avoid https://stackoverflow.com/a/54358133/1617590
			// tslint:disable-next-line: no-null-keyword
			this.propagateChange(null);
		} else {
			const intlNo = number
				? this.phoneUtil.format(number, lpn.PhoneNumberFormat.INTERNATIONAL)
				: '';

			// parse phoneNumber if separate dial code is needed
			if (this.separateDialCode && intlNo) {
				this.value = this.removeDialCode(intlNo);
			}

			this.propagateChange({
				number: this.value,
				internationalNumber: intlNo,
				nationalNumber: number
					? this.phoneUtil.format(number, lpn.PhoneNumberFormat.NATIONAL)
					: '',
				e164Number: number
					? this.phoneUtil.format(number, lpn.PhoneNumberFormat.E164)
					: '',
				countryCode: countryCode?.toUpperCase(),
				dialCode: '+' + this.selectedCountry?.dialCode,
				iddCode: this.selectedCountry?.dialCode,
			});
		}
	}

	public onCountrySelect(country: Country, el: any): void {
		this.setSelectedCountry(country);

		this.checkSeparateDialCodeStyle();

		if (this.phoneNumber && this.phoneNumber.length > 0) {
			this.value = this.phoneNumber;

			let number: lpn.PhoneNumber;
			let intlNo : any = 0;
			try {
				number = this.phoneUtil.parse(
					this.phoneNumber,
					this.selectedCountry?.iso2.toUpperCase()
				);

				const intlNo = number
					? this.phoneUtil.format(number, lpn.PhoneNumberFormat.INTERNATIONAL)
					: '';				
			} catch (e) {
				number = this.phoneUtil();
			}

			// parse phoneNumber if separate dial code is needed
			if (this.separateDialCode && intlNo) {
				this.value = this.removeDialCode(intlNo);
			}

			this.propagateChange({
				number: this.value,
				internationalNumber: intlNo,
				nationalNumber: number
					? this.phoneUtil.format(number, lpn.PhoneNumberFormat.NATIONAL)
					: '',
				e164Number: number
					? this.phoneUtil.format(number, lpn.PhoneNumberFormat.E164)
					: '',
				countryCode: this.selectedCountry?.iso2.toUpperCase(),
				dialCode: '+' + this.selectedCountry?.dialCode,
				iddCode: this.selectedCountry?.dialCode,
			});
		} else {
			// Reason: avoid https://stackoverflow.com/a/54358133/1617590
			// tslint:disable-next-line: no-null-keyword
			this.propagateChange(null);
		}

		el.focus();
	}

	public onInputKeyPress(event: KeyboardEvent): void {
		const allowedChars = /[0-9\+\-\ ]/;
		const allowedCtrlChars = /[axcv]/; // Allows copy-pasting
		const allowedOtherKeys = [
			'ArrowLeft',
			'ArrowUp',
			'ArrowRight',
			'ArrowDown',
			'Home',
			'End',
			'Insert',
			'Delete',
			'Backspace',
		];

		if (
			!allowedChars.test(event.key) &&
			!(event.ctrlKey && allowedCtrlChars.test(event.key)) &&
			!allowedOtherKeys.includes(event.key)
		) {
			event.preventDefault();
		}
	}

	protected fetchCountryData(): void {
		/* Clearing the list to avoid duplicates (https://github.com/webcat12345/ngx-intl-tel-input/issues/248) */
		this.allCountries = [];

		this.countryCodeData.allCountries.forEach((c) => {
			const country: Country = {
				name: c[0].toString(),
				iso2: c[1].toString(),
				dialCode: c[2].toString(),
				priority: +c[3] || 0,
				areaCodes: (c[4] as string[]) || undefined,
				htmlId: `iti-0__item-${c[1].toString()}`,
				flagClass: `iti__${c[1].toString().toLocaleLowerCase()}`,
				placeHolder: '',
			};

			if (this.enablePlaceholder) {
				country.placeHolder = this.getPhoneNumberPlaceHolder(
					country.iso2.toUpperCase()
				);
			}

			this.allCountries.push(country);
		});
	}

	protected getPhoneNumberPlaceHolder(countryCode: string): string | any {
		try {
			return this.phoneUtil.format(
				this.phoneUtil.getExampleNumber(countryCode),
				lpn.PhoneNumberFormat.INTERNATIONAL
			);
		} catch (e: any) {
			return e;
		}
	}

	registerOnChange(fn: any): void {
		this.propagateChange = fn;
	}

	registerOnTouched(fn: any) {
		this.onTouched = fn;
	}

	setDisabledState(isDisabled: boolean): void {
		this.disabled = isDisabled;
	}

	writeValue(obj: any): void {
		if (obj === undefined) {
			this.init();
		}
		this.phoneNumber = obj;
		setTimeout(() => {
			this.onPhoneNumberChange();
		}, 1);
	}

	private getCountryIsoCode(
		countryCode: number,
		number: lpn.PhoneNumber
	): string | undefined {
		// Will use this to match area code from the first numbers
		const rawNumber = ''; //number['values_']['2'].toString();
		// List of all countries with countryCode (can be more than one. e.x. US, CA, DO, PR all have +1 countryCode)
		const countries = this.allCountries.filter(
			(c) => c.dialCode === countryCode.toString()
		);
		// Main country is the country, which has no areaCodes specified in country-code.ts file.
		const mainCountry = countries.find((c) => c.areaCodes === undefined);
		// Secondary countries are all countries, which have areaCodes specified in country-code.ts file.
		const secondaryCountries = countries.filter(
			(c) => c.areaCodes !== undefined
		);
		let matchedCountry = mainCountry ? mainCountry.iso2 : undefined;

		/*
			Iterate over each secondary country and check if nationalNumber starts with any of areaCodes available.
			If no matches found, fallback to the main country.
		*/
		secondaryCountries.forEach((country) => {
			country.areaCodes?.forEach((areaCode) => {
				if (rawNumber.startsWith(areaCode)) {
					matchedCountry = country.iso2;
				}
			});
		});

		return matchedCountry;
	}


	/**
	 * Get Placeholder Text Data
	 * 
	 * @param placeholder 
	 */
	public fnGetPlaceHolderData(placeholder: string): string {
		if (!this.enablePlaceholder) {
			return '';
		} //End if

		if (this.customPlaceholderText!=null) {
			return this.customPlaceholderText;
		} else {
			let strPlaceholder: string = this.removeDialCode(placeholder);
			return (strPlaceholder!=null)?strPlaceholder:'';
		} //End if
	} //Function ends


	private removeDialCode(phoneNumber: string): string {
		if (this.separateDialCode && phoneNumber) {
			phoneNumber = phoneNumber.substr(phoneNumber.indexOf(' ') + 1);
		}
		return phoneNumber;
	} //Function ends


	/**
	 * Adjust input alignment
	 */
	private checkSeparateDialCodeStyle() {
		if (this.separateDialCode && this.selectedCountry) {
			const cntryCd = this.selectedCountry.dialCode;
			this.separateDialCodeClass =
				'separate-dial-code iti-sdc-' + (cntryCd.length + 1);
		} else {
			this.separateDialCodeClass = '';
		}
	} //Function ends

} //Class ends
