import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Link } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Project',
        href: route('/projects/create'),
    },
];

export default function Create() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Project" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Create Project</CardTitle>
                        <CardContent>
                            <form className='flex flex-col gap-4' autoComplete='off'>
                                <div className='grid gap-6'>
                                    {/* Project Title */}
                                    <div className='grid gap-2'>
                                        <Label htmlFor='title'>Title</Label>
                                        <Input
                                            id='title'
                                            name='title'
                                            type='text'
                                            placeholder='Project Name'
                                            autoFocus 
                                            tabIndex={1}
                                            ></Input>
                                    </div>
                                    {/* Project Description */}
                                    <div className='grid gap-2'>
                                        <Label htmlFor='description'>Description</Label>
                                        <textarea
                                            id='description'
                                            name='description'
                                            rows={8}
                                            placeholder='Project Description'
                                            tabIndex={2}
                                            ></textarea>
                                    </div>
                                    {/* Project Type */}
                                    <div className='grid gap-2'>
                                        <Label htmlFor='Type'>Type</Label>
                                        <select 
                                            id="type" 
                                            name="type" >
                                            <option value="none">Select an Option</option>
                                            <option value="webdev">WebDev</option>
                                            <option value="sixsigma">SixSigma</option>
                                            <option value="other">Other</option>

                                        </select>
                                    </div>
                                    {/* Project Image */}
                                    <div className='grid gap-2'>
                                        <Label htmlFor='image'>Image</Label>
                                        <Input
                                            id='image'
                                            name='image'
                                            type='text'
                                            placeholder='Project Image'
                                            autoFocus 
                                            tabIndex={3}
                                            ></Input>
                                    </div>
                                    {/* Project Tags */}
                                    <div className='grid gap-2'>
                                        <Label htmlFor='tags'>Tags</Label>
                                        <textarea
                                            id='tags'
                                            name='tags'
                                            rows={8}
                                            placeholder='Project Tags'
                                            tabIndex={4}
                                            ></textarea>
                                    </div>
                                    {/* Project Start */}
                                    <div className='grid gap-2'>
                                        <Label htmlFor='begin'>Start</Label>
                                        <Input
                                            id='begin'
                                            name='begin'
                                            type='text'
                                            placeholder='Project Start'
                                            autoFocus 
                                            tabIndex={5}
                                            ></Input>
                                    </div>
                                {/* Project End */}
                                <div className='grid gap-2'>
                                        <Label htmlFor='end'>End</Label>
                                        <Input
                                            id='end'
                                            name='end'
                                            type='text'
                                            placeholder='Project End'
                                            autoFocus 
                                            tabIndex={6}
                                            ></Input>
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                    </CardHeader>
                </Card>
            </div>
        </AppLayout>
    );
}
