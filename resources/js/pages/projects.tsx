import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { CirclePlusIcon, Eye, Link, Pencil, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Projects List',
        href: route('/projects'),
    },
];

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
export default function Projects({...props}: {projects: Project[]}) {
    
    const { projects } = props;
    const { flash } = usePage<{flash?: { success?: string; error?: string}}>().props;
    const flashMessage = flash?.success || flash?.error;
    const [ showAlert, setShowAlert ] = useState(flash?.success || flash?.error ? true : false);

    console.log(flashMessage, flash, showAlert)
    useEffect(() => {
        if (flashMessage) {
            const timer = setTimeout(() => setShowAlert(false), 3000);
            return () => clearTimeout(timer);
        }
    })

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Projects List" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* Handle Flash Messages */}
            { showAlert && flashMessage && (
                <Alert variant={'default'} className={`${flash?.success ? 'bg-green-700' : (flash?.error ? 'bg-red-800' : '')} ml-auto max-w-md text-white`}>
                    <AlertDescription className='text-white'>
                        {flash?.success ? 'Success' : 'Error'}
                        {flashMessage}
                    </AlertDescription>
                </Alert>
            ) }
                {/* Add Product */}
                <div className='ml-auto'>
                    <Link type='button' 
                        className="flex items-center me-2 button bg-indigo-400 rounded-lg cursor-pointer hover:opacity-90 text-md" 
                        href={route('projects.create')}
                        >
                        <CirclePlusIcon></CirclePlusIcon> Add Project
                    </Link>
                </div>
                {/* Product List */}
                <div className="overflow-hidden rounded-lg boarder background-blue shadow-sm">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="overflow-hidden rounded-lg border background shadow-sm">
                                <th className="border p-4">#</th>
                                <th className="border p-4">Title</th>
                                <th className="border p-4">Description</th>
                                <th className="border p-4">Type</th>
                                <th className="border p-4">Image</th>
                                <th className="border p-4">Tags</th>
                                <th className="border p-4">Start</th>
                                <th className="border p-4">Finish</th>
                                <th className="border p-4">URL</th>
                                <th className="border p-4">Actions</th>
                            </tr>
                        </thead>
                    </table>
                    <tbody>
                    {/* { (projects.length > 0 && projects.map &&
                        projects.map((project) => (
                        <tr>
                            <td className="border px-4 py-2 text-center">{project.id}</td>
                            <td className="border px-4 py-2 text-center">{project.title}</td>
                            <td className="border px-4 py-2 text-center">{project.description}</td>
                            <td className="border px-4 py-2 text-center">{project.type}</td>
                            <td className="border px-4 py-2 text-center">
                                <img src={project.image} alt={project.title} className='h-16 w-16 object-cover' />
                            </td>
                            <td className="border px-4 py-2 text-center">{project.tags}</td>
                            <td className="border px-4 py-2 text-center">{project.begin}</td>
                            <td className="border px-4 py-2 text-center">{project.end}</td>
                            <td className="border px-4 py-2 text-center">{project.url}</td>
                            <td className="border px-4 py-2 text-center">
                                <Link                                        
                                    href={route('projects.show', project.id)}
                                    type='button'
                                    className='ms-2 bg-sky-400 text-beige p-2 rounded-lg cursor-pointer hover:opacity-90'>
                                        <Eye size={18} />
                                </Link>
                                <Link                                        
                                    href={route('projects.edit', project.id)}
                                    type='button'
                                    className='ms-2 bg-yellow-900 text-beige p-2 rounded-lg cursor-pointer hover:opacity-90'
                                    onClick={ () => {
                                        if(confirm('Are you sure you want to delete this project?')){
                                            // Call the Delete Project Route
                                            router.delete(route('projects.destroy', project.id), {
                                                preserveScroll: true,
                                                preserveState: true,
                                                onSuccess: () => {
                                                    setShowAlert(true);
                                                },
                                            });
                                        }
                                    }}
                                    >
                                    <Pencil size={18} />
                                </Link>
                                <Button                                        
                                    className='ms-2 bg-red-800 text-beige p-2 rounded-lg cursor-pointer hover:opacity-90'>
                                        <Trash size={18} />
                                </Button>
                            </td>
                        </tr>
                    ))
                    )} : ( */}
                        <tr>
                            <td colSpan={10} className='text-center py-4 text-md font-bold text-red-700'>No Projects Found!</td>
                        </tr>
                    {/* ) */}
                    </tbody>
                </div>
            </div>
        </AppLayout>
    );
}
