<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Facades\Image;
use App\Http\Resources\PostResource;
// use Illuminate\Support\Facades\Log;
// use Illuminate\Support\Facades\Validator;
// use App\Http\Requests\StoreblogsRequest;
// use App\Http\Requests\UpdateblogsRequest;


class Postcontroller extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Post::with('user');

        // Filter by category if provided
        if ($request->has('category')) {
            $query->where('category_id', $request->category);
        }
        $posts = $query->latest()->paginate(3);
        return PostResource::collection($posts);
    }


    public function store(Request $request)
    {
        // Validate the incoming request data
        $request->validate([
            'title' => 'required',
            'body' => 'nullable',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,bmp,gif,svg,webp|max:2048',
            // 'category_id' => '',
            // 'user_id' => '',mi
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('images', 'public');
            $imagePath = Storage::url($imagePath);
        }

        $post = Post::create([
            'title' => $request->title,
            'body' => $request->body,
            'image' => $imagePath,
            'category_id' => $request->category_id,
            'user_id' => 1,
        ]);


        return response()->json($post, 201);
    }



    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $post = Post::with('user')->findOrFail($id);
        return response()->json($post, 200);
    }


    public function update(Request $request, Post $post)
    {
        // Validate request data
        $validated = $request->validate([
            'title' => '',
            'body' => 'string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048'
        ]);

        // Handle image upload if present
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($post->image) {
                $oldPath = str_replace('/storage/', '', $post->image);
                Storage::disk('public')->delete($oldPath);
            }

            $imagePath = $request->file('image')->store('images', 'public');
            $validated['image'] = Storage::url($imagePath);
        }

        // Update the post with validated data
        $post->update($validated);

        return response()->json($post, 200);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        $post->delete();
        return response()->json(['message' => 'Blog deleted successfully'], 204);
    }
}
