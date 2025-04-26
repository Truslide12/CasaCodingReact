<?php

use App\Http\Controllers\ProjectController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Carbon;
use App\Models\Project;

Route::get('/welcome', function () {
    return Inertia::render('welcome');
})->name('welcome');

Route::get('/', function () {
    return Inertia::render('index');
})->name('home');

Route::get('/contact', function () {
    return Inertia::render('contact');
})->name('contact');

Route::get('/sixsigma', function () {
    Route::get('/sixsigma', [ProjectController::class, 'sixsigma'])->name('sixsigma'); 
})->name('sixsigma');

Route::get('/websites', function () {
    Route::get('/websites', [ProjectController::class, 'websites'])->name('websites');
})->name('websites');

Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard
    Route::get('dashboard', function () {
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
        
        return Inertia::render('dashboard', [
            'projects'      => $projects,
        ]);
    })->name('dashboard');
    // Project Views
    Route::get('/projects/index', [ProjectController::class, 'index'])->name('projects.index');
    Route::get('/projects/create', [ProjectController::class, 'create'])->name('projects.create');
    Route::get('/projects/edit/{project}', [ProjectController::class, 'edit'])->name('projects.edit');
    // Project MySQL routes
    Route::get('/projects/show/{project}', [ProjectController::class, 'show'])->name('projects.show');
    Route::post('/projects/store', [ProjectController::class, 'store'])->name('projects.store');
    Route::put('/projects/update/{project}', [ProjectController::class, 'update'])->name('projects.update');
    Route::get('/projects/delete/{project}', [ProjectController::class, 'destroy'])->name('projects.delete');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
