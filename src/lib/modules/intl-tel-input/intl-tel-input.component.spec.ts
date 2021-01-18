import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { IntlTelInputComponent } from './intl-tel-input.component';

describe('IntlTelInputComponent', () => {
	let component: IntlTelInputComponent;
	let fixture: ComponentFixture<IntlTelInputComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [ IntlTelInputComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(IntlTelInputComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
