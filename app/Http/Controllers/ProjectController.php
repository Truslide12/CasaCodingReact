<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Models\Project;
use Inertia\Inertia;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $projects = Project::all();
        return Inertia::render('projects/index', [
            $projects => $projects,
        ]);
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
    public function store(StoreProjectRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        //
    }

        /**
     * Remove the specified resource from storage.
     */
    public function sixsigma(Project $project)
    {
        $projects = Project::where('type', 'like', 'sixsigma')->orderBy('date', 'Desc')->get();
        return Inertia::render('projects/sixsigma', [
            $projects => $projects,
        ]);
    }    
    
    /**
    * Remove the specified resource from storage.
    */
   public function webdev(Project $project)
   {
    $projects = Project::where('type', 'like', 'webdev')->orderBy('date', 'Desc')->get();
    return Inertia::render('projects/webdev', [
        $projects => $projects,
    ]);
   }
}
