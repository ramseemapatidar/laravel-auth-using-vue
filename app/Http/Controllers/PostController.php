<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $post = Post::orderBy('id','DESC')->get();

        return response()->json($post);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $image_name = '';
        if($request->file('image')){
            $file = $request->file('image');
            $image_name = date('Y-m-d').$file->getClientOriginalName();
            $file->move(public_path('images'),$image_name);
        }

        Post::create([
            'title'=>$request->title,
            'description'=> $request->description,
            'image'=>$image_name

        ]);

        return response()->json('post created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        $image_name = '';
        if($request->file('image')){
            $file = $request->file('image');
            $image_name = date('Y-m-d').$file->getClientOriginalName();
            $file->move(public_path('images'),$image_name);
            $post->image  = $image_name;
        }
        $post->title = $request->title;
        $post->description = $request->description;
        $post->save();
            return response()->json('Update successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
       $post->delete();
       return response()->json('Deleted successfully');
    }
}
