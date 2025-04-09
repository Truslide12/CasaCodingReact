import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Eye, Link, Pencil, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Projects List',
        href: route('/projects/index'),
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
    user_id: number,
    
}
export default function Index({...props}: {projects: Project[]}) {

    const { projects } = props;
    const { flash } = usePage<{flash?: { success?: string; error?: string}}>().props;
    const flashMessage = flash?.success || flash?.error;
    const [ showAlert, setShowAlert ] = useState(flashMessage ? true : false);

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
                        className="button bg-indigo-400 rounded-lg cursor-pointer hover:opacity-90 text-md" 
                        href={route('projects.create')}
                        >Add Project
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
                                <th className="border p-4">Duration</th>
                                <th className="border p-4">Actions</th>
                            </tr>
                        </thead>
                    </table>
                    <tbody>
                        { projects.map((project, index) => (
                            <tr>
                                <td className="border px-4 py-2 text-center">{index+1}</td>
                                <td className="border px-4 py-2 text-center">{project.title}</td>
                                <td className="border px-4 py-2 text-center">{project.description}</td>
                                <td className="border px-4 py-2 text-center">{project.type}</td>
                                <td className="border px-4 py-2 text-center">{project.image}
                                    <img src={project.image} alt={project.title} className='h-16 w-16 object-cover' />
                                </td>
                                <td className="border px-4 py-2 text-center">{project.tags}</td>
                                <td className="border px-4 py-2 text-center">{project.begin}</td>
                                <td className="border px-4 py-2 text-center">{project.end}</td>
                                <td className="border px-4 py-2 text-center">Duration 2B Calculated</td>
                                <td className="border px-4 py-2 text-center">
                                    <Link                                        
                                        href={route('projects.show', project.id)}
                                        type='button'
                                        className='ms-2 bg-sky-400 text-beige p-1 rounded-lg cursor-pointer'>
                                            <Eye size={20} />
                                    </Link>
                                    <Link                                        
                                        href={route('projects.edit', project.id)}
                                        type='button'
                                        className='ms-2 bg-sky-400 text-beige p-1 rounded-lg cursor-pointer'>
                                            <Pencil size={20} />
                                    </Link>
                                    <Link                                        
                                        href={route('projects.destroy', project.id)}
                                        type='button'
                                        className='ms-2 bg-sky-400 text-beige p-1 rounded-lg cursor-pointer'>
                                            <Trash size={20} />
                                    </Link>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </AppLayout>
    );
}
