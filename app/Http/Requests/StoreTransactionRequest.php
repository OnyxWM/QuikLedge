<?php

namespace App\Http\Requests;

use App\Models\Transaction;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreTransactionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'type' => ['required', 'string', Rule::in(['revenue', 'expense'])],
            'description' => ['required', 'string', 'max:255'],
            'amount' => ['required', 'numeric', 'min:0.01'],
            'date' => ['required', 'date'],
            'linked_expense_id' => [
                'nullable',
                'integer',
                'exists:transactions,id',
                function (string $attribute, mixed $value, \Closure $fail) {
                    if ($value && $this->input('type') === 'revenue') {
                        $linkedTransaction = Transaction::find($value);
                        if ($linkedTransaction && $linkedTransaction->type !== 'expense') {
                            $fail('The linked transaction must be an expense.');
                        }
                    }
                },
            ],
        ];
    }
}
