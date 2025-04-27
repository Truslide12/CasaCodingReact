<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Models\Project;
use Exception;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Carbon;

class ProjectController extends Controller
{
    /**
     * Display a listing of the project.
     */
    public function index()
    {
        // Get all projects for main projects management page
        $projects = Project::latest()->get()->map(fn($project) => [
            'id'       => $project->id,
            'title'         => $project->title,
            'description'   => $project->description,
            'type'          => $project->type,
            'image'         => $project->image,
            'tags'          => $project->tags,         
            'begin'         => Carbon::createFromFormat('Y-m-d', $project->begin)->format('m/d/Y'),
            'end'           => Carbon::createFromFormat('Y-m-d', $project->end)->format('m/d/Y'),
            'url'           => $project->url,
            'user_id'       => $project->user_id,
        ]);
        
        // dd($projects);
        return Inertia::render('projects/index', [
            'projects'      => $projects,
        ]);
    }

    /**
     * Show the form for creating a new project
     */
    public function create()
    {
        // dd('on products.index');
        return Inertia::render('projects/form', [
            'isView'  => false,
            'isEdit'  => false,
        ]);
    }

    /**
     * Store a newly created project in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        try {
            // Combine Begin Date Components
            // $beginDate  = ($request->beginYear."-".$request->beginMonth."-".$request->beginDay);
            // Combine End Date Components
            // $endDate    = ($request->endYear."-".$request->endMonth."-".$request->endDay);

            // Store Image Copy in Hard Drive
            $image = null;
            if ($request->file('image')) {
                $image = $request->file('image');
                // $imageOriginalName = $image->getClientOriginalName(); // Do I want to keep this? Maybe for reloads... hmmm
                $image = $image->store('projects', 'public');
            }
            
            // Create the Project row
            $project = Project::create([
                'title'         => $request->title,
                'description'   => $request->description,
                'type'          => $request->type,
                'image'         => $request->image,
                'tags'          => $request->tags,         
                'begin'         => $request->begin,
                'end'           => $request->end,
                'url'           => $request->url,
                'user_id'       => $request->user_id,
            ]);
    
            // Return to prodject.index or return to form with errors
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
        // dd($project);
        return Inertia::render('projects/form', [
            'project' => $project,
            'isView'  => true,
            'isEdit'  => false,
        ]);
    }

    /**
     * Show the form for editing the specified project.
     */
    public function edit(Project $project)
    {
        return Inertia::render('projects/form', [
            'project' => $project,
            'isView'  => false,
            'isEdit'  => true,
        ]);
    }

    /**
     * Update the specified project in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        try {
            // Combine Begin Date Components
            // $beginDate  = ($request->beginYear."-".$request->beginMonth."-".$request->beginDay);
            // Combine End Date Components
            // $endDate    = ($request->endYear."-".$request->endMonth."-".$request->endDay);

            // Store appropriate changes to be saved in $project variable
            if ($project) {
                $project->title         = $request->title;
                $project->description   = $request->description;
                $project->type          = $request->type;
                $project->image         = $request->image;
                $project->tags          = $request->tags;        
                $project->begin         = $request->begin;
                $project->end           = $request->end;
                $project->url           = $request->url;
                $project->user_id       = $request->user_id;

                if ($request->file('image')) {
                    $image          = $request->file('image');
                    $image          = $image->store('projects', 'public');
                    $project->image = $image;
                }
            }
            // Save Updates
            $project->save();
            
            // Handle post-Update actions and errors
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
        return Inertia::render('sixsigma', [
            $projects => $projects,
        ]);
    }    
    
    /**
    * Remove the specified resource from storage.
    */
   public function websites(Project $project)
   {
    $projects = Project::where('type', 'like', 'webdev')->orderBy('date', 'Desc')->get();
    return Inertia::render('websites', [
        $projects => $projects,
    ]);
   }
}
