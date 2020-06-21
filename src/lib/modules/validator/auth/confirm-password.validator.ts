import { FormControl } from '@angular/forms'

export function ConfirmPasswordValidator(fieldName: string) {
    let fcfirst: FormControl;
    let fcSecond: FormControl;

    return function ConfirmPasswordValidator(control: FormControl) {
                if (!control.parent) { return null; }

        // Initilizing validator
        if (!fcfirst) {
            fcfirst = control;
            fcSecond = control.parent.get(fieldName) as FormControl;

            //FormControl Second
            if (!fcSecond) {
                throw new Error('ConfirmPasswordValidator(): Second control is not found!');
            } //End if

            fcSecond.valueChanges.subscribe(() => {
                fcfirst.updateValueAndValidity();
            });
        } //End if

        if (!fcSecond) { return null; }

        if (fcSecond.value !== fcfirst.value) {
            return {
                matchOther: true
            };
        } //End if

        return null;
    }
} //Function ends
