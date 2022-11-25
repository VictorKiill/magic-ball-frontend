import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function isQuestionValidator(): ValidatorFn {

  const result = (control: AbstractControl): ValidationErrors | null => {
    const question = control.value as string;
    const isQuestion = question.endsWith('?');
    return !isQuestion ? { notQuestion: { value: control.value } } : null;
  }
  console.log(result)

  return result;
}
