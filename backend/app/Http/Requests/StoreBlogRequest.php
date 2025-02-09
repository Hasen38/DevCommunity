<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBlogRequest extends FormRequest
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
        if (request()->isMethod('post')) {
            return [
                'title'=> 'required',
                'body'=> 'required',
                'image'=> 'required|image|mimes:peg,png,jpg,svg|max:2048',
            ];
        
        }else {
            return [
                'title'=>'required|string|max:255',
                'body'=>'required|string|max:255',
                'image'=>'nullable|image|mimes:jpg,png,webp,jpeg|max:2048'
            ];
        }    
        }
        public function message()
        {
            if (request()->isMethod('post')) {
                return [
                    'title.required'=>'Title is required',
                    'body.required'=>' Body is required',
                    'image.required'=>'Image is required',
                ];
            }else {
                return [
                    'title.required'=>'Name is required',
                    'body.required'=>'body is required'
                ];
            }
}
    
    
}
