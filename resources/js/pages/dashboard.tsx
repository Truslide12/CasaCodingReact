import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { CirclePlusIcon, Eye, Link, Pencil, Trash, } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
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

export default function Dashboard( {projects, ...props} ) {

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
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* Add Product */}
                <div className='ml-auto'>
                    <a  
                        className="button flex items-center me-2 button bg-indigo-400 rounded-lg cursor-pointer hover:opacity-90 text-sm" 
                        href={route('projects.create')}
                        >
                        <CirclePlusIcon size={24} /><h2> Add Project</h2>  
                    </a>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="overflow-hidden rounded-lg border background shadow-sm">
                                <th className="border p-2">#</th>
                                <th className="border p-2">Title</th>
                                <th className="border p-2">Description</th>
                                <th className="border p-2">Type</th>
                                <th className="border p-2">Image</th>
                                <th className="border p-2">Tags</th>
                                <th className="border p-2">Start</th>
                                <th className="border p-2">Finish</th>
                                <th className="border p-2">URL</th>
                                <th className="border p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        { (projects.length > 0 && projects.map &&
                        projects.map((project) => (
                            <tr>
                                <td className="border p-2 text-center">{project.id}</td>
                                <td className="border p-2 text-center">{project.title}</td>
                                <td className="border p-2 text-center">{project.description}</td>
                                <td className="border p-2 text-center">{project.type}</td>
                                <td className="border p-2 text-center">
                                    <img src={project.image} alt={project.title} className='h-16 w-16 object-cover'/>
                                </td>
                                <td className="border p-2 text-center">{project.tags}</td>
                                <td className="border p-2 text-center">{project.begin}</td>
                                <td className="border p-2 text-center">{project.end}</td>
                                <td className="border p-2 text-center">{project.url}</td>
                                <td className="border p-2 text-center">
                                    <a                                        
                                        href={route('projects.show', project)}
                                        type='button'
                                        className='inline-block ms-2 bg-sky-400 text-beige p-2 rounded-lg cursor-pointer hover:opacity-90'>
                                        <Eye size={8} />
                                    </a>
                                    <a                                        
                                        href={route('projects.edit', project)}
                                        type='button'
                                        className='inline-block ms-2 bg-yellow-500 text-beige p-2 rounded-lg cursor-pointer hover:opacity-90'>
                                        <Pencil size={8} />
                                    </a>
                                    <a
                                        type='button'                                        
                                        className='inline-block ms-2 bg-red-800 text-beige p-2 rounded-lg cursor-pointer hover:opacity-90'
                                        onClick={ () => {
                                            if(confirm('Are you sure you want to delete this project?')){
                                                // Call the Delete Project Route
                                                router.delete(route('projects.destroy', project), {
                                                    preserveScroll: true,
                                                    preserveState: true,
                                                    onSuccess: () => {
                                                        setShowAlert(true);
                                                    },
                                                });
                                            }
                                        }}
                                        >
                                        <Trash size={8} /> 
                                    </a>
                                </td>
                            </tr>
                        ))
                        )}
                        {/* :{
                            <tr>
                                <td colSpan={10} className='text-center py-4 text-md font-bold text-red-700'>No Projects Found!</td>
                            </tr>
                        } */}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
