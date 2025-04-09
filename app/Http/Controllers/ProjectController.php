<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Models\Project;
use Exception;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class ProjectController extends Controller
{
    /**
     * Display a listing of the project.
     */
    public function index()
    {
        $projects = Project::latest()->get()->map(fn($project) => [
            'title' => $project->title,
            'description' => $project->description,
            'type' => $project->type,
            'image' => $project->image,
            'tags' => $project->tags,         
            'begin' => $project->begin->format('d M Y'),
            'end' => $project->end->format('d M Y'),
            'user_id' => $project->user_id,
        ]);
        return Inertia::render('projects/index', [
            'projects' => $projects,
        ]);
    }

    /**
     * Show the form for creating a new project
     */
    public function create()
    {
        return Inertia::render('projects/form');
    }

    /**
     * Store a newly created project in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        try {
            // need to format these for the database, but need to add the frontend date functionality
            // $beginDate = $request->begin;
            // $endDate = $request->end;
            $image = null;
    
            if ($request->file('image')) {
                $image = $request->file('image');
                $imageOriginalName = $image->getClientOriginalName();
                $image = $image->store('projects', 'public');
            }
    
            $project = Project::create([
                'title' => $request->title,
                'description' => $request->description,
                'type' => $request->type,
                'image' => $request->image,
                'tags' => $request->tags,         
                'begin' => $request->begin,
                'end' => $request->end,
                'user_id' => $request->user_id,
            ]);
    
            if ($project) {
                return redirect()->route('projects.index')->with('success' , 'Project successfully created');
            } else {
                return redirect()->back()->with('error' , 'Project creation failed!');
            };
        } catch (Exception $e){
            Log::error('Project Creation Failed: ' . $e->getMessage());
        };
    }

    /**
     * Display the specified project.
     */
    public function show(Project $project)
    {
        return Inertia::render('projects/form', [
            'project' => $project,
            'isView'  => true,
        ]);
    }

    /**
     * Show the form for editing the specified project.
     */
    public function edit(Project $project)
    {
        return Inertia::render('projects/form');
    }

    /**
     * Update the specified project in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        try {
            // need to format these for the database, but need to add the frontend date functionality
            // $beginDate = $request->begin;
            // $endDate = $request->end;

            if ($project) {
                $project->title         = $request->title;
                $project->description   = $request->description;
                $project->type          = $request->type;
                $project->image         = $request->image;
                $project->tags          = $request->tags;        
                $project->begin         = $request->begin;
                $project->end           = $request->end;
                $project->user_id       = $request->user_id;

                if ($request->file('image')) {
                    $image = $request->file('image');
                    $image = $image->store('projects', 'public');
                    $project->image = $image;
                }
            }
    
            $project->save();
    
            if ($project) {
                return redirect()->route('projects.index')->with('success' , 'Project successfully updated');
            } else {
                return redirect()->back()->with('error' , 'Project update failed!');
            };
        } catch (Exception $e){
            Log::error('Project Update Failed: ' . $e->getMessage());
        };
    }

    /**
     * Remove the specified project from storage.
     */
    public function destroy(Project $project)
    {
        try {
            if ($project) {
                $project->delete(); 
                return redirect()->back()->with('Project Successfully Deleted');
            }
        } catch (Exception $e) {
            Log::error('Product deletion Failed: ' . $e->getMessage());
        }
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
