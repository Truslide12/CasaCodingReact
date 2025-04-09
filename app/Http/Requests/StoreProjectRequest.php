<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProjectRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title'         => 'required|string|max:255',
            'description'   => 'required|string|max:1000',
            'type'          => 'required|string|max:255',
            'image'         => 'nullable|image|mimes:jpg,jpeg,png,gif|max:4096',
            'tags'          => 'required|string|max:255',         
            'begin'         => 'required|date',
            'end'           => 'required|date',
            'user_id'       => 'required|integer',
        ];
    }

    public function mesages(): array {
        return [
            'title.required'    => 'The Project title is required.',
            'title.string'      => 'The Project title must be a string.',
            'title.max'    => 'The Project title may not be larger than 255 characters.',
            'description.required'    => 'The Project description is required.',
            'description.string'      => 'The Project description must be a string.',
            'description.max'    => 'The Project description may not be larger than 1000 characters.',
            'type.required'    => 'The Project type is required.',
            'type.string'      => 'The Project type must be a string.',
            'type.max'    => 'The Project type may not be larger than 255 characters.',
            'image.image'    => 'The Project image must be an image.',
            'image.mimes'      => 'The Project image must be in jpg, jpeg, png or gif format.',
            'image.max'    => 'The Project image must be less than 4G.',
            'tags.required'    => 'The Project tags is required.',
            'tags.string'      => 'The Project tags must be a string.',
            'tags.max'    => 'The Project tags may not be larger than 255 characters.',
            'begin.required'    => 'The Project begin date is required.',
            'begin.string'      => 'The Project begin date must be a date.',
            'begin.max'    => 'The Project begin date may not be larger than 255 characters.',
            'end.required'    => 'The Project end date is required.',
            'end.string'      => 'The Project end date must be a string.',
            'end.max'    => 'The Project end date may not be larger than 255 characters.',
            'user_id.required'    => 'The Project user_id is required.',
            'user_id.string'      => 'The Project user_id must be an integer.',
        ];
    }
}
