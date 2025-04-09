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
import { Link } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Project',
        href: route('/projects/create'),
    },
];

export default function Create() {
    const { data, setData, errors, post, reset, processing } = useForm({
        title: '',
        description: '',
        type: '',
        image: null as File|null,
        tags: '',         
        begin: '',
        end: '',
        user_id: '0',
    });

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files && e.target.files.length > 0) {
            setData('image', e.target.files[0])
        }
    }
    // console.log('data', data)
    // From Submit Handler
    function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    post(route('posts.store'), {
        preserveScroll: true,
        onSuccess: () => reset(),
    });
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
                                className='button bg-indigo-400 rounded-lg cursor-pointer hover:opacity-90 text-md'
                                href={route('projects.index')}
                                >Back to Products
                            </Link>
                        </div>
                        <CardTitle>Create Project</CardTitle>
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
                                                file:text-foreground">
                                            <option value="none">Select an Option</option>
                                            <option value="webdev">WebDev</option>
                                            <option value="sixsigma">SixSigma</option>
                                            <option value="other">Other</option>
                                        </select>
                                        <InputError message={errors.type} />
                                    </div>
                                    {/* Project Image */}
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
                                            ></textarea>
                                        <InputError message={errors.tags} />
                                    </div>
                                    {/* Project Start */}
                                    <div className='grid gap-2'>
                                        <Label htmlFor='begin'>Start</Label>
                                        <Input
                                            value={data.begin}
                                            onChange={(e) => setData('begin', e.target.value)}                                        
                                            id='begin'
                                            name='begin'
                                            type='text'
                                            placeholder='Project Start'
                                            autoFocus 
                                            tabIndex={5}
                                            ></Input>
                                        <InputError message={errors.begin} />
                                    </div>
                                    {/* Project End */}
                                    <div className='grid gap-2'>
                                        <Label htmlFor='end'>End</Label>
                                        <Input
                                            value={data.end}
                                            onChange={(e) => setData('end', e.target.value)}                                        
                                            id='end'
                                            name='end'
                                            type='text'
                                            placeholder='Project End'
                                            autoFocus 
                                            tabIndex={6}
                                            ></Input>
                                        <InputError message={errors.end} />
                                    </div>
                                    {/* Project Duration is calcualted manually in the controller */}
                                </div>
                                {/* Submit Form */}
                                <Button type="submit" className="mt-4 w-fit cursor-pointer" tabIndex={4}>
                                    {/* {processing && <LoaderCircle className="h-4 w-4 animate-spin" />} */}
                                    Save Project
                                </Button>
                            </form>
                        </CardContent>
                    </CardHeader>
                </Card>
            </div>
        </AppLayout>
    );
}
