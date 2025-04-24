<?php

use App\Http\Controllers\ProjectController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('/projects', [ProjectController::class, 'index'])->name('projects.index');
    Route::get('/projects/create', [ProjectController::class, 'create'])->name('projects.create');
    Route::get('/projects/update', [ProjectController::class, 'update'])->name('projects.update');
    Route::get('/projects/delete', [ProjectController::class, 'destroy'])->name('projects.delete');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
