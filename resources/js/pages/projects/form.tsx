import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import InputError from '@/components/input-error';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useForm, usePage } from '@inertiajs/react';
import { ArrowLeft, Link, LoaderCircle, LucideCalendar, Calendar} from 'lucide-react';
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils"

interface Project {
    id: number,
    title: string,
    description: string,
    type: string,
    image: string,
    tags: string,
    begin: string,
    end: string,
    url: string,
    user_id: number,  
}

export default function Form({...props}) {
    // Form Data
    const {isView, isEdit, project} = usePage().props;

    // console.log(project);
    const { data, setData, errors, post, put, reset, processing } = useForm({
        id: '',
        title: '',
        description: '',
        type: '',
        image: '',
        tags: '',         
        begin: '',
        end: '',
        url: '',
        user_id: '',
    });
    // console.log('data', data);

    useEffect(() => {
        if(project) {
            setData({
                id: project.id,
                title: project.title,
                description: project.description,
                type: project.type,
                image: project.image,
                tags: project.tags,         
                begin: project.start,
                end: project.end,
                url: project.url,
                user_id: project.user_id,
            })
        } else {(
            setData({
                id: '',
                title: '',
                description: '',
                type: '',
                image: '',
                tags: '',         
                begin: '',
                end: '',
                url: '',
                user_id: '',
            })
        )}
    }, [project]);
    // Handle Image File Upload
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files && e.target.files.length > 0) {
            setData('image', e.target.files[0])
        }
        // console.log(project);
    }

    // From Submit Handler
    function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(data);
        // if (isEdit) {
        //     put(route('posts.update', project.id), {
        //         preserveScroll: true,
        //         onSuccess: () => reset(),
        //     });
        // } else {
        //     post(route('posts.store'), {
        //         preserveScroll: true,
        //         onSuccess: () => reset(),
        //     });
        // }
    }

    return (
        <AppLayout>
            <Head title="Create Project" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className='ml-auto'>
                <a  
                    type="button" 
                    className='flex items-center me-2 button bg-indigo-400 rounded-lg cursor-pointer hover:opacity-90 text-md'
                    href={route('dashboard')}
                    ><ArrowLeft className='me-2'></ArrowLeft>Back to Products
                </a>
                </div>

                <h2>Project Form</h2>
                    <form 
                        className='flex flex-col gap-4' 
                        autoComplete='off'
                        onSubmit={e => {
                            handleSubmit(e);
                        }}
                        >
                             {/* action="{{ route('products.update',$product->id) }}" method="POST" */}
                        <div className='grid gap-6'>
                            {/* Project Title */}
                            <div className='grid gap-2'>
                                <Label htmlFor='title'>Title</Label>
                                <Input
                                    value={project.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    id='title'
                                    name='title'
                                    type='text'
                                    placeholder='Project Name'
                                    autoFocus 
                                    tabIndex={1}
                                    disabled={isView || processing}
                                    ></Input>
                                <InputError message={errors.title} />
                            </div>
                            {/* Project Description */}
                            <div className='grid gap-2'>
                                <Label htmlFor='description'>Description</Label>
                                <textarea
                                    value={project?.description}
                                    className={cn(
                                            "border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                                            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                                            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                                          )}
                                    onChange={(e) => setData('description', e.target.value)}
                                    id='description'
                                    name='description'
                                    rows={8}
                                    placeholder='Project Description'
                                    tabIndex={2}
                                    disabled={isView || processing}
                                    ></textarea>
                                <InputError message={errors.description} />
                            </div>
                            {/* Project Type */}
                            <div className='grid gap-2'>
                                <Label htmlFor='Type'>Type</Label>
                                <select 
                                    value={project?.type}
                                    onChange={(e) => setData('type', e.target.value)}                                        
                                    id="type" 
                                    name="type" 
                                    className={cn(
                                        "border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                                        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                                        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                                      )}
                                    disabled={isView || processing}
                                        >
                                    <option value="">Select an Option</option>
                                    <option value="webdev">WebDev</option>
                                    <option value="sixsigma">SixSigma</option>
                                    <option value="other">Other</option>
                                </select>
                                <InputError message={errors.type} />
                            </div>
                            {/* Project Image */}
                            {(isView || isEdit) && project.image && (

                            <div className='grid gap-2'>
                                <Label htmlFor='image'>Current Project Image</Label>
                                <img src={`/images/${project.image}`} alt='{project.title} Image' className='h-16 w-16 object-cover' />
                            </div>
                            )}
                            { (
                            <div className='grid gap-2'>
                                <Label htmlFor='image'>Image</Label>
                                <Input
                                    onChange={handleFileUpload}
                                    id='image'
                                    name='image'
                                    type='file'
                                    placeholder='Project Image'
                                    autoFocus 
                                    tabIndex={3}
                                ></Input>
                                <InputError message={errors.image} />
                            </div>
                            )}
                            {/* Project Tags */}
                            <div className='grid gap-2'>
                                <Label htmlFor='tags'>Tags</Label>
                                <textarea
                                    id='tags'
                                    name='tags'
                                    value={project?.tags}
                                    onChange={(e) => setData('tags', e.target.value)}  
                                    rows={3}
                                    placeholder='Project Tags'
                                    tabIndex={4}
                                    className={cn(
                                        "border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                                        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                                        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                                      )}
                                    ></textarea>
                            </div>
                            {/* Project Start */}
                            <div className='grid gap-2'>
                                <Label htmlFor='begin'>Start Date</Label>
                                <Input
                                id='begin'
                                name='begin'
                                value={project?.begin}
                                onChange={(e) => setData('begin', e.target.value)}  
                                type='text'
                                placeholder='Project Start Date YYYY/MM/DD'
                                autoFocus 
                                ></Input>
                            </div>
                            {/* Project End */}
                            <div className='grid gap-2'>
                                <Label htmlFor='end'>End</Label>
                                <Input
                                id='end'
                                name='end'
                                value={project?.end}
                                onChange={(e) => setData('end', e.target.value)}  
                                type='text'
                                placeholder='Project End Date YYYY/MM/DD'
                                autoFocus 
                                ></Input>
                            </div>
                        {/* Project URL */}
                        <div className='grid gap-2'>
                            <Label htmlFor='url'>URL</Label>
                            <Input
                                id='url'
                                name='url'
                                type='text'
                                value={project?.url}
                                onChange={(e) => setData('url', e.target.value)}  
                                placeholder='Project URL'
                                autoFocus 
                                tabIndex={6}
                                ></Input>
                        </div>
                            {/* Project Duration is calcualted manually in the controller */}
                        </div>
                        {/* Submit Form */}
                        <Button 
                            type="submit" 
                            className="mt-4 w-fit cursor-pointer button" 
                            tabIndex={4}
                            >Save
                        </Button>
                    </form>

            </div>
        </AppLayout>
    );
}
