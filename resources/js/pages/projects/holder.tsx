import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import InputError from '@/components/input-error';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import { ArrowLeft, Link, LoaderCircle, LucideCalendar, Calendar} from 'lucide-react';
import React, { useState } from "react";

export default function Form({...props}) {
  
    // Form Data
    const {project, isView, isEdit } = props;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: `${isView ? 'Show' : (isEdit ? 'Update' : 'Create')} Project`,
            href: route('/projects/form'),
        },
    ];

    const { data, setData, errors, post, put, reset, processing } = useForm({
        title: project?.title || '',
        description: project?.description || '',
        type: project?.type || '',
        image: null as File|null,
        tags: project?.tags || '',         
        begin: project?.start || '',
        end: project?.end || '',
        url: project?.url || '',
        user_id: project?.url || '',
    });

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files && e.target.files.length > 0) {
            setData('image', e.target.files[0])
        }
    }
    // console.log('data', data)

    // handle Calendar updates 
    const today = new Date()
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    // From Submit Handler
    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (isEdit) {
            put(route('posts.update', project.id), {
                preserveScroll: true,
                onSuccess: () => reset(),
            });
        } else {
            post(route('posts.store'), {
                preserveScroll: true,
                onSuccess: () => reset(),
            });
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Project" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <div className='ml-auto'>
                            <Link 
                                type="button" 
                                className='flex items-center me-2 button bg-indigo-400 rounded-lg cursor-pointer hover:opacity-90 text-md'
                                href={route('projects.index')}
                                ><ArrowLeft className='me-2'></ArrowLeft>Back to Products
                            </Link>
                        </div>
                        <CardTitle>{isView ? 'Show' : (isEdit ? 'Update' : 'Create')} Project</CardTitle>
                        <CardContent>
                            <form className='flex flex-col gap-4' autoComplete='off'>
                                <div className='grid gap-6'>
                                    {/* Project Title */}
                                    <div className='grid gap-2'>
                                        <Label htmlFor='title'>Title</Label>
                                        <Input
                                            value={data.title}
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
                                            value={data.description}
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
                                            value={data.type}
                                            onChange={(e) => setData('type', e.target.value)}                                        
                                            id="type" 
                                            name="type" 
                                            className="
                                                border-input
                                                file:text-foreground"
                                                disabled={isView || processing}
                                                >
                                            <option value="none">Select an Option</option>
                                            <option value="webdev">WebDev</option>
                                            <option value="sixsigma">SixSigma</option>
                                            <option value="other">Other</option>
                                        </select>
                                        <InputError message={errors.type} />
                                    </div>
                                    {/* Project Image */}
                                    {(isView || isEdit) && project.image && (
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
                                    {isView || isEdit && (
                                    <div className='grid gap-2'>
                                        <Label htmlFor='image'>Current Project Image</Label>
                                        <img src={`/images/${project.image}`} alt='{project?.title} Image' className='h-16 w-16 object-cover' />
                                    </div>
                                    )}
                                    {/* Project Tags */}
                                    <div className='grid gap-2'>
                                        <Label htmlFor='tags'>Tags</Label>
                                        <textarea
                                            value={data.tags}
                                            onChange={(e) => setData('tags', e.target.value)}
                                            id='tags'
                                            name='tags'
                                            rows={3}
                                            placeholder='Project Tags'
                                            tabIndex={4}
                                            disabled={isView || processing}
                                            ></textarea>
                                        <InputError message={errors.tags} />
                                    </div>
                                    {/* Project Start */}
                                    <div className='grid gap-2'>
                                        <Label htmlFor='begin'>Start Date</Label>
                                        <Input
                                        value={data.begin}
                                        onChange={(e) => setData('begin', e.target.value)}                                        
                                        id='begin'
                                        name='begin'
                                        type='text'
                                        placeholder='Project Start Date YYYY/MM/DD'
                                        autoFocus 
                                        disabled={isView || processing}
                                        ></Input>
                                        {/* <LucideCalendar

                                            dateFormat="yyyy/MM/dd"
                                            selected={startDate}
                                            onChange={(e) => setData('begin', startDate)}
                                            minDate={today}
                                            todayButton={"Today"}
                                            id='begin'
                                            name='begin'
                                            value={data.begin}
                                            />
                                        <InputError message={errors.begin} /> */}
                                    </div>
                                    {/* Project End */}
                                    <div className='grid gap-2'>
                                        <Label htmlFor='end'>End</Label>
                                        <Input
                                        value={data.end}
                                        onChange={(e) => setData('url', e.target.value)}                                        
                                        id='end'
                                        name='end'
                                        type='text'
                                        placeholder='Project End Date YYYY/MM/DD'
                                        autoFocus 
                                        disabled={isView || processing}
                                        ></Input>
                                        {/* <LucideCalendar
                                            showIcon
                                            toggleCalendarOnIconClick
                                            dateFormat="yyyy/MM/dd"
                                            selected={endDate}
                                            onChange={setDate('end', {endDate})} 
                                            minDate={today}
                                            todayButton={"Today"}
                                            id='end'
                                            name='end'
                                            value={data.end}
                                            /> */}
                                        <InputError message={errors.end} />
                                    </div>
                                {/* Project URL */}
                                <div className='grid gap-2'>
                                    <Label htmlFor='url'>URL</Label>
                                    <Input
                                        value={data.url}
                                        onChange={(e) => setData('url', e.target.value)}                                        
                                        id='url'
                                        name='url'
                                        type='text'
                                        placeholder='Project URL'
                                        autoFocus 
                                        tabIndex={6}
                                        disabled={isView || processing}
                                        ></Input>
                                    <InputError message={errors.url} />
                                </div>
                                    {/* Project Duration is calcualted manually in the controller */}
                                </div>
                                {/* Submit Form */}
                                {!isView && (
                                <Button 
                                    type="submit" 
                                    className="mt-4 w-fit cursor-pointer" 
                                    tabIndex={4}
                                    >
                                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                    {processing ? (isEdit ? 'Updating...' : 'Creating...') : isEdit ? 'Update' : 'Create'} Project
                                </Button>
                                )}
                            </form>
                        </CardContent>
                    </CardHeader>
                </Card>
            </div>
        </AppLayout>
    );
}
